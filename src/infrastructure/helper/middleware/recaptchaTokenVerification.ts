import { NextFunction, Request, Response } from "express";

import {ENV} from "../env/index";
import { ApplicationError, ApplicationErrorType } from "./GlobelErrorHandler";

export const recaptchaTokenVerification = () => {
  return async (req: Request, res: Response, next: NextFunction) => {

    const token = (req.body as Record<string, unknown>).recaptchaToken as string;
    if (!token) {
      throw new ApplicationError(
        ApplicationErrorType.UNAUTHORIZED,
        "Invalid access token"
      );
    }
    const payload = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      body: `secret=${ENV.RECAPTCHA_SECRET_KEY}&response=${token}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })
    const result = await payload.json() as { score?: number; success?: boolean; };
    if (!result.success) {
      throw new ApplicationError(
        ApplicationErrorType.UNAUTHORIZED,
        "Recaptcha verification failed"
      );
    }
    next();
  };
};
