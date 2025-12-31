import Express from "express";
import { EntityManager } from "typeorm";
import { AuthRepoPort } from "../../../application/port/auth-repo.port";
import { LoginCredentials } from "../../../domain/models/Auth.models";
import { loginUser } from "../../../application/useCases/auth/login.usecase";
import { logoutUser } from "../../../application/useCases/auth/logout.usecase";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { success } from "zod";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
export const LoginUserController = (AuthRepo: AuthRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    AuthRepo.wrapTransaction(async (t: EntityManager) => {
      console.log(req.body,"????????????????????????");

      const credentials: LoginCredentials = req.body;

      const tokenvalues = await loginUser(t, credentials, AuthRepo);


      res.cookie("accessToken", tokenvalues.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      res.cookie("refreshToken", tokenvalues.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      res.cookie("expIn", (tokenvalues.expIN || "").toString(), {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
      });
      return successmessage(res, "User logged in successfully");

    });

};
export const LogoutUserController = (AuthRepo: AuthRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    AuthRepo.wrapTransaction(async (t: EntityManager) => {
      if (!req.cookies.accessToken)
        throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Invalid access token");
      logoutUser(t, req.cookies.accessToken, AuthRepo);
      res.clearCookie("accessToken");
      return successmessage(res, "User logged Out successfully");
    });
};
