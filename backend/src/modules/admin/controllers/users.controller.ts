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
import { UserService } from '../../commons/services/user.service';
import { BaseResponse } from 'src/responses/base.response';
import { CustomParseIntPipe } from 'src/pipes/parse-int.pipe';
import {
  ICreateUserDTO,
  IUpdateUserDTO,
} from 'src/modules/commons/dtos/user.dto';

@Controller('users')
export class AdminUsersController {
  private readonly logger = new Logger(AdminUsersController.name);
  constructor(private readonly usersService: UserService) {}

  @Get('/:id')
  async findOne(@Param('id', CustomParseIntPipe) id: number) {
    return new BaseResponse('user', await this.usersService.findOne(id));
  }

  @Get()
  async findAll() {
    return new BaseResponse('users', await this.usersService.findAll());
  }

  @Post()
  async create(@Body() payload: ICreateUserDTO) {
    return new BaseResponse('user', await this.usersService.create(payload));
  }

  @Put('/:id')
  async update(
    @Param('id', CustomParseIntPipe) id: number,
    @Body() payload: IUpdateUserDTO,
  ) {
    return new BaseResponse(
      'user',
      await this.usersService.update(id, payload),
    );
  }

  @Delete('/:id')
  async delete(@Param('id', CustomParseIntPipe) id: number) {
    return new BaseResponse('user', await this.usersService.delete(id));
  }
}
