
export interface Filter {
  column: string;
  value: string;
}
export interface pageParams {
  filters: Filter[];
  pagination: Pagination;
  sort: Sort[];
}
export interface Pagination {
  limit: number;
  page: number;
}
export interface PaginationResponse<T> {
  data: T[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}

export interface Sort {
  column: string;
  order: "ASC" | "DESC" | undefined;
}