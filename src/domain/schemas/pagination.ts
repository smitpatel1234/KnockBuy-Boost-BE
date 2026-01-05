import * as zod from "zod";
const paginationSchema = zod.object({
    limit: zod.number().min(1),
    page: zod.number().min(1),
})
const filterSchema = zod.object({
    column: zod.string(),
    value: zod.string()
})
const sortSchema = zod.object({
    column: zod.string(),
    order: zod.enum(["ASC", "DESC"])
})
export const pageParamsSchema = zod.object({
    filters: zod.array(filterSchema).optional(),
    pagination: paginationSchema,
    sort: zod.array(sortSchema).optional(),
})
