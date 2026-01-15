import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductImageRepository } from '../repository/_image.repository';
import { ProductRepository } from '../../repository/product.repository';
import { CreateProudctImageDTO } from '../dto/create-image.dto';
import { UpdateProductImageDTO } from '../dto/update-image.dto';

@Injectable()
export class ProductImageService {
  constructor(
    private readonly productImageRepo: ProductImageRepository,
    private readonly productRepo: ProductRepository,
  ) {}

  async throwProductNotFound(productId: string) {
    const hasId = await this.productRepo.hasId(productId);
    if (!hasId) {
      throw new NotFoundException({
        code: 'NOT_FOUND_PRODUCT',
        message: `Product not found with id: ${productId}`,
      });
    }
  }
  async throwImageNotFound(imageId: string) {
    const hasId = await this.productImageRepo.hasId(imageId);
    if (!hasId) {
      throw new NotFoundException({
        code: 'NOT_FOUND_IMAGE',
        message: `Image not found with id: ${imageId}`,
      });
    }
  }
  async throwPositionExists(productId: string, position: number) {
    const hasPosition = await this.productImageRepo.hasPosition(
      productId,
      position,
    );
    if (hasPosition) {
      throw new ConflictException({
        code: 'POSITION_IS_EXISTING',
        message: `Position already exists`,
      });
    }
  }

  async findOne(productId: string, imageId: string) {
    await this.throwProductNotFound(productId);
    return this.productImageRepo.findOne(imageId);
  }

  async findAll(productId: string) {
    await this.throwProductNotFound(productId);
    return this.productImageRepo.findAll(productId);
  }

  async create(productId: string, payload: CreateProudctImageDTO) {
    await this.throwProductNotFound(productId);
    await this.throwPositionExists(productId, payload.position);
    return await this.productImageRepo.create(productId, payload);
  }

  async update(
    productId: string,
    imageId: string,
    payload: UpdateProductImageDTO,
  ) {
    await this.throwProductNotFound(productId);
    await this.throwImageNotFound(imageId);
    if (payload.position) {
      await this.throwPositionExists(productId, payload.position);
    }
    return await this.productImageRepo.update(imageId, payload);
  }

  async delete(productId: string, imageId: string) {
    await this.throwProductNotFound(productId);
    await this.throwImageNotFound(imageId);

    await this.productImageRepo.delete(imageId);
    return { message: 'Deleted' };
  }
}
