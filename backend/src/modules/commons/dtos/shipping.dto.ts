import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber } from 'class-validator';

enum ShippingStatus {
  WAITING = 'WAITING',
  SHIPPING = 'SHIPPING',
  DELIVERE = 'DELIVERE',
}

enum ShippingMethod {
  GHTK = 'GHTK',
  GHN = 'GHN',
  SPX = 'SPX',
}

export class ShippingDTO {
  method: ShippingMethod;
  status: ShippingStatus;
  fee: number;
}

export class CreateShippingDTO {
  @IsEnum(ShippingMethod)
  method: ShippingMethod;

  @IsEnum(ShippingStatus)
  status: ShippingStatus;

  @IsNumber()
  fee: number;
}

export class UpdateShippingDTO extends PartialType(CreateShippingDTO) {}
