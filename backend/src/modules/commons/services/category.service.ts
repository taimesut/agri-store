import { Injectable } from '@nestjs/common';
import { IServiceCrud } from 'src/utils/interfaces';
import {
  CategoryDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../dtos/category.dto';
import { PrismaService } from './prisma.serivce';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';

@Injectable()
export class CategoryService implements IServiceCrud<
  CategoryDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO
> {
  constructor(private prisma: PrismaService) {}

  private async hasId(id: string) {
    const record = await this.prisma.category.findUnique({
      where: { id },
    });

    return record !== null;
  }

  private async hasHandle(handle: string) {
    const record = await this.prisma.category.findUnique({
      where: { handle },
    });

    return record !== null;
  }
  private async assertNoCircularParent(
    categoryId: string,
    newParentId: string | null,
  ) {
    let parentId = newParentId;

    while (parentId) {
      if (parentId === categoryId) {
        throw new CustomBadRequestException(
          RES_MESSAGE.CATEGORY__CIRULAR_PARENT_ERROR,
          RES_CODE.CATEGORY__ASSERT_NO_CIRULAR_PARENT_FAILED,
        );
      }

      const parent = await this.prisma.category.findUnique({
        where: { id: parentId },
        select: { parentId: true },
      });

      if (!parent) break;

      parentId = parent.parentId;
    }
  }

  async create(payload: CreateCategoryDTO): Promise<CategoryDTO> {
    if (await this.hasHandle(payload.handle)) {
      throw new CustomBadRequestException(
        RES_MESSAGE.CATEGORY__HANDLE_IS_EXISTING(payload.handle),
        RES_CODE.CATEGORY__CREATE_FAILED,
      );
    }

    if (payload.parentId) {
      if (!(await this.hasId(payload.parentId))) {
        throw new CustomBadRequestException(
          RES_MESSAGE.CATEGORY__NOT_FOUND_ID(payload.parentId),
          RES_CODE.CATEGORY__CREATE_FAILED,
        );
      }
    }
    return await this.prisma.$transaction(async (tx) => {
      const categoryNew = await tx.category.create({ data: payload });
      await this.assertNoCircularParent(categoryNew.id, categoryNew.parentId);
      return categoryNew;
    });
  }
  async findAll(): Promise<CategoryDTO[]> {
    return await this.prisma.category.findMany({});
  }
  async findOne(id: string): Promise<CategoryDTO | null> {
    return await this.prisma.category.findUnique({ where: { id } });
  }
  async update(id: string, payload: UpdateCategoryDTO): Promise<CategoryDTO> {
    if (!(await this.hasId(id))) {
      throw new CustomBadRequestException(
        RES_MESSAGE.CATEGORY__NOT_FOUND_ID(id),
        RES_CODE.CATEGORY__UPDATE_FAILED,
      );
    }
    if (payload.parentId) {
      if (!(await this.hasId(payload.parentId))) {
        throw new CustomBadRequestException(
          RES_MESSAGE.CATEGORY__NOT_FOUND_ID(payload.parentId),
          RES_CODE.CATEGORY__UPDATE_FAILED,
        );
      }
    }
    return await this.prisma.$transaction(async (tx) => {
      const categoryNew = await tx.category.update({
        where: { id },
        data: payload,
      });
      await this.assertNoCircularParent(categoryNew.id, categoryNew.parentId);
      return categoryNew;
    });
  }
  async delete(id: string): Promise<boolean> {
    if (!(await this.hasId(id))) {
      throw new CustomBadRequestException(
        RES_MESSAGE.CATEGORY__NOT_FOUND_ID(id),
        RES_CODE.CATEGORY__DELETE_FAILED,
      );
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return true;
  }
}
