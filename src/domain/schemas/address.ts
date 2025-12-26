import {z} from "zod"
export const AddressSchema = z.object({
    address_line1: z.string().max(100),
    address_line2: z.string().max(100).optional(),
    city: z.string().max(50),
    state: z.string().max(50),
    country: z.string().max(50),
    pincode: z.number().min(100000).max(999999)
})
export const AddressIdSchema = z.object({
    address_id: z.string().uuid()
})
export const UpdateAddressSchema = AddressSchema.extend({
    address_id: z.string().uuid(),
}).partial().required({ address_id: true });