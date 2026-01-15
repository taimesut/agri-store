import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductImageService } from '../service/_image.service';
import { CreateProudctImageDTO } from '../dto/create-image.dto';
import { UpdateProductImageDTO } from '../dto/update-image.dto';

@Controller('products/:productId/images')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Get('/:imageId')
  async findOne(
    @Param('productId') productId: string,
    @Param('imageId') imageId: string,
  ) {
    return {
      image: await this.productImageService.findOne(productId, imageId),
    };
  }
  @Get()
  async findAll(@Param('productId') productId: string) {
    return { images: await this.productImageService.findAll(productId) };
  }
  @Post()
  async create(
    @Param('productId') productId: string,
    @Body() payload: CreateProudctImageDTO,
  ) {
    return { image: await this.productImageService.create(productId, payload) };
  }
  @Post('/:imageId')
  async update(
    @Param('productId') productId: string,
    @Param('imageId') imageId: string,
    @Body() payload: UpdateProductImageDTO,
  ) {
    return {
      image: await this.productImageService.update(productId, imageId, payload),
    };
  }
  @Delete('/:imageId')
  async delete(
    @Param('productId') productId: string,
    @Param('imageId') imageId: string,
  ) {
    return await this.productImageService.delete(productId, imageId);
  }
}
