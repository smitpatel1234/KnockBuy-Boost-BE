
export type Pagination = {
  page: number;
  limit: number;
};
export type Filter = {
  column: string;
  value: string;
};
export type Sort = {
  column: string;
  order: "ASC" | "DESC" | undefined;
};
export type pageParams = {
  pagination: Pagination;
  filters: Filter[];
  sort: Sort[];
};

export interface PaginationResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}