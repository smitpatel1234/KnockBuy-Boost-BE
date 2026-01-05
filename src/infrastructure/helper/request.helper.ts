import { Request } from "express";

import { pageParams } from "../../domain/globalTypes/commonFields";

export function parsePaginationParams(req: Request): pageParams {
    const { filters, limit, page, sort, } = req.query;

    const parsedPage = parseInt(page as string) || 1;
    const parsedLimit = parseInt(limit as string) || 10;

    let parsedFilters = [];
    if (filters) {
        try {
            parsedFilters = typeof filters === 'string' ? JSON.parse(filters) : filters;
        } catch (e) { }
    }

    let parsedSort = [];
    if (sort) {
        try {
            parsedSort = typeof sort === 'string' ? JSON.parse(sort) : sort;
        } catch (e) { }
    }

    return {
        filters: Array.isArray(parsedFilters) ? parsedFilters : [],
        pagination: { limit: parsedLimit, page: parsedPage },
        sort: Array.isArray(parsedSort) ? parsedSort : [],
    };
}
