import { Response } from "express";
import { StatusCodes } from "../config/constants";
export const displaymessage= (
    StatusCodes:number,
    res:Response,   
    message?:string | string[],
    data?:unknown
)=>{
    res.status(StatusCodes).json({message,data});
}

export const successmessage = (
    res:Response,   
    message?:string,
    data?:unknown
)=>{
   if(message)
    return displaymessage(StatusCodes.OK, res, message, data);
   return displaymessage(StatusCodes.OK, res, "Request is successful", data);
   
}

