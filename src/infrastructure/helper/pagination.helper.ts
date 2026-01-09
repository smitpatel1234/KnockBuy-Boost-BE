import { SelectQueryBuilder } from "typeorm";

import { pageParams, PaginationResponse, searchPageParams } from "../../domain/globalTypes/commonFields";

export async function applyPaginationAndFilters<Entity extends object, T = Entity>(
    queryBuilder: SelectQueryBuilder<Entity>,
    params: pageParams,
    raw = true
): Promise<PaginationResponse<T>> {
    const { filters, pagination, sort } = params;
    const skip = (pagination.page - 1) * pagination.limit;

    if (filters.length > 0) {
        filters.forEach((f, index) => {
            queryBuilder.andWhere(`LOWER(${f.column}) LIKE :val${String(index)}`, {
                [`val${String(index)}`]: `%${(f.value).toLowerCase()}%`,
            })
        })
    }

    if (sort.length > 0) {
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
        data: data as unknown as T[],
        meta: {
            limit: pagination.limit,
            page: pagination.page,
            total,
            totalPages,
        },
    };
}

export async function applySearchAndFilters<Entity extends object, T = Entity>(
    queryBuilder: SelectQueryBuilder<Entity>,
    params: searchPageParams,
    raw = true
): Promise<PaginationResponse<T>> {
    const { filters, pagination, sort } = params;
    const skip = (pagination.page - 1) * pagination.limit;

    if (filters.length > 0) {
        filters.forEach((f, index) => {
            const paramName = `val${String(index)}`;
            if (f.between && Array.isArray(f.between)) {
                const maxParam = `max${String(index)}`;
                const minParam = `min${String(index)}`;
                queryBuilder.andWhere(`${f.column} BETWEEN :${minParam} AND :${maxParam}`, {
                    [maxParam]: f.between[1],
                    [minParam]: f.between[0]
                });
            } else if (f.eq !== undefined) {
                queryBuilder.andWhere(`${f.column} = :${paramName}`, { [paramName]: f.eq });
            } else if (f.gt !== undefined) {
                queryBuilder.andWhere(`${f.column} > :${paramName}`, { [paramName]: f.gt });
            } else if (f.in && Array.isArray(f.in) && f.in.length > 0) {
                queryBuilder.andWhere(`${f.column} IN (:...${paramName})`, { [paramName]: f.in });
            } else if (f.lt !== undefined) {
                queryBuilder.andWhere(`${f.column} < :${paramName}`, { [paramName]: f.lt });
            } else if (f.like !== undefined) {
                const val = typeof f.like === 'string' ? f.like : String(f.like);
                queryBuilder.andWhere(`LOWER(${f.column}) LIKE :${paramName}`, {
                    [paramName]: `%${val.toLowerCase()}%`,
                });
            }
        });
    }

    if (sort.length > 0) {
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
        data: data as unknown as T[],
        meta: {
            limit: pagination.limit,
            page: pagination.page,
            total,
            totalPages,
        },
    };
}
