import { Request } from "express";

import {
  Filter,
  pageParams,
  SearchFilter,
  searchPageParams,
  Sort,
} from "../../domain/globalTypes/commonFields";

export function parsePaginationParams(req: Request): pageParams {
  if (
    req.body &&
    (
      (req.body as Record<string, unknown>).pagination ||
      (req.body as Record<string, unknown>).filters ||
      (req.body as Record<string, unknown>).sort
    )
  ) {
    const body = req.body as Record<string, unknown>;
    const { filters, pagination, sort } = body;
    return {
      filters: Array.isArray(filters) ? (filters as Filter[]) : [],
      pagination: {
        limit:
          Number(
            (pagination as Record<string, unknown> | undefined)?.limit
          ) || 10,
        page:
          Number(
            (pagination as Record<string, unknown> | undefined)?.page
          ) || 1,
      },
      sort: Array.isArray(sort) ? (sort as Sort[]) : [],
    };
  }
  const { filters, limit, page, sort } = req.query;
  const parsedPage = Number.parseInt(page as string) || 1;
  const parsedLimit = Number.parseInt(limit as string) || 10;

  return {
    filters: Array.isArray(filters) ? (filters as unknown as Filter[]) : [],
    pagination: { limit: parsedLimit, page: parsedPage },
    sort: Array.isArray(sort) ? (sort as unknown as Sort[]) : [],
  };
}

export function parseSearchPaginationParams(req: Request): searchPageParams {
  const body = req.body as Record<string, unknown> | undefined;
  if (body && (body.pagination || body.filters || body.sort)) {
    const { filters, pagination, sort } = body;
    return {
      filters: Array.isArray(filters) ? (filters as SearchFilter[]) : [],
      pagination: {
        limit:
          Number(
            (pagination as Record<string, unknown> | undefined)?.limit
          ) || 10,
        page:
          Number(
            (pagination as Record<string, unknown> | undefined)?.page
          ) || 1,
      },
      sort: Array.isArray(sort) ? (sort as Sort[]) : [],
    };
  }
  const { filters, limit, page, sort } = req.query;
  const parsedPage = Number.parseInt(page as string) || 1;
  const parsedLimit = Number.parseInt(limit as string) || 10;


  return {
    filters: Array.isArray(filters)
      ? (filters as unknown as SearchFilter[])
      : [],
    pagination: { limit: parsedLimit, page: parsedPage },
    sort: Array.isArray(sort) ? (sort as unknown as Sort[]) : [],
  };
}
