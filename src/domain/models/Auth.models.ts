export interface LoginCredentials {
   identifier: string | number; 
  password: string;
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