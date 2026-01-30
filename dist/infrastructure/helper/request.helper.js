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
    const parsedPage = Number.parseInt(page) || 1;
    const parsedLimit = Number.parseInt(limit) || 10;
    return {
        filters: Array.isArray(filters) ? filters : [],
        pagination: { limit: parsedLimit, page: parsedPage },
        sort: Array.isArray(sort) ? sort : [],
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
    const parsedPage = Number.parseInt(page) || 1;
    const parsedLimit = Number.parseInt(limit) || 10;
    return {
        filters: Array.isArray(filters)
            ? filters
            : [],
        pagination: { limit: parsedLimit, page: parsedPage },
        sort: Array.isArray(sort) ? sort : [],
    };
}
