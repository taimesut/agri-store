import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ICreateCategoryDTO,
  IUpdateCategoryDTO,
} from 'src/modules/commons/dtos/category.dto';

import { CategoryService } from 'src/modules/commons/services/category.service';
import { CustomParseIntPipe } from 'src/pipes/parse-int.pipe';
import { BaseResponse } from 'src/responses/base.response';

@Controller('/categories')
export class AdminCategoryController {
  private readonly logger = new Logger(AdminCategoryController.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() payload: ICreateCategoryDTO) {
    return new BaseResponse(
      'category',
      await this.categoryService.create(payload),
    );
  }

  @Get('/:id')
  async findOne(@Param('id', CustomParseIntPipe) id: number) {
    return new BaseResponse('category', await this.categoryService.findOne(id));
  }

  @Get()
  async findAll() {
    return new BaseResponse('categories', await this.categoryService.findAll());
  }

  @Put('/:id')
  async update(
    @Param('id', CustomParseIntPipe) id: number,
    @Body() payload: IUpdateCategoryDTO,
  ) {
    return new BaseResponse(
      'category',
      await this.categoryService.update(id, payload),
    );
  }

  @Delete('/:id')
  async delete(@Param('id', CustomParseIntPipe) id: number) {
    return new BaseResponse('category', await this.categoryService.delete(id));
  }
}
