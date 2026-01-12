import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IServiceCrud } from 'src/utils/interfaces';
import { CreateTagDTO, TagDTO, UpdateTagDTO } from '../dtos/tag.dto';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import { PrismaService } from './prisma.serivce';
import { DeletedObject } from '../dtos/deleted-object.dto';

@Injectable()
export class TagService implements IServiceCrud<
  TagDTO,
  CreateTagDTO,
  UpdateTagDTO
> {
  private readonly logger = new Logger(TagService.name);

  constructor(private prisma: PrismaService) {}

  private async hasValue(value: string) {
    const tag = await this.prisma.productTag.findUnique({
      where: {
        value,
      },
      select: {
        id: true,
      },
    });

    return tag !== null;
  }

  private async hasId(id: string) {
    const tag = await this.prisma.productTag.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    return tag !== null;
  }

  async create(payload: CreateTagDTO): Promise<TagDTO> {
    if (await this.hasValue(payload.value)) {
      throw new CustomHttpException(
        RES_MESSAGE.TAG__VALUE_IS_EXISTING(payload.value),
        RES_CODE.TAG__CREATE_TAGS_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.productTag.create({
      data: payload,
    });
  }
  async findAll(): Promise<TagDTO[]> {
    return await this.prisma.productTag.findMany({});
  }
  async findOne(id: string): Promise<TagDTO | null> {
    return await this.prisma.productTag.findUnique({
      where: { id },
    });
  }

  async update(id: string, payload: UpdateTagDTO): Promise<TagDTO> {
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.TAG__NOT_FOUND_ID(id),
        RES_CODE.TAG__UPDATE_TAG_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (payload.value && (await this.hasValue(payload.value))) {
      throw new CustomHttpException(
        RES_MESSAGE.TAG__VALUE_IS_EXISTING(payload.value),
        RES_CODE.TAG__UPDATE_TAG_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.productTag.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: string): Promise<DeletedObject> {
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.TAG__NOT_FOUND_ID(id),
        RES_CODE.TAG__DELETE_TAG_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.productTag.delete({
      where: { id },
    });
    return new DeletedObject(id, 'tag', true);
  }
}
