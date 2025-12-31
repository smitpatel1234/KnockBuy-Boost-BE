export interface LoginCredentials {
   identifier: string | number; 
  password: string;
  role: "ADMIN" | "USER";
}
export interface UsernameAsIdentifier {
    username: string;
}
export interface phoneNumberAsIdentifier {
    phone_number: number;
}
export interface emailAsIdentifier {
    email: string;
}