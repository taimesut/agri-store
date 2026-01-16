import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ProductTagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async hasId(productId: string, tagId: string) {
    const record = await this.prisma.productTag.findUnique({
      where: {
        productId_tagId: { productId, tagId },
      },
    });
    return record !== null;
  }

  async findOne(productId: string, tagId: string) {
    return await this.prisma.productTag.findUnique({
      where: {
        productId_tagId: {
          productId,
          tagId,
        },
      },
      select: { tag: true },
    });
  }
  async findAll(productId: string) {
    return await this.prisma.productTag.findMany({
      where: {
        productId,
      },
      select: { tag: true },
    });
  }

  async add(productId: string, tagId: string) {
    return await this.prisma.productTag.create({
      data: { tagId, productId },
    });
  }

  async remove(productId: string, tagId: string) {
    return await this.prisma.productTag.delete({
      where: {
        productId_tagId: {
          tagId,
          productId,
        },
      },
    });
  }
}
