import bcrypt from "bcrypt";
import { EntityManager } from "typeorm";

import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import {
  regenerateToken,
} from "../../../infrastructure/helper/TokenGenerator";
import { AuthRepoPort } from "../../port/auth-repo.port";

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
    const isMatch = bcrypt.compareSync(refrehToken, tokenhash);
    if (isMatch) {
      const tokens =  regenerateToken(refrehToken);
      return {
        accessToken: tokens.accesstoken,
        expIN: tokens.expIN
      };
    } else {
      throw new ApplicationError(ApplicationErrorType.BAD_REQUEST,"Invalid token");
    }
  }
};
