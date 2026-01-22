export interface Filter {
  column: string;
  value?: string;
  isSearchByNumber?: boolean;
  isSearchByDate?: boolean;
  upperBoundDate?: string
  lowerBoundDate?: string
  upperBoundNumber?: number
  lowerBoundNumber?: number
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
    constraints: MaxMinConstraints[];
  };
}
export interface MaxMinConstraints {
  column: string;
  max: number | string;
  min: number | string;
}
export interface SearchFilter {
  between?: [number, number];
  column: string;
  eq?: boolean | number | string;
  gt?: number | string;
  in?: (number | string)[];
  like?: string;
  lt?: number | string;
  isSearchByNumber?: boolean;
  isSearchByDate?: boolean;
}

export interface searchPageParams {
  filters: SearchFilter[];
  pagination: Pagination;
  sort: Sort[];
}

export interface Sort {
  column: string;
  order: "ASC" | "DESC" | undefined;
}