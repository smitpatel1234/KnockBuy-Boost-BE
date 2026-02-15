"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySearchAndFilters = applySearchAndFilters;
const pagination_helper_1 = require("./pagination.helper");
const applySearchFilters = (queryBuilder, filters, allowedColumns) => {
    filters.forEach((f, index) => {
        if (!allowedColumns.includes(f.column))
            return;
        const idx = String(index);
        const pName = `val${idx}`;
        // const minP = `min${idx}`;
        // const maxP = `max${idx}`;
        if (f.between && Array.isArray(f.between)) {
            // queryBuilder.andWhere(`${f.column} BETWEEN :${minP} AND :${maxP}`, {
            //   [maxP]: f.between[1],
            //   [minP]: f.between[0],
            // });
        }
        else if (f.eq) {
            const val = typeof f.eq === "string" ? f.eq : String(f.eq);
            queryBuilder.andWhere(`LOWER(${f.column}) LIKE :${pName}`, {
                [pName]: `%${val.toLowerCase()}%`,
            });
        }
        else if (f.gt)
            queryBuilder.andWhere(`${f.column} >= :${pName}`, { [pName]: f.gt });
        else if (f.lt)
            queryBuilder.andWhere(`${f.column} <= :${pName}`, { [pName]: f.lt });
        else if (f.in && Array.isArray(f.in) && f.in.length > 0)
            queryBuilder.andWhere(`${f.column} IN (:...${pName})`, { [pName]: f.in });
        else if (f.like) {
            const val = typeof f.like === "string" ? f.like : String(f.like);
            queryBuilder.andWhere(`LOWER(${f.column}) LIKE :${pName}`, {
                [pName]: `%${val.toLowerCase()}%`,
            });
            queryBuilder.addOrderBy(`CASE
          WHEN LOWER(${f.column}) = :exact${idx} THEN 1
          WHEN LOWER(${f.column}) LIKE :start${idx} THEN 2
          WHEN LOWER(${f.column}) LIKE :contain${idx} THEN 3
          ELSE 4
        END`, "ASC");
            queryBuilder.setParameters({
                [`contain${idx}`]: `%${val}%`,
                [`exact${idx}`]: val,
                [`start${idx}`]: `${val}%`,
            });
        }
    });
};
async function applySearchAndFilters(queryBuilder, forConstraintsQueryBuilder, params, allowedColumns, raw = true) {
    const { filters, pagination, sort } = params;
    if (filters.length > 0)
        applySearchFilters(queryBuilder, filters, allowedColumns);
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
    // Apply filters to constraints query builder for price min/max
    if (filters.length > 0)
        applySearchFilters(forConstraintsQueryBuilder, filters, allowedColumns);
    const constraintFilters = filters.filter((f) => f.isSearchByNumber ?? f.isSearchByDate);
    const constraintsResult = (0, pagination_helper_1.buildConstraintSelects)(constraintFilters);
    let constraintsResultObject = {};
    if (constraintsResult.length > 0)
        constraintsResultObject =
            (await forConstraintsQueryBuilder
                .select(constraintsResult)
                .getRawOne()) ?? {};
    const constraints = (0, pagination_helper_1.buildConstraints)(constraintFilters, constraintsResultObject);
    return {
        data: data,
        meta: {
            constraints,
            limit: pagination.limit,
            page: pagination.page,
            total,
            totalPages: Math.ceil(total / pagination.limit),
        },
    };
}
