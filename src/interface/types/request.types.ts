import { Request } from "express";

import { MYJwtPayload } from "../../domain/models/User.models";

export interface AuthRequest<T = unknown> extends Request {
    body: T & {
        user: MYJwtPayload;
    };
}

export interface PublicRequest<T = unknown> extends Request {
    body: T;
}

export interface TypedRequest<T = unknown, C extends Record<string, unknown> = Record<string, string>> extends Request {
    body: T;
    cookies: C;
}
