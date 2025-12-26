import { EntityManager } from "typeorm";
import { User } from "../orm/entities/user";
import { LoginCredentials } from "../../domain/models/Auth.models";
import { AuthRepoPort } from "../../application/port/auth-repo.port";
import { wrapTransaction } from "../helper/transaction";

export const AuthRepo: AuthRepoPort = {
  FindUser: async (t: EntityManager, credentials: LoginCredentials) => {

    return await t
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
    { id, refreshToken }: { id: string; refreshToken: string }
  ) => {

    
    await t
      .getRepository(User)
      .update({ user_id: id }, { refresh_token: refreshToken });
  },
  removeRefreshToken: async (t: EntityManager, id: string) => {
    await t
      .getRepository(User)
      .update({ user_id: id }, { refresh_token: null });
  },
  findRefreshTokenHash: async (t: EntityManager, id: string) => {
    const user = await t
      .getRepository(User)
      .findOne({ where: { user_id: id } });
    return user?.refresh_token ? user.refresh_token :null ;
  },
  wrapTransaction: wrapTransaction,
};
