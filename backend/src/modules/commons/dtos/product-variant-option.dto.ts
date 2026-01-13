export class CreateProductVariantOptionDTO {
  title: string;
  value: string;
}

type ProductVariantOptionValueDTO = {
  optionId: string;
  value: string;
};

export class ProductVariantOptionDTO {
  productId: string;
  title: string;
  value: ProductVariantOptionValueDTO;
}
