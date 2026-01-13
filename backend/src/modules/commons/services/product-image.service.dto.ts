import { Injectable } from '@nestjs/common';
import { IServiceCrud } from 'src/utils/interfaces';
import {
  CreateProductImageDTO,
  ProductImageDTO,
  UpdateProductImageDTO,
} from '../dtos/product-image.dto';
import { PrismaService } from './prisma.serivce';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';

@Injectable()
export class ProductImageSerivce implements IServiceCrud<
  ProductImageDTO,
  CreateProductImageDTO,
  UpdateProductImageDTO
> {
  constructor(private prisma: PrismaService) {}

  private async hasId(id: string) {
    const record = await this.prisma.productImage.findUnique({
      where: { id },
    });

    return record !== null;
  }

  private async hasPosition(productId: string, position: number) {
    const record = await this.prisma.productImage.findFirst({
      where: { productId, position },
    });

    return record !== null;
  }

  async create(payload: CreateProductImageDTO): Promise<ProductImageDTO> {
    if (await this.hasPosition(payload.productId, payload.position)) {
      throw new CustomBadRequestException(
        RES_MESSAGE.PRODUCT_IMAGE__POSITION_EXISITING(
          payload.productId,
          payload.position,
        ),
        RES_CODE.PRODUCT_IMAGE__CREATE_FAILED,
      );
    }
    return await this.prisma.productImage.create({ data: payload });
  }
  async findAll(): Promise<ProductImageDTO[]> {
    return await this.prisma.productImage.findMany({});
  }
  async findOne(id: string): Promise<ProductImageDTO | null> {
    return await this.prisma.productImage.findUnique({ where: { id } });
  }
  async update(
    id: string,
    payload: UpdateProductImageDTO,
  ): Promise<ProductImageDTO> {
    if (!(await this.hasId(id))) {
      throw new CustomBadRequestException(
        RES_MESSAGE.PRODUCT_IMAGE__NOT_FOUND_ID(id),
        RES_CODE.PRODUCT_IMAGE__UPDATE_FAILED,
      );
    }

    return await this.prisma.productImage.update({
      where: { id },
      data: payload,
    });
  }
  async delete(id: string): Promise<boolean> {
    if (!(await this.hasId(id))) {
      throw new CustomBadRequestException(
        RES_MESSAGE.PRODUCT_IMAGE__NOT_FOUND_ID(id),
        RES_CODE.PRODUCT_IMAGE__DELETE_FAILED,
      );
    }
    await this.prisma.productImage.delete({ where: { id } });
    return true;
  }
}
