import { NextFunction,Request,Response } from "express";
export const validateDetails= (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => { 
        
        await schema.parse(req.body);      
        next();        
    };
};