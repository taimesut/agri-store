import { IServiceCrud } from 'src/utils/interfaces';
import {
  CategoryDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../dtos/category.dto';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.serivce';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import { DeletedObject } from '../dtos/deleted-object.dto';

@Injectable()
export class CategoryService implements IServiceCrud<
  CategoryDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO
> {
  constructor(private prisma: PrismaService) {}
  private logger = new Logger(CategoryService.name);

  private async hasHandle(handle: string) {
    const category = await this.prisma.category.findUnique({
      where: { handle },
      select: { id: true },
    });
    return category !== null;
  }

  private async hasId(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: { id: true },
    });
    return category !== null;
  }

  private async assertNoCircularParent(
    categoryId: string,
    newParentId: string | null,
  ) {
    let parentId = newParentId;

    while (parentId) {
      if (parentId === categoryId) {
        throw new CustomHttpException(
          RES_MESSAGE.CATEGORY__CIRULAR_PARENT_ERROR,
          RES_CODE.CATEGORY__ASSERT_NO_CIRULAR_PARENT_FAILED,
          HttpStatus.BAD_REQUEST,
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
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORY__HANDLE_IS_EXISTING(payload.handle),
        RES_CODE.CATEGORY__CREATE_CATEGORY_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (payload.parentId && !(await this.hasId(payload.parentId))) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORY__NOT_FOUND_ID(payload.parentId),
        RES_CODE.CATEGORY__CREATE_CATEGORY_FAILED,
        HttpStatus.BAD_REQUEST,
      );
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
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }
  async update(id: string, payload: UpdateCategoryDTO): Promise<CategoryDTO> {
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORY__NOT_FOUND_ID(id),
        RES_CODE.CATEGORY__UPDATE_CATEGORY_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (payload.handle && (await this.hasHandle(payload.handle))) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORY__HANDLE_IS_EXISTING(payload.handle),
        RES_CODE.CATEGORY__CREATE_CATEGORY_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (payload.parentId && !(await this.hasId(payload.parentId))) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORY__NOT_FOUND_ID(payload.parentId),
        RES_CODE.CATEGORY__CREATE_CATEGORY_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (payload.parentId) {
      await this.assertNoCircularParent(id, payload.parentId);
    }

    return await this.prisma.category.update({
      where: { id },
      data: payload,
    });
  }
  async delete(id: string): Promise<DeletedObject> {
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.CATEGORY__NOT_FOUND_ID(id),
        RES_CODE.CATEGORY__DELETE_CATEGORY_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.category.delete({ where: { id } });
    return new DeletedObject(id, 'category', true);
  }
}
