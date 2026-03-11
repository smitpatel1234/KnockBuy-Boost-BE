import { z } from "zod";

export const CreateReviewSchema = z.object({
    comment: z.string().optional(),
    item_id: z.string(),
    rating: z.number().int().min(1).max(5),
});
