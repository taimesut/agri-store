import { Injectable } from '@nestjs/common';
import { IServiceCrud } from 'src/utils/interfaces';
import {
  CreateProductVariantDTO,
  ProductVariantDTO,
  UpdateProductVariantDTO,
} from '../dtos/product-variant.dto';
import { PrismaService } from './prisma.serivce';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import { OptionService } from './option.service';
import { InventoryService } from './inventory.dto';

@Injectable()
export class ProductVariantService implements IServiceCrud<
  ProductVariantDTO,
  CreateProductVariantDTO,
  UpdateProductVariantDTO
> {
  constructor(
    private readonly prisma: PrismaService,
    private optionService: OptionService,
    private inventoryService: InventoryService,
  ) {}

  private async hasId(id: string) {
    const record = await this.prisma.productVariant.findUnique({
      where: { id },
    });

    return record !== null;
  }

  private async hasSku(sku: string) {
    const record = await this.prisma.productVariant.findUnique({
      where: { sku },
    });

    return record !== null;
  }
  async create(payload: CreateProductVariantDTO): Promise<ProductVariantDTO> {
    if (await this.hasSku(payload.sku)) {
      throw new CustomBadRequestException(
        RES_MESSAGE.PRODUCT_VARIANT__SKU_IS_EXISTING(payload.sku),
        RES_CODE.PRODUCT_VARIANT__CREATE_FAILED,
      );
    }

  }

  async findAll(): Promise<ProductVariantDTO[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(id: string): Promise<ProductVariantDTO | null> {
    throw new Error('Method not implemented.');
  }
  async update(
    id: string,
    payload: UpdateProductVariantDTO,
  ): Promise<ProductVariantDTO> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
