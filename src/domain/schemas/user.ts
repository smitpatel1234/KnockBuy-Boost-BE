import { z } from "zod";
export const IdField = z.string();
export const UsernameField = z.string()
  .max(50)
  .min(3)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/, "Invalid username");

export const PasswordField = z.string()
  .max(50)
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-&!])[A-Za-z\d-&!]{8,}$/, "Invalid password");

export const EmailField = z.email();

export const PhoneField = z.string().regex(/^[0-9]{10}$/, "Invalid phone number");

export const userCredentials = z.object({
  email: EmailField,
  password: PasswordField,
  phone_number: PhoneField,
  username: UsernameField,
});

export const UsernameAsIdentifier = z.object({ username: UsernameField });
export const emailAsIdentifier = z.object({ email: EmailField });
export const phoneNumberAsIdentifier = z.object({ phone_number: PhoneField });

export const userProfile  = z.object({
    email: EmailField,
    phone_number: PhoneField,
    profile_image: z.string().optional(),
    user_id:IdField,
    username: UsernameField,
    wishlist_name: z.string().max(100).optional()
});
export const user_id_schema = z.object({
    user_id:IdField
});