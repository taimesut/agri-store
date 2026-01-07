import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/modules/commons/services/prisma.serivce';
import { hashPassword } from 'src/utils/password';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import { ICreateUserDTO, IUpdateUserDTO, IUserDTO } from '../dtos/user.dto';
import { ICRUD } from 'src/utils/interfaces';

@Injectable()
export class UserService implements ICRUD<
  IUserDTO,
  ICreateUserDTO,
  IUpdateUserDTO
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

  private async hasId(id: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    return user !== null;
  }

  async create(payload: ICreateUserDTO): Promise<IUserDTO> {
    // check email exist
    if (await this.hasEmail(payload.email)) {
      throw new CustomHttpException(
        RES_MESSAGE.USERS_SERVICE.EMAIL_IS_EXISTING,
        RES_CODE.USER_SERVICE.CREATE_USER_FAILED,
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

  async findAll(): Promise<IUserDTO[]> {
    return await this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findOne(id: number): Promise<IUserDTO | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
    });
  }

  async update(id: number, payload: IUpdateUserDTO): Promise<IUserDTO> {
    // check userId exist
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.USERS_SERVICE.NOT_FOUND_WITH_ID(id),
        RES_CODE.USER_SERVICE.UPDATE_USER_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: payload,
      omit: { password: true },
    });
  }

  async delete(id: number): Promise<IUserDTO> {
    // check userId exist
    if (!(await this.hasId(id))) {
      throw new CustomHttpException(
        RES_MESSAGE.USERS_SERVICE.NOT_FOUND_WITH_ID(id),
        RES_CODE.USER_SERVICE.UPDATE_USER_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.user.delete({
      where: { id },
      omit: {
        password: true,
      },
    });
  }
}
