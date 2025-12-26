
export interface ListQueryOptions {
  page: number
  pageSize: number
  filter?: Record<string, string | number | boolean>
  sorting?: Record<string, 'ASC' | 'DESC'>
}

export interface PaginatedResult<T> {
  List: T[]
  page: number
  pageSize: number
  totalRecords: number
  totalPages: number
}

export const buildPaginatedResult = <T>(
 List: T[],
  page: number,
  pageSize: number,
  totalRecords: number,
): PaginatedResult<T> => ({
  List,
  page,
  pageSize,
  totalRecords,
  totalPages: Math.ceil(totalRecords / pageSize),
}) 
