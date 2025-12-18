import { UUID } from "crypto";

export interface UserCredentials {
    username: string;
    password: string;
    email: string;
    phone_number: number;
}
export interface jwtPayload {
    id:UUID;
    role:'ADMIN' | 'USER';
    
} 
export interface UserProfile {
    user_id:UUID;
    username: string;
    password: string;
    email: string;
    phone_number: number;
    wishlist_name?: string;
}


