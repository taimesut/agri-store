export class CreateProductOptionDTO {
  title: string;
  values: string[];
}

export class ProductOptionValueDTO {
  productOptionId: string;
  value: string;
}

export class ProductOptionDTO {
  productId: string;
  title: string;
  values: ProductOptionValueDTO[];
}
