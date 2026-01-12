import { Injectable } from '@nestjs/common';
import { IServiceCrud } from 'src/utils/interfaces';
import {
  CreateProductVariantDTO,
  ProductVariantDTO,
  UpdateProductVariantDTO,
} from '../dtos/product-variant.dto';
import { DeletedObject } from '../dtos/deleted-object.dto';

@Injectable()
export class ProductVariantService implements IServiceCrud<
  ProductVariantDTO,
  CreateProductVariantDTO,
  UpdateProductVariantDTO
> {
  create(payload: CreateProductVariantDTO): Promise<ProductVariantDTO> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<ProductVariantDTO[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<ProductVariantDTO | null> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    payload: UpdateProductVariantDTO,
  ): Promise<ProductVariantDTO> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<DeletedObject> {
    throw new Error('Method not implemented.');
  }
}
