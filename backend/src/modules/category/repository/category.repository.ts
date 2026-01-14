import { BadRequestException, Injectable } from '@nestjs/common';
import { Category, Prisma } from 'prisma/generated/client';
import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  private async validateNonLoopCategory(
    categoryId: string,
    parentId: string | null,
    tx: Prisma.TransactionClient,
  ) {
    if (!parentId) return;

    if (parentId === categoryId) {
      throw new BadRequestException({
        code: 'LOOP_CATEGORY',
        message: 'Loop category',
      });
    }

    let currentParentId: string | null = parentId;

    while (currentParentId) {
      if (currentParentId === categoryId) {
        throw new BadRequestException({
          code: 'LOOP_CATEGORY',
          message: 'Loop category',
        });
      }

      const parent: { parentId: string | null } | null =
        await tx.category.findUnique({
          where: { id: currentParentId },
          select: { parentId: true },
        });

      if (!parent) break;

      currentParentId = parent.parentId;
    }
  }

  async findById(id: string) {
    return await this.prisma.category.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  async hasId(id: string) {
    const record = await this.prisma.category.findUnique({
      where: { id },
      select: { id: true },
    });

    return record !== null;
  }

  async hasHandle(handle: string) {
    const record = await this.prisma.category.findUnique({
      where: { handle },
    });

    return record !== null;
  }

  async create(data: Prisma.CategoryCreateInput) {
    return await this.prisma.$transaction(async (tx) => {
      const category = await tx.category.create({
        data,
      });
      await this.validateNonLoopCategory(
        category.id,
        category.parentId || null,
        tx,
      );

      return category;
    });
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    return await this.prisma.$transaction(async (tx) => {
      const category = await tx.category.update({
        where: { id },
        data,
      });

      await this.validateNonLoopCategory(
        category.id,
        category.parentId || null,
        tx,
      );

      return category;
    });
  }

  async deleteById(id: string) {
    return await this.prisma.category.delete({ where: { id } });
  }
  async updateById(id: string, data: Prisma.CategoryUpdateInput) {
    return await this.prisma.category.update({
      where: { id },
      data,
    });
  }
  async findAll(query: PaginationQueryDTO) {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, query.limit ?? 20);
    const skip = (page - 1) * limit;

    const sortableFields: (keyof Category)[] = ['name', 'handle'];

    const orderByField: keyof Category = sortableFields.includes(
      query.orderBy as keyof Category,
    )
      ? (query.orderBy as keyof Category)
      : 'name';

    const order: 'asc' | 'desc' = query.order ?? 'desc';

    const where = query.search
      ? {
          OR: [
            { name: { contains: query.search } },
            { handle: { contains: query.search } },
          ],
        }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: order },
      }),
      this.prisma.category.count({ where }),
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
}
