"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePaginationParams = parsePaginationParams;
exports.parseSearchPaginationParams = parseSearchPaginationParams;
function parsePaginationParams(req) {
    const { filters, limit, page, sort } = req.query;
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;
    let parsedFilters = [];
    if (filters) {
        try {
            parsedFilters =
                typeof filters === "string" ? JSON.parse(filters) : filters;
        }
        catch {
            // Ignore malformed filters
        }
    }
    let parsedSort = [];
    if (sort) {
        try {
            parsedSort = typeof sort === "string" ? JSON.parse(sort) : sort;
        }
        catch {
            // Ignore malformed sort
        }
    }
    return {
        filters: Array.isArray(parsedFilters) ? parsedFilters : [],
        pagination: { limit: parsedLimit, page: parsedPage },
        sort: Array.isArray(parsedSort) ? parsedSort : [],
    };
}
function parseSearchPaginationParams(req) {
    const { filters, limit, page, sort } = req.query;
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;
    let parsedFilters = [];
    if (filters) {
        try {
            parsedFilters =
                typeof filters === "string" ? JSON.parse(filters) : filters;
        }
        catch { }
    }
    let parsedSort = [];
    if (sort) {
        try {
            parsedSort = typeof sort === "string" ? JSON.parse(sort) : sort;
        }
        catch { }
    }
    return {
        filters: Array.isArray(parsedFilters)
            ? parsedFilters
            : [],
        pagination: { limit: parsedLimit, page: parsedPage },
        sort: Array.isArray(parsedSort) ? parsedSort : [],
    };
}
