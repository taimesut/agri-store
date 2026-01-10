import { IServiceCrud } from 'src/utils/interfaces';
import {
  CreateProductDTO,
  ProductDTO,
  ProductOptionDTO,
  UpdateProductDTO,
} from '../dtos/product.dto';
import { PrismaService } from './prisma.serivce';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import { ProductImageDTO } from '../dtos/product-image.dto';
import { ProductVariantDTO } from '../dtos/product-variant.dto';
import { CategoryDTO } from '../dtos/category.dto';
import { ProductTagDTO } from '../dtos/product-tag.dto';

@Injectable()
export class ProductService implements IServiceCrud<
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO
> {
  private readonly logger = new Logger(ProductService.name);
  constructor(private prisma: PrismaService) {}
  async create(payload: CreateProductDTO): Promise<ProductDTO> {
    return await this.prisma.$transaction(async (tx) => {
      const {
        variants,
        images,
        categories,
        options,
        tags,
        title,
        handle,
        status,
        description,
      } = payload;

      const saveArray: {
        variants: ProductVariantDTO[];
        images: ProductImageDTO[];
        options: ProductOptionDTO[];
        categories: CategoryDTO[];
        tags: ProductTagDTO[];
      } = {
        variants: [],
        images: [],
        categories: [],
        options: [],
        tags: [],
      };

      const productNew = await tx.product.create({
        data: {
          title,
          handle,
          status,
          description,
        },
      });

      if (images?.length) {
        for (const e of images) {
          const image = await tx.productImage.create({
            data: {
              productId: productNew.id,
              ...e,
            },
          });
          saveArray.images.push(image);
        }
      }

      if (categories?.length) {
        for (const e of categories) {
          const category = await tx.category.findUnique({
            where: { id: e },
          });
          if (category === null) {
            throw new CustomHttpException(
              RES_MESSAGE.CATEGORY__NOT_FOUND_WITH_ID(e),
              RES_CODE.PRODUCT__CREATE_PRODUCT_FAILED,
              HttpStatus.BAD_REQUEST,
            );
          }
          await tx.productCategory.create({
            data: {
              productId: productNew.id,
              categoryId: e,
            },
          });
          saveArray.categories.push(category);
        }
      }

      if (options.length > 0) {
        for (const e of options) {
          const productOptionNew = await tx.productOption.create({
            data: { title: e.title, productId: productNew.id },
          });

          await tx.productOptionValue.createMany({
            data: e.values.map((value) => ({
              value,
              optionId: productOptionNew.id,
            })),
          });
          saveArray.options.push(e);
        }
      }

      if (tags?.length) {
        for (const e of tags) {
          const tag = tx.productTag.findUnique({
            where: { id: e },
            select: { id: true },
          });
          if (tag === null) {
            throw new CustomHttpException(
              RES_MESSAGE.TAG__NOT_FOUND_WITH_ID(e),
              RES_CODE.PRODUCT__CREATE_PRODUCT_FAILED,
              HttpStatus.BAD_REQUEST,
            );
          }
          saveArray.tags.push({
            value: e,
          });
        }
        await tx.productTagLink.createMany({
          data: tags.map((id) => ({
            productId: productNew.id,
            tagId: id,
          })),
        });
      }

      if (variants.length > 0) {
        for (const e of variants) {
          if (e.sku) {
            const handleExist = await tx.productVariant.findUnique({
              where: { sku: e.sku },
            });
            if (handleExist) {
              throw new CustomHttpException(
                RES_MESSAGE.VARIANT__SKU_IS_EXISTING(e.sku),
                RES_CODE.PRODUCT__CREATE_PRODUCT_FAILED,
                HttpStatus.BAD_REQUEST,
              );
            }
          }
          const { options, ...data } = e;

          const productVariantNew = await tx.productVariant.create({
            data: { ...data, productId: productNew.id },
          });

          for (const o of options) {
            const productOption = await tx.productOption.findFirst({
              where: {
                title: o.title,
                productId: productNew.id,
              },
            });
            if (productOption === null) {
              throw new CustomHttpException(
                RES_MESSAGE.PRODUCT_OPTION__NOT_FOUND_TITLE(o.title),
                RES_CODE.PRODUCT__CREATE_PRODUCT_FAILED,
                HttpStatus.BAD_REQUEST,
              );
            }
            const productOptionValue = await tx.productOptionValue.findFirst({
              where: {
                optionId: productOption.id,
                value: o.value,
              },
            });
            if (productOptionValue === null) {
              throw new CustomHttpException(
                RES_MESSAGE.PRODUCT_OPTION_VALUE__NOT_FOUND_VALUE(o.value),
                RES_CODE.PRODUCT__CREATE_PRODUCT_FAILED,
                HttpStatus.BAD_REQUEST,
              );
            }
            await tx.variantOptionValue.create({
              data: {
                optionValueId: productOptionValue.id,
                variantId: productVariantNew.id,
              },
            });
          }

          saveArray.variants.push({ ...productVariantNew, options: {} });
        }
      }

      return { ...productNew };
    });
  }
  findAll(): Promise<ProductDTO[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<ProductDTO | null> {
    throw new Error('Method not implemented.');
  }
  update(id: string, dto: UpdateProductDTO): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }
}
