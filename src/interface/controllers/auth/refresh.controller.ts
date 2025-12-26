import { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { AuthRepoPort } from "../../../application/port/auth-repo.port";
import { decodedToken } from "../../../infrastructure/helper/TokenGenerator";
import { jwtPayload } from "../../../domain/models/User.models";
import { refreshToken } from "../../../application/useCases/auth/refresh.usecase";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { success } from "zod";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const refreshTokenController = (Authrepo: AuthRepoPort) => {
  return async (req: Request, res: Response) =>
    Authrepo.wrapTransaction(async (t: EntityManager) => {
      const refrehToken = await req.cookies.refreshToken;
      const authToken = await req.cookies.accessToken;
      const payload = (await decodedToken(authToken)) as jwtPayload;
      const user_id = payload.id;
      const tokenvalues = await refreshToken(t, Authrepo, refrehToken, user_id);

      if (!tokenvalues) {
        throw new ApplicationError(
          ApplicationErrorType.UNAUTHORIZED,
          "Invalid access token"
        );
      }
      res.cookie("accessToken", tokenvalues.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
      res.cookie("refreshToken", tokenvalues.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.cookie("expIn", tokenvalues.expIN, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
      });

      return successmessage(res,"token is refreshed");
    });
};
