import { NextFunction,Request,Response } from "express";
import { constants } from "../config/constants";
import { displaymessage } from "./displaymessage";
export const validateDetails = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
         
            const result = await schema.safeParse(req.body);
            if (!result.success) {
                return displaymessage(constants.Code.BAD_REQUEST, res, result.error.issues);
            }
            next();        
    };
};