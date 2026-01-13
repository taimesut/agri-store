export class CreateCategoryDTO {
  name: string;
  handle: string;
  parentId?: string;
}

export class CategoryDTO {
  name: string;
  handle: string;
  parentId: string | null;
}

export class UpdateCategoryDTO {
  name?: string;
  handle?: string;
  parentId?: string;
}
