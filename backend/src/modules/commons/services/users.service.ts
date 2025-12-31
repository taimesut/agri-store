import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/commons/services/prisma.serivce';
import { hashPassword } from 'src/utils/password';
import { UserResDTO } from '../../../dtos/user-res.dto';
import { CreateUserReqDTO, UpdateUserReqDTO } from '../../../dtos/user-req.dto';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { ServerErrorException } from 'src/exceptions/server-error.exception';
import { RES_CODE } from 'src/utils/contants';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private prisma: PrismaService) {}

  async getById(id: number): Promise<UserResDTO | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        omit: {
          password: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomHttpException(
          error.message,
          RES_CODE.GET_USER_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new ServerErrorException();
    }
  }

  async gets() {
    try {
      return this.prisma.user.findMany({});
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomHttpException(
          error.message,
          RES_CODE.GET_USERS_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new ServerErrorException();
    }
  }

  async create(payload: CreateUserReqDTO): Promise<UserResDTO> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (user) {
        throw new CustomHttpException(
          'Email is existing',
          RES_CODE.CREATE_USER_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await hashPassword(payload.password);
      payload.password = hashedPassword;
      return this.prisma.user.create({
        data: payload,
        omit: { password: true },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomHttpException(
          error.message,
          RES_CODE.CREATE_USER_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new ServerErrorException();
    }
  }

  async updateById(id: number, payload: UpdateUserReqDTO): Promise<UserResDTO> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw new CustomHttpException(
          `User with id ${id} not found`,
          RES_CODE.UPDATE_USER_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.prisma.user.update({
        where: { id },
        data: payload,
        omit: { password: true },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomHttpException(
          error.message,
          RES_CODE.UPDATE_USER_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new ServerErrorException();
    }
  }

  async deleteById(id: number): Promise<UserResDTO> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        omit: { password: true },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return this.prisma.user.delete({
        where: { id },
        omit: {
          password: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomHttpException(
          error.message,
          RES_CODE.CREATE_USER_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new ServerErrorException();
    }
  }
}
