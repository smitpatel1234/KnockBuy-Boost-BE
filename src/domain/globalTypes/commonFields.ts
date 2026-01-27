export interface Filter {
  column: string;
  isSearchByDate?: boolean;
  isSearchByNumber?: boolean;
  lowerBoundDate?: string
  lowerBoundNumber?: number
  upperBoundDate?: string
  upperBoundNumber?: number
  value?: string;
}
export interface MaxMinConstraints {
  column: string;
  max: number | string;
  min: number | string;
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
    constraints: MaxMinConstraints[];
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}
export interface SearchFilter {
  between?: [number, number];
  column: string;
  eq?: boolean | number | string;
  gt?: number | string;
  in?: (number | string)[];
  isSearchByDate?: boolean;
  isSearchByNumber?: boolean;
  like?: string;
  lt?: number | string;
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