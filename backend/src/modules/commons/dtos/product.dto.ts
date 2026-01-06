import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class IProductDTO {
  name: string;
  id: number;
  description: string;
  price: number;
  sku: string | null;
  handle: string | null;
  categoryId: number | null;
}

export class ICreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  description?: string;
  @IsNumber()
  price: number;
  @IsOptional()
  @IsNotEmpty()
  sku?: string;
  @IsOptional()
  @IsNotEmpty()
  handle?: string;
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}

export class IUpdateProductDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
  @IsOptional()
  @IsNumber()
  price?: number;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sku?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  handle?: string;
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
