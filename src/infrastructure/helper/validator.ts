import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
export const validateDetails = (schema: ZodType) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        await schema.parse(req.body);
        next();
    };
};