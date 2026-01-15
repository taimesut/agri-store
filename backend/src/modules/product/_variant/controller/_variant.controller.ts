import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductVariantService } from '../service/_variant.service';
import { CreateProductVariantDTO } from '../dto/create-variant.dto';
import { UpdateProductVariantDTO } from '../dto/update-variant.dto';

@Controller('products/:productId/variants')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Get('/:variantId')
  async findOne(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ) {
    return {
      variant: await this.productVariantService.findOne(productId, variantId),
    };
  }
  @Get()
  async findAll(@Param('productId') productId: string) {
    return {
      variants: await this.productVariantService.findAll(productId),
    };
  }
  @Post()
  async create(
    @Param('productId') productId: string,
    @Body() payload: CreateProductVariantDTO,
  ) {
    return {
      variant: await this.productVariantService.create(productId, payload),
    };
  }
  @Post('/:variantId')
  async update(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Body() payload: UpdateProductVariantDTO,
  ) {
    return {
      variant: await this.productVariantService.update(
        productId,
        variantId,
        payload,
      ),
    };
  }
  @Delete('/:variantId')
  async delete(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ) {
    return await this.productVariantService.delete(productId, variantId);
  }
}
