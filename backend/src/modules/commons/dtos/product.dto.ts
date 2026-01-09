import { ProductVariantDTO } from './product-variant.dto';
import { ProductImageDTO } from './product-image.dto';
import { ProductTagLinkDTO } from './product-tag-link.dto';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

enum ProductStatus {
  DRAFT,
  PUBLISHED,
}

export class ProductOptionDTO {
  title: string;
  values: string[];
}

export class ProductDTO {
  title: string;

  handle: string;

  description?: string;

  status: ProductStatus;

  variants: ProductVariantDTO[];

  images: ProductImageDTO[];

  options: ProductOptionDTO[];

  tags: ProductTagLinkDTO[];

  categories: string[];
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  handle: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDTO)
  variants: ProductVariantDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOptionDTO)
  options: ProductOptionDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductTagLinkDTO)
  tags: ProductTagLinkDTO[];

  @IsArray()
  categories: string[];
}

export class UpdateProductDTO {}
