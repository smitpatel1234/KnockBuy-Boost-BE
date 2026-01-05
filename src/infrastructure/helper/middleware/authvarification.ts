import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../../domain/models/User.models";
import { verifyToken } from "../../../infrastructure/helper/TokenGenerator";
import { logger } from "../logger";
import { ApplicationError, ApplicationErrorType } from "./GlobelErrorHandler";

export const authVerification = (allowedRoles?: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("Auth verification middleware called", req.params.id);
    const token = req.cookies.accessToken as string;
    if (!token) {
      throw new ApplicationError(
        ApplicationErrorType.UNAUTHORIZED,
        "Invalid access token"
      );
    }
    const payload = await verifyToken(token);
    if (payload) {
      const userRole = payload.role;
      if (allowedRoles && userRole !== UserRole.ADMIN && !allowedRoles.includes(userRole)) {
        throw new ApplicationError(
          ApplicationErrorType.FORBIDDEN,
          "Permission denied: You do not have the required role to access this resource"
        );
      }
      req.body = { ...req.body, user: payload };
      logger.info(req.cookies.accessToken, req.body);
      next();
    }
  };
};
