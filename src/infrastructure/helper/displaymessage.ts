import { Response } from "express";
export const displaymessage= (
    message:any,
    res:Response,
    errors?:any,
    data?:any
    
)=>{
        if(data){    
            return res.status(message.code).json(data);
        }
     if(errors){
        const messages=errors.map((error:any)=>{
                return  error.message
        })
        return res.status(message.code).json(messages);
     }
              return res.status(message.code).json(message.message);

}