import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderItemDTO {
  sku: string;
  productTitle: string;
  variantTitle: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export class CreateOrderItemDTO {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  productTitle: string;

  @IsString()
  @IsNotEmpty()
  variantTitle: string;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;
}

export class UpdateOrderItemDTO extends PartialType(CreateOrderItemDTO) {}
