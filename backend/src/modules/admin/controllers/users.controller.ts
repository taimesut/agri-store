import {
  Controller,
  Post,
  Body,
  Logger,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  Get,
} from '@nestjs/common';
import { UsersService } from '../../../commons/services/users.service';
import { CreateUser } from '../../../commons/dtos/create-user.dto';
import { BaseResponse } from 'src/commons/responses/base.response';
import { UpdateUser } from 'src/commons/dtos/update-user.dto';

@Controller('users')
export class AdminUsersController {
  private readonly logger = new Logger(AdminUsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }

  @Post()
  async create(@Body() payload: CreateUser) {
    // this.logger.log(payload);
    await this.usersService.create(payload);
    return new BaseResponse(null, 'Create user success', 200);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUser,
  ) {
    this.logger.log(payload);
    await this.usersService.updateById(id, payload);
    return new BaseResponse(null, 'Update user success', 200);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    // this.logger.log(id);
    return this.usersService.deleteById(id);
  }
}
