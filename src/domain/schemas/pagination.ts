import * as zod from "zod";
const paginationSchema = zod.object({
    page: zod.number().min(1),
    limit: zod.number().min(1),
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
    pagination: paginationSchema,
    filters: zod.array(filterSchema).optional(),
    sort: zod.array(sortSchema).optional(),
})
