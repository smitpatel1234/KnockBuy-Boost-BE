"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPaginatedResult = void 0;
const buildPaginatedResult = (List, page, pageSize, totalRecords) => ({
    List,
    page,
    pageSize,
    totalRecords,
    totalPages: Math.ceil(totalRecords / pageSize),
});
exports.buildPaginatedResult = buildPaginatedResult;
