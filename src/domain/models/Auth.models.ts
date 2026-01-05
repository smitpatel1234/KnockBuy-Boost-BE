import { UserRole } from "./User.models";

export interface emailAsIdentifier {
    email: string;
}
export interface LoginCredentials {
    identifier: number | string;
    password: string;
    role: UserRole;
}
export interface phoneNumberAsIdentifier {
    phone_number: number;
}
export interface UsernameAsIdentifier {
    username: string;
}