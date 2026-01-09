import { NextFunction, Request, Response } from "express";

import { UserRole } from "../../../domain/models/User.models";
import { verifyToken } from "../../../infrastructure/helper/TokenGenerator";
import { ApplicationError, ApplicationErrorType } from "./GlobelErrorHandler";

export const authVerification = (allowedRoles?: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.accessToken as string;
    if (!token) {
      throw new ApplicationError(
        ApplicationErrorType.UNAUTHORIZED,
        "Invalid access token"
      );
    }
    const payload = verifyToken(token);
    const userRole = payload.role;
    req.body = { ...(req.body as Record<string, unknown>), user: payload };
    if (allowedRoles && userRole !== UserRole.ADMIN && !allowedRoles.includes(userRole)) {
      throw new ApplicationError(
        ApplicationErrorType.FORBIDDEN,
        "Permission denied: You do not have the required role to access this resource"
      );
    }

    next();
  };
};
