import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../../infrastructure/helper/TokenGenerator";
import { ApplicationError, ApplicationErrorType } from "./GlobelErrorHandler";
import { logger } from "../logger";
export const authVerification = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new ApplicationError(
        ApplicationErrorType.UNAUTHORIZED,
        "Invalid access token"
      );
    }
    const payload = await verifyToken(token);
    if (payload) {
      req.body = { ...req.body, user: payload };
      logger.info(req.cookies.accessToken, req.body);
      next();
    }
  };
};
