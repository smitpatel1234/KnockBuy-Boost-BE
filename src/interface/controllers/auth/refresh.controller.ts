import { Request, Response } from "express";
import { EntityManager } from "typeorm";

import { AuthRepoPort } from "../../../application/port/auth-repo.port";
import { refreshToken } from "../../../application/useCases/auth/refresh.usecase";
import { jwtPayload } from "../../../domain/models/User.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { decodedToken } from "../../../infrastructure/helper/TokenGenerator";

export const refreshTokenController = (Authrepo: AuthRepoPort) => {
  return async (req: Request, res: Response) =>
    Authrepo.wrapTransaction(async (t: EntityManager) => {
      const refrehToken = req.cookies.refreshToken;
      if (!refrehToken) {
        throw new ApplicationError(
          ApplicationErrorType.UNAUTHORIZED,
          "Refresh token missing"
        );
      }

      const payload = (await decodedToken(refrehToken)) as jwtPayload;
      if (!payload?.id) {
        throw new ApplicationError(
          ApplicationErrorType.UNAUTHORIZED,
          "Invalid refresh token"
        );
      }

      const user_id = payload.id;
      const tokenvalues = await refreshToken(t, Authrepo, refrehToken, user_id);

      if (!tokenvalues) {
        throw new ApplicationError(
          ApplicationErrorType.UNAUTHORIZED,
          "Token refresh failed"
        );
      }

      res.cookie("accessToken", tokenvalues.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });

      res.cookie("expIn", tokenvalues.expIN, {
        httpOnly: false,
        sameSite: "lax",
        secure: true,
      });

      successmessage(res, "token is refreshed");
    });
};
