import { EntityManager } from "typeorm";
import {
  genrateToken,
  regenerateToken,
} from "../../../infrastructure/helper/TokenGenerator";
import { AuthRepoPort } from "../../port/auth-repo.port";
import { LoginCredentials } from "../../../domain/models/Auth.models";
import { Envvar } from "../../../infrastructure/orm/config/ormconfig";
import bcrypt from "bcrypt";
import e from "express";

export const refreshToken = async (
  entitiesmanager: EntityManager,
  authRepo: AuthRepoPort,
  refrehToken: string,

  user_id: string
) => {
  const tokenhash = await authRepo.findRefreshTokenHash(
    entitiesmanager,
    user_id
  );
  if (tokenhash) {
    const isMatch =  bcrypt.compareSync(refrehToken, tokenhash);
    if (isMatch) {
      const token = await regenerateToken(refrehToken);
        return {accessToken: token.accesstoken , refreshToken:refrehToken,expIN:token.expIN  };
    } else {
      throw new Error("Invalid tokent");
    }
  }

};
