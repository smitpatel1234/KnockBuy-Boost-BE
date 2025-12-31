import { z } from "zod";
import { UsernameField ,PasswordField,EmailField,PhoneField} from "./user";
export const LoginCredentials = z.object({
  identifier: z.union([UsernameField, PhoneField, EmailField]),
  role: z.enum(["ADMIN", "USER"]),
  password: PasswordField,
}); 
