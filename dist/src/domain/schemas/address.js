"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAddressSchema = exports.AddressIdSchema = exports.AddressSchema = void 0;
const zod_1 = require("zod");
exports.AddressSchema = zod_1.z.object({
    address_line1: zod_1.z.string().max(100),
    address_line2: zod_1.z.string().max(100).optional(),
    city: zod_1.z.string().max(50),
    country: zod_1.z.string().max(50),
    pincode: zod_1.z.number().min(100000).max(999999),
    state: zod_1.z.string().max(50)
});
exports.AddressIdSchema = zod_1.z.object({
    address_id: zod_1.z.string()
});
exports.UpdateAddressSchema = exports.AddressSchema.extend({
    address_id: zod_1.z.string()
}).partial().required({ address_id: true });
