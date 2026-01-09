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
  update(id: string, payload: UpdateProductDTO): Promise<any> {
    throw new Error('Method not implemented.');
  }
  @Delete('/:id')
  delete(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  private readonly logger = new Logger(AdminProductController.name);
}
