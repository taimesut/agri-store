import {
  Controller,
  Post,
  Body,
  Logger,
  Delete,
  Param,
  Put,
  Get,
} from '@nestjs/common';
import { UsersService } from '../../commons/services/users.service';
import { BaseResponse } from 'src/responses/base.response';
import { CreateUserReqDTO, UpdateUserReqDTO } from 'src/dtos/user-req.dto';
import { CustomParseIntPipe } from 'src/pipes/parse-int.pipe';

@Controller('users')
export class AdminUsersController {
  private readonly logger = new Logger(AdminUsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async get(@Param('id', CustomParseIntPipe) id: number) {
    return new BaseResponse('user', await this.usersService.getById(id));
  }

  @Get()
  async gets() {
    return new BaseResponse('users', await this.usersService.gets());
  }

  @Post()
  async create(@Body() payload: CreateUserReqDTO) {
    return new BaseResponse('user', await this.usersService.create(payload));
  }

  @Put('/:id')
  async update(
    @Param('id', CustomParseIntPipe) id: number,
    @Body() payload: UpdateUserReqDTO,
  ) {
    return new BaseResponse(
      'user',
      await this.usersService.updateById(id, payload),
    );
  }

  @Delete('/:id')
  async delete(@Param('id', CustomParseIntPipe) id: number) {
    return new BaseResponse('user', await this.usersService.deleteById(id));
  }
}
