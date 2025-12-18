import { EntityManager } from "typeorm";
import { User } from "../orm/entities/user";
import { LoginCredentials } from "../../domain/models/Auth.models";
import { UUID } from "crypto";
import { AuthRepoPort } from "../../application/port/auth-repo.port";
import {
  UsernameAsIdentifier,
  emailAsIdentifier,
  phoneNumberAsIdentifier,
} from "../../domain/schemas/user";
import { wrapTransaction } from "../helper/transaction";

export const AuthRepo: AuthRepoPort = {
  FindUser: async (t: EntityManager, credentials: LoginCredentials) => {

   return   await t
      .getRepository(User)
      .findOne({
        where: [
          { username: credentials.identifier as string },
          { email: credentials.identifier as string },
          { phone_number: credentials.identifier as number },
        ],
      });
  },

  saveRefreshToken: async (
    t: EntityManager,
    { id, refreshToken }: { id: UUID; refreshToken: string }
  ) => {
    await t
      .getRepository(User)
      .update({ user_id: id }, { refresh_token: refreshToken });
  },
  removeRefreshToken: async (t: EntityManager, id: UUID) => {
    await t
      .getRepository(User)
      .update({ user_id: id }, { refresh_token: null});
  },
  wrapTransaction: wrapTransaction,
};
