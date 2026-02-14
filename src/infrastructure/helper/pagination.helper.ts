import { SelectQueryBuilder } from "typeorm";

import {
  Filter,
  MaxMinConstraints,
  pageParams,
  PaginationResponse,
} from "../../domain/globalTypes/commonFields";

const applyCommonFilters = <Entity extends object>(
  queryBuilder: SelectQueryBuilder<Entity>,
  filters: Filter[],
  allowedColumns: string[],
) => {
  filters.forEach((f, index) => {
    if (!allowedColumns.includes(f.column)) return;
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

export const buildConstraintSelects = (constraintFilters: Filter[]): string[] => {
  return constraintFilters.map((f) => ` max(${f.column}) as ${f.column}_max , min(${f.column}) as ${f.column}_min`);
};

export const buildConstraints = (constraintFilters: Filter[], constraintsResultObject: Record<string, unknown>): MaxMinConstraints[] => {
  return constraintFilters.map((f) => ({ column: f.column, max: constraintsResultObject[`${f.column}_max`] as number | string, min: constraintsResultObject[`${f.column}_min`] as number | string }));
};


export async function applyPaginationAndFilters<Entity extends object, T = Entity>(
  queryBuilder: SelectQueryBuilder<Entity>,
  forConstraintsQueryBuilder: SelectQueryBuilder<Entity>,
  params: pageParams,
  allowedColumns: string[],
  raw = true,
): Promise<PaginationResponse<T>> {
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
  const constraintsResult = buildConstraintSelects(constraintFilters);
  const constraintsResultObject = await forConstraintsQueryBuilder.select(constraintsResult).getRawOne() as null | Record<string, unknown> ;
  if (!constraintsResultObject)
     return { 
    data: data as unknown as T[],
     meta: { constraints: [], limit: pagination.limit, page: pagination.page, total, totalPages: Math.ceil(total / pagination.limit) } 
    };
  const constraints = buildConstraints(constraintFilters, constraintsResultObject);
  return {
     data: data as unknown as T[], 
     meta: { constraints, limit: pagination.limit, page: pagination.page, total, totalPages: Math.ceil(total / pagination.limit) } 
    };
}

