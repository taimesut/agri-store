import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryDTO {
  name: string;
  id: number;
  description: string;
  parentId: number | null;
}

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;
}

export class UpdateCategoryDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;
}
