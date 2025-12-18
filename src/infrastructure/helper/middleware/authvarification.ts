
import     { Express , Request, Response,NextFunction } from "express";
import { constants } from "../../config/constants";
import { EntityManager } from "typeorm";
import { verifyToken } from "../../../infrastructure/helper/TokenGenerator";
import { displaymessage } from "../displaymessage";
export const authVerification = ()=>
{ return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return displaymessage(constants.Code.UNAUTHORIZED, res, ["Access token missing"]);
    }
    verifyToken(token).then((payload) => {
        if (payload) {
            (req as any).user = payload;
            next();
        } else {
            return displaymessage(constants.Code.UNAUTHORIZED, res, ["Invalid access token"]);
        }
    }).catch(() => {
        return displaymessage(constants.Code.UNAUTHORIZED, res, ["Invalid access token"]);
    });}
};