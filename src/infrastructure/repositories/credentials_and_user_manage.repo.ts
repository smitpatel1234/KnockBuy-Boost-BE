import { EntityManager } from "typeorm";
import { UserCredentials, UserProfile } from "../../domain/models/User.models";
import { UserAndCredentialsRepoPort } from "../../application/port/User-repo.port";
import { User } from "../orm/entities/user";
import { wrapTransaction } from "../helper/transaction";
import { Brackets } from "typeorm";
import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import { applyPaginationAndFilters } from "../helper/pagination.helper";
export const UserAndCredentialsRepo: UserAndCredentialsRepoPort = {
  getallUser: async (
    entitiesManager: EntityManager
  ): Promise<UserProfile[]> => {
    return await entitiesManager
      .getRepository(User)
      .find({
        select: ["user_id", "username", "email", "phone_number", "addresses"],
        relations: ["addresses"],
      });
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
  deleteUser: async (
    entitiesmanager: EntityManager,
    id: string
  ): Promise<boolean> => {
    const res = await entitiesmanager.softDelete(User, { user_id: id });
    return (res.affected ?? 0) > 0;
  },
  saveUser: async (
    entitiesmanager: EntityManager,
    UserserCredentials: UserCredentials
  ) => {
    const user = entitiesmanager.create(User, {
      username: UserserCredentials.username,
      password: UserserCredentials.password,
      email: UserserCredentials.email,
      phone_number: UserserCredentials.phone_number,
      role: "USER",
    });

    return await entitiesmanager.save(user);
  },

  getUser: async (entitiesmanager: EntityManager, id: string) => {
    return await entitiesmanager
      .getRepository(User)
      .findOne({
        where: { user_id: id },
        select: ["user_id", "username", "email", "phone_number", "addresses", "wishlist_name", "profile_image"],
        relations: ["addresses"],
      });
  },
  checkUserExists: async (
    entitiesmanager: EntityManager,
    criteria: { username: string; email: string; phone_number: number },
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
      return { username: "", email: "", phone_number: 0 };
    } else {
      return {
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
      };
    }
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

  wrapTransaction: wrapTransaction,
};
