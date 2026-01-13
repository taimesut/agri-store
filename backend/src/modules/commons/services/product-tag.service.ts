import { IServiceCrud } from 'src/utils/interfaces';
import {
  CreateProductTagDTO,
  ProductTagDTO,
  UpdateProductTagDTO,
} from '../dtos/product-tag.dto';
import { PrismaService } from './prisma.serivce';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductTagSerivce implements IServiceCrud<
  ProductTagDTO,
  CreateProductTagDTO,
  UpdateProductTagDTO
> {
  constructor(private prisma: PrismaService) {}

  private async hasId(id: string) {
    const record = await this.prisma.productTag.findUnique({
      where: { id },
    });

    return record !== null;
  }

  private async hasValue(value: string) {
    const record = await this.prisma.productTag.findUnique({
      where: { value },
    });

    return record !== null;
  }
  async create(payload: CreateProductTagDTO): Promise<ProductTagDTO> {
    if (await this.hasValue(payload.value)) {
      throw new CustomBadRequestException(
        RES_MESSAGE.PRODUCT_TAG__VALUE_IS_EXISTING(payload.value),
        RES_CODE.PRODUCT_TAG__CREATE_FAILED,
      );
    }

    return await this.prisma.productTag.create({ data: payload });
  }
  async findAll(): Promise<ProductTagDTO[]> {
    return await this.prisma.productTag.findMany({});
  }
  async findOne(id: string): Promise<ProductTagDTO | null> {
    return await this.prisma.productTag.findUnique({ where: { id } });
  }
  async update(
    id: string,
    payload: UpdateProductTagDTO,
  ): Promise<ProductTagDTO> {
    if (!(await this.hasValue(id))) {
      throw new CustomBadRequestException(
        RES_MESSAGE.PRODUCT_TAG__NOT_FOUND_ID(id),
        RES_CODE.PRODUCT_TAG__UPDATE_FAILED,
      );
    }
    if (await this.hasValue(payload.value)) {
      throw new CustomBadRequestException(
        RES_MESSAGE.PRODUCT_TAG__VALUE_IS_EXISTING(payload.value),
        RES_CODE.PRODUCT_TAG__UPDATE_FAILED,
      );
    }
    return await this.prisma.productTag.update({
      where: { id },
      data: payload,
    });
  }
  async delete(id: string): Promise<boolean> {
    if (!(await this.hasValue(id))) {
      throw new CustomBadRequestException(
        RES_MESSAGE.PRODUCT_TAG__NOT_FOUND_ID(id),
        RES_CODE.PRODUCT_TAG__DELETE_FAILED,
      );
    }

    await this.prisma.productTag.delete({ where: { id } });

    return true;
  }
}
