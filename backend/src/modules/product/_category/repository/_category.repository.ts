import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ProductCategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async hasId(productId: string, categoryId: string) {
    const record = await this.prisma.productCategory.findUnique({
      where: {
        productId_categoryId: {
          categoryId,
          productId,
        },
      },
    });

    return record !== null;
  }

  async findOne(productId: string, categoryId: string) {
    return await this.prisma.productCategory.findUnique({
      where: {
        productId_categoryId: {
          productId,
          categoryId,
        },
      },
      select: { category: true },
    });
  }

  async findAll(productId: string) {
    return await this.prisma.productCategory.findMany({
      where: {
        productId,
      },
      select: { category: true },
    });
  }

  async add(productId: string, categoryId: string) {
    return await this.prisma.productCategory.create({
      data: { categoryId, productId },
    });
  }
  async remove(productId: string, categoryId: string) {
    return await this.prisma.productCategory.delete({
      where: {
        productId_categoryId: {
          categoryId,
          productId,
        },
      },
    });
  }
}
