import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'prisma/generated/client';
import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';

import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async hasId(id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    return record !== null;
  }

  async hasEmail(email: string) {
    const record = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return record !== null;
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
    });
  }

  async findAll(query: PaginationQueryDTO) {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, query.limit ?? 20);
    const skip = (page - 1) * limit;

    const sortableFields: (keyof User)[] = ['createdAt', 'email', 'fullName'];

    const orderByField: keyof User = sortableFields.includes(
      query.orderBy as keyof User,
    )
      ? (query.orderBy as keyof User)
      : 'createdAt';

    const order: 'asc' | 'desc' = query.order ?? 'desc';

    const where = query.search
      ? {
          OR: [
            { email: { contains: query.search } },
            { fullName: { contains: query.search } },
          ],
        }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: order },
        omit: {
          password: true,
        },
      }),
      this.prisma.user.count({ where }),
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

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data,
      omit: {
        password: true,
      },
    });
  }

  async deleteById(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async updateById(id: string, data: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });
  }
}
