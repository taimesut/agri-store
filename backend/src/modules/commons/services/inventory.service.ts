import { Injectable, Logger } from '@nestjs/common';
import { IServiceCrud } from 'src/utils/interfaces';
import {
  CreateInventoryDTO,
  InventoryDTO,
  UpdateInventoryDTO,
} from '../dtos/inventory.dto';
import { DeletedObject } from '../dtos/deleted-object.dto';
import { PrismaService } from './prisma.serivce';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';

@Injectable()
export class InventoryService implements IServiceCrud<
  InventoryDTO,
  CreateInventoryDTO,
  UpdateInventoryDTO
> {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(InventoryService.name);

  private async hasVariantId(variantId: string) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { variantId },
      select: { id: true },
    });

    return inventory !== null;
  }

  private async hasId(id: string) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id },
      select: { id: true },
    });

    return inventory !== null;
  }

  async create(payload: CreateInventoryDTO): Promise<InventoryDTO> {
    if (await this.hasVariantId(payload.variantId)) {
      throw new CustomBadRequestException(
        RES_MESSAGE.INVENTORY__VARIANT_ID_IS_EXISTING(payload.variantId),
        RES_CODE.INVENTORY__CREATE_INVENTORY_FAILED,
      );
    }

    return await this.prisma.inventory.create({
      data: payload,
    });
  }
  async findAll(): Promise<InventoryDTO[]> {
    return await this.prisma.inventory.findMany({});
  }
  async findOne(id: string): Promise<InventoryDTO | null> {
    return await this.prisma.inventory.findUnique({
      where: { id },
    });
  }
  async update(id: string, payload: UpdateInventoryDTO): Promise<InventoryDTO> {
    if (!(await this.hasId(id))) {
      throw new CustomBadRequestException(
        RES_MESSAGE.INVENTORY__NOT_FOUND_ID(id),
        RES_CODE.INVENTORY__UPDATE_INVENTORY_FAILED,
      );
    }

    return await this.prisma.inventory.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: string): Promise<DeletedObject> {
    if (!(await this.hasId(id))) {
      throw new CustomBadRequestException(
        RES_MESSAGE.INVENTORY__NOT_FOUND_ID(id),
        RES_CODE.INVENTORY__UPDATE_INVENTORY_FAILED,
      );
    }

    await this.prisma.inventory.delete({
      where: { id },
    });

    return new DeletedObject(id, 'inventory', true);
  }
}
