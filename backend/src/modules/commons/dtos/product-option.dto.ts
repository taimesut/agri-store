export class CreateProductOptionDTO {
  title: string;
  values: string[];
}

type ProductOptionValueDTO = {
  optionId: string;
  value: string;
};

export class ProductOptionDTO {
  productId: string;
  title: string;
  values: ProductOptionValueDTO[];
}
