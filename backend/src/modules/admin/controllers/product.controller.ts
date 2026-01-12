import { Body, Controller, Delete, Get, Logger, Post } from '@nestjs/common';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/modules/commons/dtos/product.dto';
import { ProductService } from 'src/modules/commons/services/product.service';
import { BaseResponse } from 'src/responses/base.response';
import { IControllerCrud } from 'src/utils/interfaces';

@Controller('products')
export class AdminProductController implements IControllerCrud<
  CreateProductDTO,
  UpdateProductDTO
> {
  constructor(private productService: ProductService) {}
  private readonly logger = new Logger(AdminProductController.name);

  @Get('/:id')
  async findOne(id: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return id;
  }
  @Get()
  async findAll(): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return null;
  }
  @Post()
  async create(@Body() payload: CreateProductDTO): Promise<any> {
    return new BaseResponse(
      'product',
      await this.productService.create(payload),
    );
  }
  @Post('/:id')
  async update(id: string, @Body() payload: UpdateProductDTO): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return payload;
  }
  @Delete('/:id')
  async delete(id: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return id;
  }
}
