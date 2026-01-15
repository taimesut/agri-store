import { Injectable } from '@nestjs/common';
import { Prisma, Tag } from 'prisma/generated/client';
import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TagCreateInput) {
    return await this.prisma.tag.create({ data });
  }

  async updateById(id: string, data: Prisma.TagUpdateInput) {
    return await this.prisma.tag.update({ where: { id }, data });
  }

  async findById(id: string) {
    return await this.prisma.tag.findUnique({
      where: { id },
    });
  }
  async findAll(query: PaginationQueryDTO) {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, query.limit ?? 20);
    const skip = (page - 1) * limit;

    const sortableFields: (keyof Tag)[] = ['name'];

    const orderByField: keyof Tag = sortableFields.includes(
      query.orderBy as keyof Tag,
    )
      ? (query.orderBy as keyof Tag)
      : 'name';

    const order: 'asc' | 'desc' = query.order ?? 'desc';

    const where = query.search
      ? {
          OR: [{ name: { contains: query.search } }],
        }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.tag.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: order },
      }),
      this.prisma.tag.count({ where }),
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

  async deleteById(id: string) {
    return await this.prisma.tag.delete({ where: { id } });
  }

  async hasName(name: string) {
    const record = await this.prisma.tag.findUnique({
      where: { name },
      select: { id: true },
    });

    return record !== null;
  }

  async hasId(id: string) {
    const record = await this.prisma.tag.findUnique({
      where: { id },
      select: { id: true },
    });

    return record !== null;
  }
}
