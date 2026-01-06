import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ICategoryDTO {
  name: string;
  id: number;
  description: string;
  parentId: number | null;
}

export class ICreateCategoryDTO {
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

export class IUpdateCategoryDTO {
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
