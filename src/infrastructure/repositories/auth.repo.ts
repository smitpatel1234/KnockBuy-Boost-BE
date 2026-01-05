import { Brackets, EntityManager, WhereExpressionBuilder } from "typeorm";

import { AuthRepoPort } from "../../application/port/auth-repo.port";
import { LoginCredentials } from "../../domain/models/Auth.models";
import { wrapTransaction } from "../helper/transaction";
import { User } from "../orm/entities/user";

export const AuthRepo: AuthRepoPort = {
  findRefreshTokenHash: async (t: EntityManager, id: string) => {
    const user = await t
      .getRepository(User)
      .findOne({ where: { user_id: id } });
    return user?.refresh_token ? user.refresh_token : null;
  },

  FindUser: async (t: EntityManager, credentials: LoginCredentials) => {

    return await t
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.role = :role", { role: credentials.role })
      .andWhere(
        new Brackets((qb: WhereExpressionBuilder) => {
          qb.where("user.username = :identifier")
            .orWhere("user.email = :identifier")
            .orWhere("user.phone_number = :identifier");
        }),
      )
      .setParameter("identifier", credentials.identifier)
      .getOne();

  },
  removeRefreshToken: async (t: EntityManager, id: string) => {
    await t
      .getRepository(User)
      .update({ user_id: id }, { refresh_token: null });
  },
  saveRefreshToken: async (
    t: EntityManager,
    { id, refreshToken }: { id: string; refreshToken: string }
  ) => {


    await t
      .getRepository(User)
      .update({ user_id: id }, { refresh_token: refreshToken });
  },
  wrapTransaction: wrapTransaction,
};
