import { Request } from "express";

import {
  Filter,
  pageParams,
  SearchFilter,
  searchPageParams,
  Sort,
} from "../../domain/globalTypes/commonFields";

export function parsePaginationParams(req: Request): pageParams {
  if (req.body && (req.body.pagination || req.body.filters || req.body.sort)) {
    const { pagination, filters, sort } = req.body;
    return {
      pagination: {
        page: Number(pagination?.page) || 1,
        limit: Number(pagination?.limit) || 10,
      },
      filters: Array.isArray(filters) ? (filters as Filter[]) : [],
      sort: Array.isArray(sort) ? (sort as Sort[]) : [],
    };
  }
  const { filters, limit, page, sort } = req.query;

  const parsedPage = parseInt(page as string) || 1;
  const parsedLimit = parseInt(limit as string) || 10;

  let parsedFilters: unknown = [];
  if (filters) {
    try {
      parsedFilters =
        typeof filters === "string" ? JSON.parse(filters) : filters;
    } catch {
      // Ignore malformed filters
    }
  }

  let parsedSort: unknown = [];
  if (sort) {
    try {
      parsedSort = typeof sort === "string" ? JSON.parse(sort) : sort;
    } catch {
      // Ignore malformed sort
    }
  }

  return {
    filters: Array.isArray(parsedFilters) ? (parsedFilters as Filter[]) : [],
    pagination: { limit: parsedLimit, page: parsedPage },
    sort: Array.isArray(parsedSort) ? (parsedSort as Sort[]) : [],
  };
}

export function parseSearchPaginationParams(req: Request): searchPageParams {
  if (req.body && (req.body.pagination || req.body.filters || req.body.sort)) {
    const { pagination, filters, sort } = req.body;
    return {
      pagination: {
        page: Number(pagination?.page) || 1,
        limit: Number(pagination?.limit) || 10,
      },
      filters: Array.isArray(filters) ? (filters as SearchFilter[]) : [],
      sort: Array.isArray(sort) ? (sort as Sort[]) : [],
    };
  }
  const { filters, limit, page, sort } = req.query;

  const parsedPage = parseInt(page as string) || 1;
  const parsedLimit = parseInt(limit as string) || 10;

  let parsedFilters: unknown = [];
  if (filters) {
    try {
      parsedFilters =
        typeof filters === "string" ? JSON.parse(filters) : filters;
    } catch { }
  }

  let parsedSort: unknown = [];
  if (sort) {
    try {
      parsedSort = typeof sort === "string" ? JSON.parse(sort) : sort;
    } catch { }
  }

  return {
    filters: Array.isArray(parsedFilters)
      ? (parsedFilters as SearchFilter[])
      : [],
    pagination: { limit: parsedLimit, page: parsedPage },
    sort: Array.isArray(parsedSort) ? (parsedSort as Sort[]) : [],
  };
}
