"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildConstraints = exports.buildConstraintSelects = void 0;
exports.applyPaginationAndFilters = applyPaginationAndFilters;
const applyCommonFilters = (queryBuilder, filters, allowedColumns) => {
    filters.forEach((f, index) => {
        if (!allowedColumns.includes(f.column))
            return;
        const idx = String(index);
        if (f.isSearchByNumber) {
            queryBuilder
                .addSelect(`MAX(${f.column})`, `${f.column}-max`)
                .addSelect(`MIN(${f.column})`, `${f.column}-min`);
        }
        if (f.value)
            queryBuilder.andWhere(`LOWER(${f.column}) LIKE :val${idx}`, {
                [`val${idx}`]: `%${f.value.toLowerCase()}%`,
            });
        if (f.lowerBoundDate)
            queryBuilder.andWhere(`${f.column} >= :lval${idx}`, {
                [`lval${idx}`]: f.lowerBoundDate,
            });
        if (f.lowerBoundNumber)
            queryBuilder.andWhere(`${f.column} >= :lnval${idx}`, {
                [`lnval${idx}`]: String(f.lowerBoundNumber),
            });
        if (f.upperBoundDate)
            queryBuilder.andWhere(`${f.column} <= :uval${idx}`, {
                [`uval${idx}`]: f.upperBoundDate,
            });
        if (f.upperBoundNumber)
            queryBuilder.andWhere(`${f.column} <= :unval${idx}`, {
                [`unval${idx}`]: String(f.upperBoundNumber),
            });
    });
};
const buildConstraintSelects = (constraintFilters) => {
    return constraintFilters.map((f) => ` max(${f.column}) as ${f.column}_max , min(${f.column}) as ${f.column}_min`);
};
exports.buildConstraintSelects = buildConstraintSelects;
const buildConstraints = (constraintFilters, constraintsResultObject) => {
    return constraintFilters.map((f) => ({ column: f.column, max: constraintsResultObject[`${f.column}_max`], min: constraintsResultObject[`${f.column}_min`] }));
};
exports.buildConstraints = buildConstraints;
async function applyPaginationAndFilters(queryBuilder, forConstraintsQueryBuilder, params, allowedColumns, raw = true) {
    const { filters, pagination, sort } = params;
    if (filters.length > 0)
        applyCommonFilters(queryBuilder, filters, allowedColumns);
    if (sort.length > 0)
        sort.forEach((s) => {
            if (allowedColumns.includes(s.column))
                queryBuilder.addOrderBy(s.column, s.order);
        });
    const total = await queryBuilder.getCount();
    queryBuilder
        .offset((pagination.page - 1) * pagination.limit)
        .limit(pagination.limit);
    const data = raw
        ? await queryBuilder.getRawMany()
        : await queryBuilder.getMany();
    const constraintFilters = filters.filter((f) => f.isSearchByNumber ?? f.isSearchByDate);
    const constraintsResult = (0, exports.buildConstraintSelects)(constraintFilters);
    const constraintsResultObject = await forConstraintsQueryBuilder.select(constraintsResult).getRawOne();
    if (!constraintsResultObject)
        return {
            data: data,
            meta: { constraints: [], limit: pagination.limit, page: pagination.page, total, totalPages: Math.ceil(total / pagination.limit) }
        };
    const constraints = (0, exports.buildConstraints)(constraintFilters, constraintsResultObject);
    return {
        data: data,
        meta: { constraints, limit: pagination.limit, page: pagination.page, total, totalPages: Math.ceil(total / pagination.limit) }
    };
}
