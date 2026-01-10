import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from 'src/modules/commons/dtos/category.dto';
import { CategoryService } from 'src/modules/commons/services/category.service';
import { BaseResponse } from 'src/responses/base.response';
import { IControllerCrud } from 'src/utils/interfaces';

@Controller('categories')
export class AdminCategoryController implements IControllerCrud<
  CreateCategoryDTO,
  UpdateCategoryDTO
> {
  private readonly logger = new Logger(AdminCategoryController.name);
  constructor(private categoryService: CategoryService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<any> {
    return new BaseResponse('category', await this.categoryService.findOne(id));
  }
  @Get()
  async findAll(): Promise<any> {
    return new BaseResponse('category', await this.categoryService.findAll());
  }
  @Post()
  async create(@Body() payload: CreateCategoryDTO): Promise<any> {
    return new BaseResponse(
      'category',
      await this.categoryService.create(payload),
    );
  }

  @Post('/:id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateCategoryDTO,
  ): Promise<any> {
    return new BaseResponse(
      'category',
      await this.categoryService.update(id, payload),
    );
  }

  @Delete()
  async delete(@Param('id') id: string): Promise<any> {
    return new BaseResponse('category', await this.categoryService.delete(id));
  }
}
