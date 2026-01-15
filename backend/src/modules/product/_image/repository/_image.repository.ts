import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateProudctImageDTO } from '../dto/create-image.dto';
import { UpdateProductImageDTO } from '../dto/update-image.dto';

@Injectable()
export class ProductImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async hasId(id: string) {
    const record = await this.prisma.productImage.findUnique({
      where: { id },
      select: { id: true },
    });
    return record !== null;
  }

  async hasPosition(productId: string, position: number) {
    const record = await this.prisma.productImage.findFirst({
      where: { productId, position },
      select: { id: true },
    });
    return record !== null;
  }

  async findOne(id: string) {
    return await this.prisma.productImage.findUnique({ where: { id } });
  }
  async findAll(productId: string) {
    return await this.prisma.productImage.findMany({ where: { productId } });
  }
  async delete(id: string) {
    return await this.prisma.productImage.delete({ where: { id } });
  }
  async create(productId: string, data: CreateProudctImageDTO) {
    return await this.prisma.productImage.create({
      data: {
        productId,
        ...data,
      },
    });
  }
  async update(imageId: string, data: UpdateProductImageDTO) {
    return await this.prisma.productImage.update({
      where: { id: imageId },
      data,
    });
  }
}
