import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductCategoryService } from '../service/_category.service';
import { UpdateProductCategoryDTO } from '../dto/update-category.dto';

@Controller('products/:productId/categories')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get('/:categoryId')
  async findOne(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return {
      category: await this.productCategoryService.findOne(
        productId,
        categoryId,
      ),
    };
  }
  @Get()
  async findAll(@Param('productId') productId: string) {
    return { categories: await this.productCategoryService.findAll(productId) };
  }
  @Post()
  async update(
    @Param('productId') productId: string,
    @Body() payload: UpdateProductCategoryDTO,
  ) {
    return {
      categories: await this.productCategoryService.update(productId, payload),
    };
  }
}
