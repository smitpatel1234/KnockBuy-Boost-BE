import { z } from "zod";

import { EmailField ,PasswordField,PhoneField,UsernameField} from "./user";
export const LoginCredentials = z.object({
  identifier: z.union([UsernameField, PhoneField, EmailField]),
  password: PasswordField,
  role: z.enum(["ADMIN", "USER"]),
}); 
