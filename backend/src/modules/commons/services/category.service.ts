import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.serivce';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import {
  CreateCategoryReqDTO,
  UpdateCategoryReqDTO,
} from '../dtos/category-req.dto';
import { CategoryResDTO } from '../dtos/category-res.dto';
import { ServerErrorException } from 'src/exceptions/server-error.exception';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateCategoryReqDTO): Promise<CategoryResDTO> {
    try {
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
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      }
      throw new ServerErrorException();
    }
  }

  async getById(id: number): Promise<CategoryResDTO> {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
      });
      if (!category) {
        throw new CustomHttpException(
          RES_MESSAGE.CATEGORIES_SERVICE.NOT_FOUND_WITH_ID(id),
          RES_CODE.CATEGORY_SERVICE.GET_CATEGORY_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      return category;
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      }
      throw new ServerErrorException();
    }
  }

  async gets() {
    try {
      return this.prisma.category.findMany({});
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      }
      throw new ServerErrorException();
    }
  }
  async validateNoCategoryCycle(
    categoryId: number,
    parentId: number | undefined,
  ) {
    if (!parentId) return;

    if (parentId === categoryId) {
      throw new Error('Category cannot be parent of itself');
    }

    let currentId: number | null = parentId;

    while (currentId) {
      if (currentId === categoryId) {
        throw new Error('Category hierarchy cycle detected');
      }

      const parent: { parentId: number | null } | null =
        await this.prisma.category.findUnique({
          where: { id: currentId },
          select: { parentId: true },
        });

      currentId = parent?.parentId ?? null;
    }
    console.log(1111);
  }

  async updateById(id: number, payload: UpdateCategoryReqDTO) {
    try {
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

      await this.validateNoCategoryCycle(id, payload.parentId);
      return await this.prisma.category.update({
        where: { id },
        data: payload,
      });
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      } else if (error instanceof Error) {
        throw new CustomHttpException(
          error.message,
          RES_CODE.CATEGORY_SERVICE.UPDATE_CATEGORY_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new ServerErrorException();
    }
  }

  async deleteById(id: number) {
    try {
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
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      }
      throw new ServerErrorException();
    }
  }
}
