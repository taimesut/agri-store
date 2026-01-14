import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDTO } from '../dtos/login.dto';
import { AuthRepository } from '../repository/auth.repository';
import { comparePassword } from 'src/common/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepo: AuthRepository,
  ) {}

  async login(payload: LoginDTO, res: Response) {
    const { email, password } = payload;

    const user = await this.authRepo.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException({
        code: 'LOGIN_FAILED',
        message: 'Email hoặc mật khẩu không đúng',
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException({
        code: 'LOGIN_FAILED',
        message: 'Email hoặc mật khẩu không đúng',
      });
    }

    const jwtPayload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
    };

    const accessToken = this.jwtService.sign(jwtPayload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    return { message: 'Đăng nhập thành công' };
  }
  logout(res: Response) {
    res.clearCookie('access_token');
    return { message: 'Đã đăng xuất' };
  }
}
