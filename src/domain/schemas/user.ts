import { z } from "zod";
export const IdField = z.string().uuid();
export const UsernameField = z.string()
  .max(50)
  .min(3)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/, "Invalid username");

export const PasswordField = z.string()
  .max(50)
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-&!])[A-Za-z\d-&!]{8,}$/, "Invalid password");

export const EmailField = z.email();

export const PhoneField = z.number().min(1000000000).max(9999999999);

export const userCredentials = z.object({
  username: UsernameField,
  password: PasswordField,
  email: EmailField,
  phone_number: PhoneField,
});

export const UsernameAsIdentifier = z.object({ username: UsernameField });
export const emailAsIdentifier = z.object({ email: EmailField });
export const phoneNumberAsIdentifier = z.object({ phone_number: PhoneField });

export const userProfile  = z.object({
    user_id:IdField,
    username: UsernameField,
    email: EmailField,
    phone_number: PhoneField,
    wishlist_name: z.string().max(100).optional(),
    profile_image: z.string().optional()
});
export const user_id_schema = z.object({
    user_id:IdField
});