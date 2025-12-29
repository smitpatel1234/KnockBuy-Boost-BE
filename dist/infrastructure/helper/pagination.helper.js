"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPaginationAndFilters = applyPaginationAndFilters;
async function applyPaginationAndFilters(queryBuilder, params, raw = true) {
    const { pagination, filters, sort } = params;
    const skip = (pagination.page - 1) * pagination.limit;
    if (filters && filters.length > 0) {
        filters.forEach((f, index) => {
            queryBuilder.andWhere(`LOWER(${f.column}) LIKE :val${index}`, {
                [`val${index}`]: `%${String(f.value).toLowerCase()}%`,
            });
        });
    }
    if (sort && sort.length > 0) {
        sort.forEach((s) => {
            queryBuilder.addOrderBy(s.column, s.order);
        });
    }
    const total = await queryBuilder.getCount();
    queryBuilder.offset(skip).limit(pagination.limit);
    const data = raw
        ? await queryBuilder.getRawMany()
        : await queryBuilder.getMany();
    const totalPages = Math.ceil(total / pagination.limit);
    return {
        data: data,
        meta: {
            total,
            page: pagination.page,
            limit: pagination.limit,
            totalPages,
        },
    };
}
