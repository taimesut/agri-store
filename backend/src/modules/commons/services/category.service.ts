import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.serivce';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';

import {
  ICategoryDTO,
  ICreateCategoryDTO,
  IUpdateCategoryDTO,
} from '../dtos/category.dto';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';
import { ICRUD } from 'src/utils/interfaces';

@Injectable()
export class CategoryService implements ICRUD<
  ICategoryDTO,
  ICreateCategoryDTO,
  IUpdateCategoryDTO
> {
  private readonly logger = new Logger(CategoryService.name);
  constructor(private prisma: PrismaService) {}

  private async hasName(name: string): Promise<boolean> {
    const category = await this.prisma.category.findUnique({
      where: { name },
      select: { id: true },
    });

    return category !== null;
  }

  private async hasId(id: number): Promise<boolean> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: { id: true },
    });

    return category !== null;
  }

  async create(payload: ICreateCategoryDTO): Promise<ICategoryDTO> {
    if (payload.parentId && !(await this.hasId(payload.parentId))) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORIES_SERVICE.NOT_FOUND_WITH_PARENT_ID(
          payload.parentId,
        ),
        RES_CODE.CATEGORY_SERVICE.CREATE_CATEGORY_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (await this.hasName(payload.name)) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORIES_SERVICE.NAME_IS_EXISTING(payload.name),
        RES_CODE.CATEGORY_SERVICE.CREATE_CATEGORY_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.category.create({
      data: payload,
    });
  }

  async findOne(id: number): Promise<ICategoryDTO | null> {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return await this.prisma.category.findMany({});
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

  async update(id: number, payload: IUpdateCategoryDTO) {
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORIES_SERVICE.NOT_FOUND_WITH_ID(id),
        RES_CODE.USER_SERVICE.UPDATE_USER_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (payload.parentId && !(await this.hasId(payload.parentId))) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORIES_SERVICE.NOT_FOUND_WITH_PARENT_ID(
          payload.parentId,
        ),
        RES_CODE.USER_SERVICE.UPDATE_USER_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.validateNonCategoryCycle(id, payload.parentId);
    return await this.prisma.category.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: number) {
    if (!(await this.hasId(id))) {
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
