import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.serivce';
import { ICRUD } from 'src/utils/interfaces';
import {
  ICreateProductDTO,
  IProductDTO,
  IUpdateProductDTO,
} from '../dtos/product.dto';
import { toSlug } from 'src/utils/string';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';

@Injectable()
export class ProductService implements ICRUD<
  IProductDTO,
  ICreateProductDTO,
  IUpdateProductDTO
> {
  private readonly logger = new Logger(ProductService.name);
  constructor(private prisma: PrismaService) {}

  private async hasId(id: number): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });

    return product !== null;
  }

  private async hasCategoryId(id: number): Promise<boolean> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: { id: true },
    });

    return category !== null;
  }

  private async hasSku(sku: string): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
      where: { sku },
      select: { id: true },
    });

    return product !== null;
  }

  private async hasHandle(handle: string): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
      where: { handle },
      select: { id: true },
    });
    this.logger.log(product);
    return product !== null;
  }

  private resolveHandle(name: string, handle?: string): string {
    if (handle !== undefined && handle !== '' && handle !== null)
      return toSlug(handle);
    return toSlug(name);
  }

  async create(payload: ICreateProductDTO): Promise<IProductDTO> {
    const resolvedHandle = this.resolveHandle(payload.name, payload.handle);

    // check handle unique
    if (await this.hasHandle(resolvedHandle)) {
      throw new CustomHttpException(
        RES_MESSAGE.PRODUCT_SERVICE.HANDLE_IS_EXISTING(resolvedHandle),
        RES_CODE.PRODUCT_SERVICE.CREATE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    // check sku unique
    if (payload.sku && (await this.hasSku(payload.sku))) {
      throw new CustomHttpException(
        RES_MESSAGE.PRODUCT_SERVICE.SKU_IS_EXISTING(payload.sku),
        RES_CODE.PRODUCT_SERVICE.CREATE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    // check categoryId exist
    if (payload.categoryId && !(await this.hasCategoryId(payload.categoryId))) {
      throw new CustomHttpException(
        RES_MESSAGE.PRODUCT_SERVICE.NOT_FOUND_CATEGORY_ID(payload.categoryId),
        RES_CODE.PRODUCT_SERVICE.CREATE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.product.create({
      data: {
        ...payload,
        handle: resolvedHandle,
      },
    });
  }
  async findAll(): Promise<IProductDTO[]> {
    return await this.prisma.product.findMany();
  }
  async findOne(id: number): Promise<IProductDTO | null> {
    return await this.prisma.product.findUnique({ where: { id } });
  }
  async update(id: number, payload: IUpdateProductDTO): Promise<IProductDTO> {
    // check id exist
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.PRODUCT_SERVICE.NOT_FOUND_WITH_ID(id),
        RES_CODE.PRODUCT_SERVICE.UPDATE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    // check categoryId exist
    if (payload.categoryId && !(await this.hasCategoryId(payload.categoryId))) {
      throw new CustomHttpException(
        RES_MESSAGE.PRODUCT_SERVICE.NOT_FOUND_CATEGORY_ID(id),
        RES_CODE.PRODUCT_SERVICE.UPDATE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    // check sku unique
    if (payload.sku && (await this.hasSku(payload.sku))) {
      throw new CustomHttpException(
        RES_MESSAGE.PRODUCT_SERVICE.SKU_IS_EXISTING(payload.sku),
        RES_CODE.PRODUCT_SERVICE.UPDATE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    // check handle unique
    if (payload.handle) {
      const resolvedHandle = toSlug(payload.handle);
      if (await this.hasHandle(resolvedHandle)) {
        throw new CustomHttpException(
          RES_MESSAGE.PRODUCT_SERVICE.HANDLE_IS_EXISTING(resolvedHandle),
          RES_CODE.PRODUCT_SERVICE.UPDATE_PRODUCT_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      payload.handle = resolvedHandle;
    }
    return await this.prisma.product.update({
      where: { id },
      data: { ...payload },
    });
  }
  async delete(id: number): Promise<IProductDTO> {
    // check id exist
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.PRODUCT_SERVICE.NOT_FOUND_WITH_ID(id),
        RES_CODE.PRODUCT_SERVICE.DELETE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.product.delete({ where: { id } });
  }

  async upload(id: number): Promise<IProductDTO> {
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.PRODUCT_SERVICE.NOT_FOUND_WITH_ID(id),
        RES_CODE.PRODUCT_SERVICE.DELETE_PRODUCT_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.product.delete({ where: { id } });
  }
}
