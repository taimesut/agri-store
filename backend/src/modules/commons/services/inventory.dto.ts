import { Injectable } from '@nestjs/common';
import { IServiceCrud } from 'src/utils/interfaces';
import {
  CreateInventoryDTO,
  InventoryDTO,
  UpdateInventoryDTO,
} from '../dtos/inventory.dto';
import { PrismaService } from './prisma.serivce';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import { Prisma } from 'prisma/generated/client';

@Injectable()
export class InventoryService implements IServiceCrud<
  InventoryDTO,
  CreateInventoryDTO,
  UpdateInventoryDTO
> {
  constructor(private prisma: PrismaService) {}

  private async hasId(id: string) {
    const record = await this.prisma.inventory.findUnique({
      where: { id },
    });

    return record !== null;
  }

  private async hasVariantId(variantId: string) {
    const record = await this.prisma.inventory.findUnique({
      where: { variantId },
    });

    return record !== null;
  }

  async create(payload: CreateInventoryDTO): Promise<InventoryDTO> {
    if (await this.hasVariantId(payload.variantId)) {
      throw new CustomBadRequestException(
        RES_MESSAGE.INVENTORY__VARIANT_ID_IS_EXISTING(payload.variantId),
        RES_CODE.INVENTORY__CREATE_FAILED,
      );
    }

    return await this.prisma.inventory.create({
      data: payload,
    });
  }

  async createWithTx(
    tx: Prisma.TransactionClient,
    payload: CreateInventoryDTO,
  ) {
    const record = await tx.inventory.findUnique({
      where: {
        variantId: payload.variantId,
      },
    });

    if (record) {
      throw new CustomBadRequestException(
        RES_MESSAGE.INVENTORY__VARIANT_ID_IS_EXISTING(payload.variantId),
        RES_CODE.PRODUCT_VARIANT__CREATE_FAILED,
      );
    }

    return await tx.inventory.create({ data: payload });
  }

  async findAll(): Promise<InventoryDTO[]> {
    return await this.prisma.inventory.findMany({});
  }

  async findOne(id: string): Promise<InventoryDTO | null> {
    return await this.prisma.inventory.findUnique({
      where: { id },
    });
  }
  async findOneVariantId(variantId: string): Promise<InventoryDTO | null> {
    return await this.prisma.inventory.findUnique({
      where: { variantId },
    });
  }
  async update(id: string, payload: UpdateInventoryDTO): Promise<InventoryDTO> {
    if (!(await this.hasVariantId(id))) {
      throw new CustomBadRequestException(
        RES_MESSAGE.INVENTORY__NOT_FOUND_ID(id),
        RES_CODE.INVENTORY__UPDATE_FAILED,
      );
    }

    return await this.prisma.inventory.update({ where: { id }, data: payload });
  }
  async delete(id: string): Promise<boolean> {
    if (!(await this.hasVariantId(id))) {
      throw new CustomBadRequestException(
        RES_MESSAGE.INVENTORY__NOT_FOUND_ID(id),
        RES_CODE.INVENTORY__UPDATE_FAILED,
      );
    }

    await this.prisma.inventory.delete({ where: { id } });
    return true;
  }
}
