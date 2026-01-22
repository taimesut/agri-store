export interface SearchParams {
  page: number;
  limit: number;
  search?: string;
  orderBy: string;
  order: "asc" | "desc";
}
