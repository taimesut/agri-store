export interface PaginationProps {
  page: number;          // current page (1-based)
  total: number;         // total items
  limit: number;         // items per page
  onChange: (page: number) => void;

  siblingCount?: number; // số page lân cận
  className?: string;
}
