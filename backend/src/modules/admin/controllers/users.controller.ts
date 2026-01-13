import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { UserService } from '../../commons/services/user.service';
import { BaseResponse } from 'src/responses/base.response';
import {
  CreateUserDTO,
  UpdateUserDTO,
} from 'src/modules/commons/dtos/user.dto';

@Controller('users')
export class AdminUsersController {
  constructor(private readonly usersService: UserService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return new BaseResponse('user', await this.usersService.findOne(id));
  }

  @Get()
  async findAll() {
    return new BaseResponse('users', await this.usersService.findAll());
  }

  @Post()
  async create(@Body() payload: CreateUserDTO) {
    return new BaseResponse('user', await this.usersService.create(payload));
  }

  @Post('/:id')
  async update(@Param('id') id: string, @Body() payload: UpdateUserDTO) {
    return new BaseResponse(
      'user',
      await this.usersService.update(id, payload),
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return new BaseResponse('user', await this.usersService.delete(id));
  }
}
