import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';
import { PrismaService } from 'src/commons/services/prisma.serivce';
import { hashPassword } from 'src/utils/password';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private prisma: PrismaService) {}

  async getById(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error');
    }
  }

  async gets() {
    return this.prisma.user.findMany({});
  }

  async create(payload: Prisma.UserCreateInput): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (user) {
        throw new Error('Email is existing.');
      }
      const hashedPassword = await hashPassword(payload.password);
      payload.password = hashedPassword;
      return this.prisma.user.create({ data: payload });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error');
    }
  }

  async updateById(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    payload: Prisma.UserUpdateInput,
  ): Promise<User> {
    try {
      return this.prisma.user.update({
        where: userWhereUniqueInput,
        data: payload,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error');
    }
  }

  async deleteById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error');
    }
  }
}
