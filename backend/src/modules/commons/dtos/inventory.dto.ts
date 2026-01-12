import { IsNumber, Min } from 'class-validator';

export class InventoryDTO {
  quantity: number;
}

export class CreateInventoryDTO {
  quantity: number;
  variantId: string;
}

export class UpdateInventoryDTO {
  @IsNumber()
  @Min(0)
  quantity: number;
}
