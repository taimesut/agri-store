import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { CreateProductVariantDTO } from '../dto/create-variant.dto';
import { UpdateProductVariantDTO } from '../dto/update-variant.dto';

@Injectable()
export class ProductVariantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async hasId(id: string) {
    const record = await this.prisma.productVariant.findUnique({
      where: { id },
    });

    return record !== null;
  }

  async hasSku(sku: string) {
    const record = await this.prisma.productVariant.findUnique({
      where: { sku },
    });

    return record !== null;
  }

  async findById(id: string) {
    return await this.prisma.productVariant.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(productId: string) {
    return await this.prisma.productVariant.findMany({
      where: { productId },
    });
  }

  async create(productId: string, data: CreateProductVariantDTO) {
    const { attributes, ...reset } = data;
    return await this.prisma.productVariant.create({
      data: {
        productId,
        ...reset,
        attributes: { ...attributes },
      },
    });
  }
  async update(id: string, data: UpdateProductVariantDTO) {
    const { attributes, ...reset } = data;
    return await this.prisma.productVariant.update({
      where: { id },
      data: {
        ...reset,
        attributes: attributes ? { ...attributes } : undefined,
      },
    });
  }
  async deleteById(id: string) {
    return await this.prisma.productVariant.delete({
      where: { id },
    });
  }
}
