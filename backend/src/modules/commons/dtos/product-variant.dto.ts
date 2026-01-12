import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  CreateProductVariantOptionDTO,
  ProductVariantOptionDTO,
} from './product-variant-option.dto';
import { InventoryDTO } from './inventory.dto';

export class ProductVariantDTO {
  sku: string;

  title: string;

  price: number;

  options: ProductVariantOptionDTO[];

  inventory: InventoryDTO;
}

export class CreateProductVariantDTO {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  price: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantOptionDTO)
  options: CreateProductVariantOptionDTO[];
}

export class UpdateProductVariantDTO {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  price: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantOptionDTO)
  options: CreateProductVariantOptionDTO[];

  // @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => InventoryDTO)
  // inventory: InventoryDTO;
}
