import { SelectQueryBuilder } from "typeorm";

import {
  Filter,
  MaxMinConstraints,
  pageParams,
  PaginationResponse,
  SearchFilter,
  searchPageParams,
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

const applySearchFilters = <Entity extends object>(
  queryBuilder: SelectQueryBuilder<Entity>,
  filters: SearchFilter[],
  allowedColumns: string[],
) => {
  filters.forEach((f, index) => {
    if (!allowedColumns.includes(f.column)) return;
    const idx = String(index);
    const pName = `val${idx}`;
    const minP = `min${idx}`;
    const maxP = `max${idx}`;

    if (f.between && Array.isArray(f.between)) {
      queryBuilder.andWhere(`${f.column} BETWEEN :${minP} AND :${maxP}`, {
        [maxP]: f.between[1],
        [minP]: f.between[0],
      });
    } else if (f.eq !== undefined)
      queryBuilder.andWhere(`${f.column} = :${pName}`, { [pName]: f.eq });
    else if (f.gt !== undefined)
      queryBuilder.andWhere(`${f.column} >= :${pName}`, { [pName]: f.gt });
    else if (f.lt !== undefined)
      queryBuilder.andWhere(`${f.column} <= :${pName}`, { [pName]: f.lt });
    else if (f.in && Array.isArray(f.in) && f.in.length > 0)
      queryBuilder.andWhere(`${f.column} IN (:...${pName})`, { [pName]: f.in });
    else if (f.like !== undefined) {
      const val = typeof f.like === "string" ? f.like : String(f.like);
      queryBuilder.andWhere(`LOWER(${f.column}) LIKE :${pName}`, {
        [pName]: `%${val.toLowerCase()}%`,
      });
    }
  });
};

export async function applyPaginationAndFilters<
  Entity extends object,
  T = Entity,
>(
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

  const constraintFilters = filters.filter(
    (f) => f.isSearchByNumber || f.isSearchByDate,
  );
  console.log(constraintFilters);
  let constraintsResult: string[] = [];

  for (const f of constraintFilters) {
      constraintsResult.push(` max(${f.column}) as ${f.column}_max , min(${f.column}) as ${f.column}_min `);
  }
  const constraintsResultObject = await forConstraintsQueryBuilder
      .select(constraintsResult).getRawOne();
  const constraints: MaxMinConstraints[] = constraintFilters.map((f) => ({
    column: f.column,
    max: constraintsResultObject[`${f.column}_max`],
    min: constraintsResultObject[`${f.column}_min`],
  }));
  return {
    data: data as unknown as T[],
    meta: {
      constraints: constraints,
      limit: pagination.limit,
      page: pagination.page,
      total,
      totalPages: Math.ceil(total / pagination.limit),
    },
  };
}

export async function applySearchAndFilters<Entity extends object, T = Entity>(
  queryBuilder: SelectQueryBuilder<Entity>,
  forConstraintsQueryBuilder: SelectQueryBuilder<Entity>,
  params: searchPageParams,
  allowedColumns: string[],
  raw = true,
): Promise<PaginationResponse<T>> {
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
  return {
    data: data as unknown as T[],
    meta: {
      constraints: [],
      limit: pagination.limit,
      page: pagination.page,
      total,
      totalPages: Math.ceil(total / pagination.limit),
    },
  };
}
