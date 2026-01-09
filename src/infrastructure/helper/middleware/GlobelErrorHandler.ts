import { NextFunction, Request, Response } from "express";
import { TypeORMError } from "typeorm";
import { ZodError } from "zod";

import { StatusCodes } from "../../config/constants";
import { displaymessage } from "../displaymessage";
import { HttpError } from "../httpError";


export const enum ApplicationErrorType {
     BAD_REQUEST = "BAD_REQUEST",
     CONFLICT = "CONFLICT",
     FORBIDDEN = "FORBIDDEN",
     NOT_FOUND = "NOT_FOUND",
     UNAUTHORIZED = "UNAUTHORIZED",
}
export class ApplicationError extends Error {
     message!:string
     title!:ApplicationErrorType
     constructor( title:ApplicationErrorType, message: string) {
          super(message)
          this.title = title
          this.message = message
     }

}

export const GlobelErrorHandler = (err:  ApplicationError| Error | HttpError | TypeORMError | ZodError, req: Request, res: Response,next:NextFunction) => {
        if(err instanceof HttpError) 
             { displaymessage(err.statusCode, res, err.message, err.field); return; }
        if(err instanceof ZodError) 
        {
             const messages = err.issues.map((issue) =>(issue.message) );
             displaymessage(StatusCodes.UNPROCESSABLE_ENTITY , res, messages); return;
        }
           
        if(err instanceof ApplicationError) 
            switch(err.title){
                case ApplicationErrorType.BAD_REQUEST: { displaymessage(StatusCodes.BAD_REQUEST, res, err.message); return; } 
                case ApplicationErrorType.CONFLICT: { displaymessage(StatusCodes.CONFLICT, res, err.message); return; } 
                case ApplicationErrorType.FORBIDDEN: { displaymessage(StatusCodes.FORBIDDEN, res, err.message); return; } 
                case ApplicationErrorType.NOT_FOUND: { displaymessage(StatusCodes.NOT_FOUND, res, err.message); return; } 
                case ApplicationErrorType.UNAUTHORIZED: { displaymessage(StatusCodes.UNAUTHORIZED, res, err.message); return; } 
            }
        if(err instanceof TypeORMError)
         {  
              displaymessage(StatusCodes.INTERNAL_SERVER_ERROR, res, err.message); return;
         }
        displaymessage(StatusCodes.INTERNAL_SERVER_ERROR, res, err.message);
        next()
}
