import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductTagService } from '../service/_tag.service';
import { UpdateProductTagDTO } from '../dto/update-tag.dto';

@Controller('products/:productId/tags')
export class ProductTagController {
  constructor(private readonly productTagService: ProductTagService) {}

  @Get('/:tagId')
  async findOne(
    @Param('productId') productId: string,
    @Param('tagId') tagId: string,
  ) {
    return {
      tag: await this.productTagService.findOne(productId, tagId),
    };
  }
  @Get()
  async findAll(@Param('productId') productId: string) {
    return { tags: await this.productTagService.findAll(productId) };
  }
  @Post()
  async update(
    @Param('productId') productId: string,
    @Body() payload: UpdateProductTagDTO,
  ) {
    return {
      tags: await this.productTagService.update(productId, payload),
    };
  }
}
