import { EntityManager } from "typeorm";
import { Brackets } from "typeorm";

import { UserAndCredentialsRepoPort } from "../../application/port/User-repo.port";
import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import { UserCredentials, UserProfile } from "../../domain/models/User.models";
import { applyPaginationAndFilters } from "../helper/pagination.helper";
import { wrapTransaction } from "../helper/transaction";
import { User } from "../orm/entities/user";
export const UserAndCredentialsRepo: UserAndCredentialsRepoPort = {
  checkUserExists: async (
    entitiesmanager: EntityManager,
    criteria: { email: string; phone_number: string; username: string; },
    avoid?: string
  ) => {
    const qb = await entitiesmanager
      .getRepository(User)
      .createQueryBuilder("user")
      .where(
        new Brackets((qb) => {
          qb.where("user.username = :username", { username: criteria.username })
            .orWhere("user.email = :email", { email: criteria.email })
            .orWhere("user.phone_number = :phone", {
              phone: criteria.phone_number,
            });
        })
      );
    if (avoid) qb.andWhere("user.user_id != :avoid", { avoid: avoid });
    const user = await qb.getOne();

    if (!user) {
      return { email: "", phone_number: '', username: "" };
    } else {
      return {
        email: user.email,
        phone_number: user.phone_number,
        username: user.username,
      };
    }
  },
  deleteUser: async (
    entitiesmanager: EntityManager,
    id: string
  ): Promise<boolean> => {
    const res = await entitiesmanager.softDelete(User, { user_id: id });
    return (res.affected ?? 0) > 0;
  },
  getallUser: async (
    entitiesManager: EntityManager
  ): Promise<UserProfile[]> => {
    return await entitiesManager
      .getRepository(User)
      .find({
        relations: ["addresses"],
        select: ["user_id", "username", "email", "phone_number", "addresses"],
      });
  },
  getallUserPage: async (
    entityManager: EntityManager,
    data: pageParams
  ): Promise<PaginationResponse<UserProfile>> => {
    const userQB = entityManager.getRepository(User).createQueryBuilder("user");

    userQB.select(["user.user_id", "user.username", "user.email", "user.phone_number"]);

    return applyPaginationAndFilters<UserProfile>(
      userQB,
      data,
      false
    );
  },

  getUser: async (entitiesmanager: EntityManager, id: string) => {
    return await entitiesmanager
      .getRepository(User)
      .findOne({
        relations: ["addresses"],
        select: ["user_id", "username", "email", "phone_number", "addresses", "wishlist_name", "profile_image"],
        where: { user_id: id },
      });
  },
  saveUser: async (
    entitiesmanager: EntityManager,
    UserserCredentials: UserCredentials
  ) => {
    const user = entitiesmanager.create(User, {
      email: UserserCredentials.email,
      password: UserserCredentials.password,
      phone_number: UserserCredentials.phone_number,
      role: "USER",
      username: UserserCredentials.username,
    });

    return await entitiesmanager.save(user);
  },

  updateUser: async (
    entitiesManager: EntityManager,
    userProfile: UserProfile
  ): Promise<boolean> => {
    const userToUpdate = await entitiesManager.findOne(User, {
      where: { user_id: userProfile.user_id },
    });
    if (userToUpdate) {
      Object.assign(userToUpdate, userProfile);
      await entitiesManager.save(userToUpdate);
      return true;
    }

    return false;
  },

  wrapTransaction: wrapTransaction,
};
