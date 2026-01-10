import { IsNotEmpty, IsString } from 'class-validator';

export class ProductTagDTO {
  value: string;
}

export class CreateProductTagDTO {
  @IsString()
  @IsNotEmpty()
  value: string;
}
