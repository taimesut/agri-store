import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductVariantRepository } from '../repository/_variant.repository';
import { ProductRepository } from '../../../repository/product.repository';
import { UpdateProductVariantDTO } from '../dto/update-variant.dto';
import { CreateProductVariantDTO } from '../dto/create-variant.dto';

@Injectable()
export class ProductVariantService {
  constructor(
    private readonly productVariantRepo: ProductVariantRepository,
    private readonly productRepo: ProductRepository,
  ) {}

  async throwProductNotFound(productId: string) {
    const hasProductId = await this.productRepo.hasId(productId);
    if (!hasProductId) {
      throw new NotFoundException({
        code: 'NOT_FOUND_PRODUCT',
        message: `Product not found with id: ${productId}`,
      });
    }
  }
  async throwSkuExists(sku: string) {
    const hasSku = await this.productVariantRepo.hasSku(sku);
    if (hasSku) {
      throw new ConflictException({
        code: 'SKU_IS_EXISTING',
        message: `Sku already exists`,
      });
    }
  }
  async throwVariantNotFound(variantId: string) {
    const hasId = await this.productVariantRepo.hasId(variantId);
    if (!hasId) {
      throw new NotFoundException({
        code: 'NOT_FOUND_VARIANT',
        message: `Variant not found with id: ${variantId}`,
      });
    }
  }
  async findOne(productId: string, variantId: string) {
    await this.throwProductNotFound(productId);
    return await this.productVariantRepo.findById(variantId);
  }
  async findAll(productId: string) {
    await this.throwProductNotFound(productId);
    return this.productVariantRepo.findAll(productId);
  }
  async create(productId: string, payload: CreateProductVariantDTO) {
    await this.throwProductNotFound(productId);
    const { sku } = payload;
    await this.throwSkuExists(sku);
    return await this.productVariantRepo.create(productId, payload);
  }
  async update(
    productId: string,
    variantId: string,
    payload: UpdateProductVariantDTO,
  ) {
    const { sku } = payload;
    await this.throwProductNotFound(productId);
    await this.throwVariantNotFound(variantId);

    if (sku) {
      const variantExist = await this.productVariantRepo.findById(variantId);
      if (sku !== variantExist?.sku) {
        await this.throwSkuExists(sku);
      }
    }
    return await this.productVariantRepo.update(variantId, payload);
  }
  async delete(productId: string, variantId: string) {
    await this.throwProductNotFound(productId);
    await this.throwVariantNotFound(variantId);
    await this.productVariantRepo.deleteById(variantId);
    return { message: 'Deleted' };
  }
}
