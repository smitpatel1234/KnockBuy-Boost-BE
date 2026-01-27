"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePaginationParams = parsePaginationParams;
exports.parseSearchPaginationParams = parseSearchPaginationParams;
function parsePaginationParams(req) {
    if (req.body &&
        (req.body.pagination ||
            req.body.filters ||
            req.body.sort)) {
        const body = req.body;
        const { filters, pagination, sort } = body;
        return {
            filters: Array.isArray(filters) ? filters : [],
            pagination: {
                limit: Number(pagination?.limit) || 10,
                page: Number(pagination?.page) || 1,
            },
            sort: Array.isArray(sort) ? sort : [],
        };
    }
    const { filters, limit, page, sort } = req.query;
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;
    let parsedFilters = [];
    if (filters) {
        try {
            parsedFilters =
                typeof filters === "string" ? JSON.parse(filters) : filters;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (_e) {
            /* empty */
        }
    }
    let parsedSort = [];
    if (sort) {
        try {
            parsedSort = typeof sort === "string" ? JSON.parse(sort) : sort;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (_e) {
            /* empty */
        }
    }
    return {
        filters: Array.isArray(parsedFilters) ? parsedFilters : [],
        pagination: { limit: parsedLimit, page: parsedPage },
        sort: Array.isArray(parsedSort) ? parsedSort : [],
    };
}
function parseSearchPaginationParams(req) {
    const body = req.body;
    if (body && (body.pagination || body.filters || body.sort)) {
        const { filters, pagination, sort } = body;
        return {
            filters: Array.isArray(filters) ? filters : [],
            pagination: {
                limit: Number(pagination?.limit) || 10,
                page: Number(pagination?.page) || 1,
            },
            sort: Array.isArray(sort) ? sort : [],
        };
    }
    const { filters, limit, page, sort } = req.query;
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;
    let parsedFilters = [];
    if (filters) {
        try {
            parsedFilters =
                typeof filters === "string" ? JSON.parse(filters) : filters;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (_e) {
            /* empty */
        }
    }
    let parsedSort = [];
    if (sort) {
        try {
            parsedSort = typeof sort === "string" ? JSON.parse(sort) : sort;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (_e) {
            /* empty */
        }
    }
    return {
        filters: Array.isArray(parsedFilters)
            ? parsedFilters
            : [],
        pagination: { limit: parsedLimit, page: parsedPage },
        sort: Array.isArray(parsedSort) ? parsedSort : [],
    };
}
