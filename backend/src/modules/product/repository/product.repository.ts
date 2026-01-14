import { Injectable } from '@nestjs/common';
import { Product } from 'prisma/generated/client';
import {
  ProductCreateInput,
  ProductUpdateInput,
} from 'prisma/generated/models';
import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async hasId(id: string) {
    const record = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });
    return record !== null;
  }
  async hasHandle(handle: string) {
    const record = await this.prisma.product.findUnique({
      where: { handle },
      select: { id: true },
    });
    return record !== null;
  }
  async findById(id: string) {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }
  async findAll(query: PaginationQueryDTO) {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, query.limit ?? 20);
    const skip = (page - 1) * limit;

    const sortableFields: (keyof Product)[] = ['title', 'handle'];

    const orderByField: keyof Product = sortableFields.includes(
      query.orderBy as keyof Product,
    )
      ? (query.orderBy as keyof Product)
      : 'createdAt';

    const order: 'asc' | 'desc' = query.order ?? 'desc';

    const where = query.search
      ? {
          OR: [
            { title: { contains: query.search } },
            { handle: { contains: query.search } },
          ],
        }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: order },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async create(data: ProductCreateInput) {
    return await this.prisma.product.create({ data });
  }
  async update(id: string, data: ProductUpdateInput) {
    return await this.prisma.product.update({ where: { id }, data });
  }
  async deleteById(id: string) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
