import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginReqDTO } from 'src/dtos/login-req.dto';
import { PrismaService } from './prisma.serivce';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { ServerErrorException } from 'src/exceptions/server-error.exception';
import { comparePassword } from 'src/utils/password';
import { JwtService } from '@nestjs/jwt';
import { RES_CODE } from 'src/utils/contants';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginReqDTO, res: Response): Promise<string> {
    try {
      const { email, password } = payload;
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new CustomHttpException(
          'Email or password invalid',
          RES_CODE.LOGIN_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        throw new CustomHttpException(
          'Email or password invalid',
          RES_CODE.LOGIN_FAILED,
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

      return 'Login success';
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomHttpException(
          error.message,
          RES_CODE.LOGIN_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new ServerErrorException();
    }
  }

  logout(res: Response): string {
    res.clearCookie('jwt_access_token');
    res.clearCookie('jwt_refresh_token');
    return 'Logged out';
  }
}
