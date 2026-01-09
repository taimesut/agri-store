import { IServiceCrud } from 'src/utils/interfaces';
import {
  CreateProductDTO,
  ProductDTO,
  UpdateProductDTO,
} from '../dtos/product.dto';

export class ProductService implements IServiceCrud<
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO
> {
  create(payload: CreateProductDTO): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<ProductDTO[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Promise<ProductDTO | null> {
    throw new Error('Method not implemented.');
  }
  update(id: number, dto: UpdateProductDTO): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }
}
