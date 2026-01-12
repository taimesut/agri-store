import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/modules/commons/services/prisma.serivce';
import { hashPassword } from 'src/utils/password';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../dtos/user.dto';
import { IServiceCrud } from 'src/utils/interfaces';
import { DeletedObject } from '../dtos/deleted-object.dto';

@Injectable()
export class UserService implements IServiceCrud<
  UserDTO,
  CreateUserDTO,
  UpdateUserDTO
> {
  private readonly logger = new Logger(UserService.name);
  constructor(private prisma: PrismaService) {}

  private async hasEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return user !== null;
  }

  private async hasId(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    return user !== null;
  }

  async create(payload: CreateUserDTO): Promise<UserDTO> {
    // check email exist
    if (await this.hasEmail(payload.email)) {
      throw new CustomHttpException(
        RES_MESSAGE.USER__EMAIL_IS_EXISTING,
        RES_CODE.USER__CREATE_USER_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hashPassword(payload.password);
    payload.password = hashedPassword;
    return this.prisma.user.create({
      data: payload,
      omit: { password: true },
    });
  }

  async findAll(): Promise<UserDTO[]> {
    return await this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findOne(id: string): Promise<UserDTO | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
    });
  }

  async update(id: string, payload: UpdateUserDTO): Promise<UserDTO> {
    // check userId exist
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.USER__NOT_FOUND_ID(id),
        RES_CODE.USER__UPDATE_USER_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: payload,
      omit: { password: true },
    });
  }

  async delete(id: string): Promise<DeletedObject> {
    // check userId exist
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.USER__NOT_FOUND_ID(id),
        RES_CODE.USER__UPDATE_USER_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.delete({
      where: { id },
      omit: {
        password: true,
      },
    });
    return new DeletedObject(id, 'user', true);
  }
}
