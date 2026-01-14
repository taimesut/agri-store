import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return { user: await this.userService.findOne(id) };
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    const { data, meta } = await this.userService.findAll(query);

    return { users: data, meta };
  }

  @Post()
  async create(@Body() payload: CreateUserDTO) {
    return { user: await this.userService.create(payload) };
  }

  @Post('/:id')
  async update(@Param('id') id: string, @Body() payload: UpdateUserDTO) {
    return { user: await this.userService.update(id, payload) };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
