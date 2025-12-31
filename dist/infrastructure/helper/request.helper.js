"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePaginationParams = parsePaginationParams;
function parsePaginationParams(req) {
    const { page, limit, filters, sort, } = req.query;
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;
    let parsedFilters = [];
    if (filters) {
        try {
            parsedFilters = typeof filters === 'string' ? JSON.parse(filters) : filters;
        }
        catch (e) { }
    }
    let parsedSort = [];
    if (sort) {
        try {
            parsedSort = typeof sort === 'string' ? JSON.parse(sort) : sort;
        }
        catch (e) { }
    }
    return {
        pagination: { page: parsedPage, limit: parsedLimit },
        filters: Array.isArray(parsedFilters) ? parsedFilters : [],
        sort: Array.isArray(parsedSort) ? parsedSort : [],
    };
}
