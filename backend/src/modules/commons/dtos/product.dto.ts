import { ProductVariantDTO } from './product-variant.dto';
import { ProductImageDTO } from './product-image.dto';
import { ProductTagLinkDTO } from './product-tag-link.dto';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

enum ProductStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export class ProductOptionDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
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
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDTO)
  variants: ProductVariantDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsArray()
  @ArrayMinSize(1)
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

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
