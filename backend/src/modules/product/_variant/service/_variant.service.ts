import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductVariantRepository } from '../repository/_variant.repository';
import { ProductRepository } from '../../repository/product.repository';
import { UpdateProductVariantDTO } from '../dto/update-variant.dto';
import { CreateProductVariantDTO } from '../dto/create-variant.dto';

@Injectable()
export class ProductVariantService {
  constructor(
    private readonly productVariantRepo: ProductVariantRepository,
    private readonly productRepo: ProductRepository,
  ) {}

  async validateProductExists(productId: string) {
    const hasProductId = await this.productRepo.hasId(productId);
    if (!hasProductId) {
      throw new NotFoundException({
        code: 'NOT_FOUND_PRODUCT',
        message: `Product not found with id: ${productId}`,
      });
    }
  }
  async findOne(productId: string, variantId: string) {
    await this.validateProductExists(productId);
    return await this.productVariantRepo.findById(productId, variantId);
  }
  async findAll(productId: string) {
    await this.validateProductExists(productId);
    return this.productVariantRepo.findAll(productId);
  }
  async create(productId: string, payload: CreateProductVariantDTO) {
    await this.validateProductExists(productId);
  }
  async update(productId: string, payload: UpdateProductVariantDTO) {}
  async delete(productId: string, variantId: string) {}
}
