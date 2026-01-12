import { CreateProductImageDTO, ProductImageDTO } from './product-image.dto';
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
import { CategoryDTO } from './category.dto';
import { CreateProductOptionDTO, ProductOptionDTO } from './product-option.dto';
import {
  CreateProductVariantDTO,
  ProductVariantDTO,
} from './product-variant.dto';
import { ProductStatus } from 'prisma/generated/enums';
import { TagDTO } from './tag.dto';

export class ProductDTO {
  title: string;

  handle: string;

  description: string | null;

  status: ProductStatus;

  variants: ProductVariantDTO[];

  images: ProductImageDTO[];

  options: ProductOptionDTO[];

  tags: TagDTO[];

  categories: CategoryDTO[];
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  handle: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDTO)
  variants: CreateProductVariantDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDTO)
  images?: CreateProductImageDTO[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionDTO)
  options: CreateProductOptionDTO[];

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsArray()
  categories?: string[];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
