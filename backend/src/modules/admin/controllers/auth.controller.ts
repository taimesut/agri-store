import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ILoginDTO } from 'src/modules/commons/dtos/auth.dto';
import { AuthService } from 'src/modules/commons/services/auth.service';
import { BaseResponse } from 'src/responses/base.response';
import type { IJwtPayload } from 'src/utils/interfaces';

@Controller('/auth')
export class AdminAuthController {
  private readonly logger = new Logger(AdminAuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() payload: ILoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.login(payload, res);
  }

  @UseGuards(AuthGuard)
  @Post('/me')
  me(@CurrentUser() user: IJwtPayload) {
    return new BaseResponse('user', user);
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
