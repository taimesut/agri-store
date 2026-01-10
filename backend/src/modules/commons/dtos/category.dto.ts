import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CategoryDTO {
  name: string;
  handle: string;
  parentId: string | null;
}

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  handle: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  parentId?: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
