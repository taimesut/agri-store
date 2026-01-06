import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.serivce';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { comparePassword } from 'src/utils/password';
import { JwtService } from '@nestjs/jwt';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';
import { Response } from 'express';
import { ILoginDTO } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async getUserByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async login(payload: ILoginDTO, res: Response): Promise<string> {
    const { email, password } = payload;
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new CustomHttpException(
        RES_MESSAGE.AUTH_SERVICE.ACCOUNT_DOES_NOT_EXISTS,
        RES_CODE.AUTH_SERIVCE.LOGIN_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new CustomHttpException(
        RES_MESSAGE.AUTH_SERVICE.ACCOUNT_OR_PASSWORD_INVALID,
        RES_CODE.AUTH_SERIVCE.LOGIN_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { id, firstName, lastName } = user;
    const token = await this.jwtService.signAsync({
      id,
      firstName,
      lastName,
    });

    res.cookie('jwt_access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 15 phút
    });

    res.cookie('jwt_refresh_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    return RES_MESSAGE.AUTH_SERVICE.LOGIN_SUCCESS;
  }

  logout(res: Response): string {
    res.clearCookie('jwt_access_token');
    res.clearCookie('jwt_refresh_token');
    return RES_MESSAGE.AUTH_SERVICE.LOGOUT_SUCCESS;
  }
}
