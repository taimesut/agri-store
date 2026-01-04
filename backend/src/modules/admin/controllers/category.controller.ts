import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CreateCategoryReqDTO } from 'src/modules/commons/dtos/category-req.dto';
import { CategoryService } from 'src/modules/commons/services/category.service';
import { CustomParseIntPipe } from 'src/pipes/parse-int.pipe';
import { BaseResponse } from 'src/responses/base.response';

@Controller('/categories')
export class AdminCategoryController {
  private readonly logger = new Logger(AdminCategoryController.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() payload: CreateCategoryReqDTO) {
    return new BaseResponse(
      'category',
      await this.categoryService.create(payload),
    );
  }

  @Get('/:id')
  async get(@Param('id', CustomParseIntPipe) id: number) {
    return new BaseResponse('category', await this.categoryService.getById(id));
  }
}
