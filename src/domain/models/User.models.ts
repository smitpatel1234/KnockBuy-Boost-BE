import { JwtPayload } from "jsonwebtoken";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}
export interface ExpIN {
    exp: number

}

export interface MYJwtPayload extends JwtPayload {
    id: string;
    role: UserRole;
    
}
export  interface Token  {
     accessToken:string,
     expIN:number
     refreshToken:string,
}
export interface UserCredentials {
    email: string;
    password: string;
    phone_number: string;
    username: string;
}
export interface UserProfile {
    addresseses?: string[]
    email: string;
    phone_number: string;
    profile_image?: string;
    user_id: string;
    username: string;
    wishlist_name?: string;
}



