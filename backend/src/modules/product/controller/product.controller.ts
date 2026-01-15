import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return { product: await this.productService.findOne(id) };
  }
  @Get()
  async findAll(@Query() query: PaginationQueryDTO) {
    const { data, meta } = await this.productService.findAll(query);
    return { products: data, meta };
  }
  @Post()
  async create(@Body() payload: CreateProductDTO) {
    return { product: await this.productService.create(payload) };
  }
  @Post('/:id')
  async update(@Param('id') id: string, @Body() payload: UpdateProductDTO) {
    return { product: await this.productService.update(id, payload) };
  }
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
