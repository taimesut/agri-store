export class CreateInventoryDTO {
  quantity: number;
  variantId: string;
}

export class InventoryDTO {
  variantId: string;
  quantity: number;
}

export class UpdateInventoryDTO {
  quantity: number;
}
