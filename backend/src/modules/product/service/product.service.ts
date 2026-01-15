import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async findOne(id: string) {
    return await this.productRepo.findById(id);
  }
  async findAll(query: PaginationQueryDTO) {
    return await this.productRepo.findAll(query);
  }
  async create(payload: CreateProductDTO) {
    const { handle } = payload;
    const hasHanlde = await this.productRepo.hasHandle(handle);

    if (hasHanlde) {
      throw new ConflictException({
        code: 'HANDLE_IS_EXISTING',
        message: 'Handle already exist',
      });
    }

    return await this.productRepo.create(payload);
  }
  async update(id: string, payload: UpdateProductDTO) {
    const hasId = await this.productRepo.hasId(id);
    if (!hasId) {
      throw new NotFoundException({
        code: 'NOT_FOUND_PRODUCT',
        message: `Product not found with id: ${id}`,
      });
    }

    const { handle } = payload;
    if (handle) {
      const hasHanlde = await this.productRepo.hasHandle(handle);
      if (hasHanlde) {
        throw new ConflictException({
          code: 'HANDLE_IS_EXISTING',
          message: 'Handle already exist',
        });
      }
    }
    return await this.productRepo.update(id, payload);
  }
  async delete(id: string) {
    const hasId = await this.productRepo.hasId(id);
    if (!hasId) {
      throw new NotFoundException({
        code: 'NOT_FOUND_PRODUCT',
        message: `Product not found with id: ${id}`,
      });
    }

    await this.productRepo.deleteById(id);
    return { message: 'Deleted' };
  }
}
