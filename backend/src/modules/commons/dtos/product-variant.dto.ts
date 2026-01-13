import { CreateInventoryDTO, InventoryDTO } from './inventory.dto';
import {
  CreateProductVariantOptionDTO,
  ProductVariantOptionDTO,
} from './product-variant-option.dto';

export class CreateProductVariantDTO {
  productId: string;
  sku: string;
  title: string;
  price: number;
  inventory?: CreateInventoryDTO;
  options: CreateProductVariantOptionDTO[];
}

export class ProductVariantDTO {
  productId: string;
  sku: string;
  price: number;
  inventory: InventoryDTO;
  options: ProductVariantOptionDTO[];
}

export class UpdateProductVariantDTO {
  sku?: string;
  price?: number;
  inventory?: InventoryDTO;
  options?: ProductVariantOptionDTO[];
}
