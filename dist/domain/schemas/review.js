"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReviewSchema = void 0;
const zod_1 = require("zod");
exports.CreateReviewSchema = zod_1.z.object({
    comment: zod_1.z.string().optional(),
    item_id: zod_1.z.string(),
    rating: zod_1.z.number().int().min(1).max(5),
});
