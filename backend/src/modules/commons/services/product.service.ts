import { IServiceCrud } from 'src/utils/interfaces';
import {
  CreateProductDTO,
  ProductDTO,
  UpdateProductDTO,
} from '../dtos/product.dto';
import { PrismaService } from './prisma.serivce';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import {
  CreateProductImageDTO,
  ProductImageDTO,
} from '../dtos/product-image.dto';
import {
  CreateProductVariantDTO,
  ProductVariantDTO,
} from '../dtos/product-variant.dto';
import { Prisma } from 'prisma/generated/client';
import {
  CreateProductOptionDTO,
  ProductOptionDTO,
} from '../dtos/product-option.dto';
import { CreateProductVariantOptionDTO } from '../dtos/product-variant-option.dto';
import { CategoryDTO } from '../dtos/category.dto';
import { TagDTO } from '../dtos/tag.dto';
import { DeletedObject } from '../dtos/deleted-object.dto';

@Injectable()
export class ProductService implements IServiceCrud<
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO
> {
  private readonly logger = new Logger(ProductService.name);
  constructor(private prisma: PrismaService) {}

  private async hasId(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });

    return product !== null;
  }

  private async createBaseProduct(
    tx: Prisma.TransactionClient,
    payload: CreateProductDTO,
  ) {
    const { handle, status, title, description } = payload;

    const handleExist = await tx.product.findUnique({
      where: { handle },
      select: { id: true },
    });

    if (handleExist) {
      throw new CustomHttpException(
        RES_MESSAGE.PRODUCT_HANDLE_IS_EXSTING(handle),
        RES_CODE.PRODUCT__CREATE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await tx.product.create({
      data: { title, handle, status, description },
    });
  }

  private async createImages(
    tx: Prisma.TransactionClient,
    productId: string,
    images?: CreateProductImageDTO[],
  ): Promise<ProductImageDTO[]> {
    if (!images?.length) {
      return [];
    }
    const result: ProductImageDTO[] = [];

    for (const image of images) {
      result.push(
        await tx.productImage.create({
          data: {
            ...image,
            productId,
          },
        }),
      );
    }

    return result;
  }

  private async createCategories(
    tx: Prisma.TransactionClient,
    productId: string,
    categoryIds?: string[],
  ): Promise<CategoryDTO[]> {
    if (!categoryIds?.length) return [];

    const categories = await tx.category.findMany({
      where: { id: { in: categoryIds } },
    });

    const missingId = categoryIds.find(
      (id) => !categories.some((c) => c.id === id),
    );

    if (missingId) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORY__NOT_FOUND_ID(missingId),
        RES_CODE.PRODUCT__CREATE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await tx.productCategory.createMany({
      data: categoryIds.map((id) => ({
        productId,
        categoryId: id,
      })),
    });

    return categories;
  }

  private async createTags(
    tx: Prisma.TransactionClient,
    productId: string,
    tagIds?: string[],
  ): Promise<TagDTO[]> {
    if (!tagIds?.length) return [];

    const tags = await tx.productTag.findMany({
      where: { id: { in: tagIds } },
    });

    const missingId = tagIds.find((id) => !tags.some((t) => t.id === id));

    if (missingId) {
      throw new CustomHttpException(
        RES_MESSAGE.TAG__NOT_FOUND_ID(missingId),
        RES_CODE.PRODUCT__CREATE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await tx.productTagLink.createMany({
      data: tagIds.map((id) => ({
        productId,
        tagId: id,
      })),
    });

    return tags;
  }

  private async createOptions(
    tx: Prisma.TransactionClient,
    productId: string,
    options?: CreateProductOptionDTO[],
  ): Promise<ProductOptionDTO[]> {
    if (!options?.length) return [];

    for (const option of options) {
      const optionEntity = await tx.productOption.create({
        data: {
          title: option.title,
          productId,
        },
      });

      await tx.productOptionValue.createMany({
        data: option.values.map((value) => ({
          value,
          optionId: optionEntity.id,
        })),
      });
    }

    return options;
  }

  private async createVariants(
    tx: Prisma.TransactionClient,
    productId: string,
    variants?: CreateProductVariantDTO[],
  ): Promise<ProductVariantDTO[]> {
    if (!variants?.length) return [];

    const result: ProductVariantDTO[] = [];

    for (const variant of variants) {
      if (variant.sku) {
        const skuExist = await tx.productVariant.findUnique({
          where: { sku: variant.sku },
        });
        if (skuExist) {
          throw new CustomHttpException(
            RES_MESSAGE.VARIANT__SKU_IS_EXISTING(variant.sku),
            RES_CODE.PRODUCT__CREATE_PRODUCT_FAILED,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const { options, ...variantData } = variant;

      const variantEntity = await tx.productVariant.create({
        data: {
          ...variantData,
          productId,
        },
      });

      await this.attachVariantOptions(tx, productId, variantEntity.id, options);

      const inventoryEntity = await tx.inventory.create({
        data: {
          quantity: 0,
          variantId: variantEntity.id,
        },
      });

      result.push({
        ...variantEntity,
        price: variantEntity.price.toNumber(),
        inventory: inventoryEntity,
        options,
      });
    }

    return result;
  }

  private async attachVariantOptions(
    tx: Prisma.TransactionClient,
    productId: string,
    variantId: string,
    options: CreateProductVariantOptionDTO[],
  ) {
    for (const opt of options) {
      const option = await tx.productOption.findFirst({
        where: {
          title: opt.title,
          productId,
        },
      });

      if (!option) {
        throw new CustomHttpException(
          RES_MESSAGE.PRODUCT_OPTION__NOT_FOUND_TITLE(opt.title),
          RES_CODE.PRODUCT__CREATE_PRODUCT_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }

      const value = await tx.productOptionValue.findFirst({
        where: {
          optionId: option.id,
          value: opt.value,
        },
      });

      if (!value) {
        throw new CustomHttpException(
          RES_MESSAGE.PRODUCT_OPTION_VALUE__NOT_FOUND_VALUE(opt.value),
          RES_CODE.PRODUCT__CREATE_PRODUCT_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }

      // error: sản phẩm có thể gắn nhiều 1 option

      await tx.variantOptionValue.create({
        data: {
          variantId,
          optionValueId: value.id,
        },
      });
    }
  }

  async create(payload: CreateProductDTO): Promise<ProductDTO> {
    return await this.prisma.$transaction(async (tx) => {
      const product = await this.createBaseProduct(tx, payload);

      const images = await this.createImages(tx, product.id, payload.images);
      const categories = await this.createCategories(
        tx,
        product.id,
        payload.categories,
      );
      const options = await this.createOptions(tx, product.id, payload.options);
      const tags = await this.createTags(tx, product.id, payload.tags);
      const variants = await this.createVariants(
        tx,
        product.id,
        payload.variants,
      );

      return {
        ...product,
        images,
        categories,
        tags,
        variants,
        options,
      };
    });
  }

  findAll(): Promise<ProductDTO[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(id: string): Promise<ProductDTO | null> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, payload: UpdateProductDTO): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<DeletedObject> {
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.PRODUCT__NOT_FOUND_ID(id),
        RES_CODE.PRODUCT__DELETE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.product.delete({
      where: { id },
    });
    return new DeletedObject(id, 'product', true);
  }
}
