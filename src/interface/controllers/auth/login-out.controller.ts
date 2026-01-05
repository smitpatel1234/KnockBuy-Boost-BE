import Express from "express";
import { EntityManager } from "typeorm";
import { success } from "zod";

import { AuthRepoPort } from "../../../application/port/auth-repo.port";
import { loginUser } from "../../../application/useCases/auth/login.usecase";
import { logoutUser } from "../../../application/useCases/auth/logout.usecase";
import { LoginCredentials } from "../../../domain/models/Auth.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const LoginUserController = (AuthRepo: AuthRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    AuthRepo.wrapTransaction(async (t: EntityManager) => {
      const credentials: LoginCredentials = req.body;
      const { token, user } = await loginUser(t, credentials, AuthRepo);
      res.cookie("accessToken", token.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });
      res.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });
      res.cookie("expIn", (token.expIN || "").toString(), {
        httpOnly: false,
        sameSite: "lax",
        secure: false,
      });
      const userProfile = {
        email: user.email,
        phone_number: user.phone_number,
        profile_image: user.profile_image,
        user_id: user.user_id,
        username: user.username,
        wishlist_name: user.wishlist_name
      };
      successmessage(res, "User logged in successfully", userProfile);
    });

};
export const LogoutUserController = (AuthRepo: AuthRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    AuthRepo.wrapTransaction(async (t: EntityManager) => {
      if (!req.cookies.accessToken)
        throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Invalid access token");
      logoutUser(t, req.cookies.accessToken, AuthRepo);
      res.clearCookie("accessToken");
      successmessage(res, "User logged Out successfully");
    });
};
