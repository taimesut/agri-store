export class VariantOptionDTO {
  title: string;
  value: string;
}

export class ProductVariantDTO {
  sku: string;
  title: string;
  price: string;
  options: VariantOptionDTO[];
}
