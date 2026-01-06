import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.serivce';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';

import {
  CategoryDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../dtos/category.dto';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateCategoryDTO): Promise<CategoryDTO> {
    if (payload.parentId) {
      const categoryParent = await this.prisma.category.findUnique({
        where: {
          id: payload.parentId,
        },
      });
      if (!categoryParent) {
        throw new CustomHttpException(
          RES_MESSAGE.CATEGORIES_SERVICE.NOT_FOUND_WITH_PARENT_ID(
            payload.parentId,
          ),
          RES_CODE.CATEGORY_SERVICE.CREATE_CATEGORY_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const category = await this.prisma.category.findUnique({
      where: {
        name: payload.name,
      },
    });
    if (category) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORIES_SERVICE.NOT_FOUND_WITH_NAME(payload.name),
        RES_CODE.CATEGORY_SERVICE.CREATE_CATEGORY_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.category.create({
      data: payload,
    });
  }

  async getById(id: number): Promise<CategoryDTO | null> {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async gets() {
    return this.prisma.category.findMany({});
  }
  async validateNonCategoryCycle(
    categoryId: number,
    parentId: number | undefined,
  ) {
    if (!parentId) return;

    if (parentId === categoryId) {
      throw new CustomBadRequestException(
        RES_MESSAGE.CATEGORIES_SERVICE.PARENT_OF_ITSELF,
        RES_CODE.CATEGORY_SERVICE.VALIDATE_NON_CATEGORY_CYCLE,
      );
    }

    let currentId: number | null = parentId;

    while (currentId) {
      if (currentId === categoryId) {
        throw new CustomBadRequestException(
          RES_MESSAGE.CATEGORIES_SERVICE.HIEARARCHY_CYCLE,
          RES_CODE.CATEGORY_SERVICE.VALIDATE_NON_CATEGORY_CYCLE,
        );
      }

      const parent: { parentId: number | null } | null =
        await this.prisma.category.findUnique({
          where: { id: currentId },
          select: { parentId: true },
        });

      currentId = parent?.parentId ?? null;
    }
  }

  async updateById(id: number, payload: UpdateCategoryDTO) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORIES_SERVICE.NOT_FOUND_WITH_ID(id),
        RES_CODE.USER_SERVICE.UPDATE_USER_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (payload.parentId) {
      const categoryParent = await this.prisma.category.findUnique({
        where: {
          id: payload.parentId,
        },
      });
      if (!categoryParent) {
        throw new CustomHttpException(
          RES_MESSAGE.CATEGORIES_SERVICE.NOT_FOUND_WITH_PARENT_ID(
            payload.parentId,
          ),
          RES_CODE.USER_SERVICE.UPDATE_USER_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.validateNonCategoryCycle(id, payload.parentId);
    return await this.prisma.category.update({
      where: { id },
      data: payload,
    });
  }

  async deleteById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORIES_SERVICE.NOT_FOUND_WITH_ID(id),
        RES_CODE.USER_SERVICE.UPDATE_USER_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
