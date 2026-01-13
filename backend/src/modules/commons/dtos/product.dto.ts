import { ProductStatus } from 'prisma/generated/enums';
import { CreateProductImageDTO, ProductImageDTO } from './product-image.dto';
import { CreateProductOptionDTO, ProductOptionDTO } from './product-option.dto';
import { ProductTagDTO } from './product-tag.dto';
import { CategoryDTO } from './category.dto';

export class CreateProductDTO {
  title: string;
  handle: string;
  description: string;
  status: ProductStatus;

  options: CreateProductOptionDTO[];

  images?: CreateProductImageDTO[];
  tagIds?: string[];
  categoryIds?: string[];
}

export class ProductDTO {
  title: string;
  handle: string;
  description: string;
  status: ProductStatus;

  options: ProductOptionDTO[];

  images?: ProductImageDTO[];
  tags?: ProductTagDTO[];
  categories?: CategoryDTO[];
}
