import { Body, Controller, Delete, Get, Logger, Post } from '@nestjs/common';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/modules/commons/dtos/product.dto';
import { IControllerCrud } from 'src/utils/interfaces';

@Controller('products')
export class AdminProductController implements IControllerCrud<
  string,
  CreateProductDTO,
  UpdateProductDTO
> {
  private readonly logger = new Logger(AdminProductController.name);

  @Get('/:id')
  findOne(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  @Get()
  findAll(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  @Post()
  async create(@Body() payload: CreateProductDTO): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return payload;
  }
  @Post('/:id')
  async update(id: string, @Body() payload: UpdateProductDTO): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return payload;
  }
  @Delete('/:id')
  delete(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
