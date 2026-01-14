import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';
import { CreateCategoryDTO } from '../dto/create-category.dto';
import { UpdateCategoryDTO } from '../dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return { category: await this.categoryService.findOne(id) };
  }
  @Get()
  async findAll(@Query() query: PaginationQueryDTO) {
    const { data, meta } = await this.categoryService.findAll(query);
    return { categories: data, meta };
  }
  @Post()
  async create(@Body() payload: CreateCategoryDTO) {
    return { category: await this.categoryService.create(payload) };
  }
  @Post('/:id')
  async update(@Param('id') id: string, @Body() payload: UpdateCategoryDTO) {
    return { category: await this.categoryService.update(id, payload) };
  }
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
