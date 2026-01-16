import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProductTagDTO {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  add: string[];
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  remove: string[];
}
