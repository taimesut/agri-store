import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { JwtPayload } from 'src/modules/commons/dtos/auth.dto';
import { RES_CODE } from 'src/utils/contants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const cookies = request.cookies as Record<string, string | undefined>;
    const token = cookies.jwt_access_token;

    if (!token) {
      throw new CustomHttpException(
        'Token not provider',
        RES_CODE.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomHttpException(
          error.message,
          RES_CODE.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new CustomHttpException(
        'Token invalid',
        RES_CODE.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }
}
