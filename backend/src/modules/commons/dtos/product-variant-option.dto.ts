export class CreateProductVariantOptionDTO {
  title: string;
  value: string;
}

export class ProductVariantOptionValueDTO {
  productOptionId: string;
  value: string;
}

export class ProductVariantOptionDTO {
  productId: string;
  title: string;
  value: ProductVariantOptionValueDTO;
}
