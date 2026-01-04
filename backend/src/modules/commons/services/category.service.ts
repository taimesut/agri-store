import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.serivce';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import { CreateCategoryReqDTO } from '../dtos/category-req.dto';
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
            RES_MESSAGE.CATEGORIES_SERVICE.CATEGORY_NOT_FOUND_WITH_ID(
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
          RES_MESSAGE.CATEGORIES_SERVICE.CATEGORY_NOT_FOUND_WITH_NAME(
            payload.name,
          ),
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
          RES_MESSAGE.CATEGORIES_SERVICE.CATEGORY_NOT_FOUND_WITH_ID(id),
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

  //       async function gets(params:type) {

  //   }

  //         async function updateById(params:type) {

  //   }

  //           async function deleteById(params:type) {

  //   }
}
