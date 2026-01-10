import { IsNumber, Min } from 'class-validator';

export class InventoryDTO {
  quantity: number;
}

export class UpdateInventoryDTO {
  @IsNumber()
  @Min(0)
  quantity: number;
}
