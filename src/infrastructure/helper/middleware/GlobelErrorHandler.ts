import { Request, Response, NextFunction } from "express";
import { HttpError } from "../httpError";
import { displaymessage } from "../displaymessage";
import { StatusCodes } from "../../config/constants";
import { ZodError } from "zod";
import { TypeORMError } from "typeorm";


export const enum ApplicationErrorType {
     NOT_FOUND = "NOT_FOUND",
     UNAUTHORIZED = "UNAUTHORIZED",
     FORBIDDEN = "FORBIDDEN",
     CONFLICT = "CONFLICT",
     BAD_REQUEST = "BAD_REQUEST",
}
export class ApplicationError extends Error {
     title!:ApplicationErrorType
     message!:string
     constructor( title:ApplicationErrorType, message: string) {
          super(message)
          this.title = title
          this.message = message
     }

}

export const GlobelErrorHandler = (err:  Error| HttpError | ZodError | ApplicationError | TypeORMError, req: Request, res: Response, next: NextFunction) => {
        if(err instanceof HttpError) 
             return displaymessage(err.statusCode, res, err.message, err.field);
        if(err instanceof ZodError) 
        {
             const messages = err.issues.map((issue) =>(issue.message) );
             return displaymessage(StatusCodes.BAD_REQUEST , res, messages);
        }
           
        if(err instanceof ApplicationError) 
            switch(err.title){
                case "NOT_FOUND": return displaymessage(StatusCodes.NOT_FOUND, res, err.message); 
                case "UNAUTHORIZED": return displaymessage(StatusCodes.UNAUTHORIZED, res, err.message); 
                case "FORBIDDEN": return displaymessage(StatusCodes.FORBIDDEN, res, err.message); 
                case "CONFLICT": return displaymessage(StatusCodes.CONFLICT, res, err.message); 
                case "BAD_REQUEST": return displaymessage(StatusCodes.BAD_REQUEST, res, err.message); 
            }
        if(err instanceof TypeORMError)
         {
              return displaymessage(StatusCodes.INTERNAL_SERVER_ERROR, res, "NOT_FOUND");
         }
        return displaymessage(StatusCodes.INTERNAL_SERVER_ERROR, res, err.message);
}
