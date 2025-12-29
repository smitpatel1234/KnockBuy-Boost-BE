import { JwtPayload } from "jsonwebtoken";

export interface UserCredentials {
    username: string;
    password: string;
    email: string;
    phone_number: number;
}
export interface jwtPayload extends JwtPayload {
    id: string;
    role: 'ADMIN' | 'USER';

}
export interface ExpIN {
    exp: number

}
export interface UserProfile {
    user_id: string;
    username: string;
    email: string;
    phone_number: number;
    wishlist_name?: string;
    addresseses?: string[]
    profile_image?: string;
}


