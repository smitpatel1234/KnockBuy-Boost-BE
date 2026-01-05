import { SelectQueryBuilder } from "typeorm";

import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";

export async function applyPaginationAndFilters<T>(
    queryBuilder: SelectQueryBuilder<any>,
    params: pageParams,
    raw = true
): Promise<PaginationResponse<T>> {
    const { filters, pagination, sort } = params;
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
        data: data as T[],
        meta: {
            limit: pagination.limit,
            page: pagination.page,
            total,
            totalPages,
        },
    };
}
