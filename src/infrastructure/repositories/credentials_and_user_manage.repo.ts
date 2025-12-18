import { EntityManager } from "typeorm";
import { UserCredentials, UserProfile } from "../../domain/models/User.models";
import { UserAndCredentialsRepoPort } from "../../application/port/User-repo.port";
import { User } from "../orm/entities/user";
import { wrapTransaction } from "../helper/transaction";
import { UUID } from "crypto";
import { Brackets } from "typeorm";

export const UserAndCredentialsRepo: UserAndCredentialsRepoPort = {

  updateUser : async (entitiesManager: EntityManager, userProfile: UserProfile): Promise<boolean> =>{
    const userToUpdate = await entitiesManager.findOne(User, { where: { user_id: userProfile.user_id } });

    if (userToUpdate) {
      Object.assign(userToUpdate, userProfile);
      await entitiesManager.save(userToUpdate).then((res) => {
        return true;
      }).catch((err) => {
       return false;
      });
    }

    return false;
  },
  deleteUser: async (entitiesmanager: EntityManager, id:UUID): Promise<boolean> => {
    await entitiesmanager.delete(User, { user_id: id }).then((res) => {
      return true;
    }).catch((err) => {
      return false;
    });
    return false;
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
    });

    return await entitiesmanager.save(user);
  },

  getUser: async (entitiesmanager: EntityManager, id:UUID) => {
    return await entitiesmanager
      .getRepository(User)
      .findOne({ where: { user_id: id } });
  },
  checkUserExists: async (
    entitiesmanager: EntityManager,
    criteria: { username: string; email: string; phone_number: number  },
    avoid?: UUID
  ) => {
    const qb = await entitiesmanager
  .getRepository(User)
  .createQueryBuilder("user")
  .where(new Brackets(qb => {
    qb.where("user.username = :username", { username: criteria.username })
  .orWhere("user.email = :email", { email: criteria.email })
  .orWhere("user.phone_number = :phone", { phone: criteria.phone_number })
  }));
  console.log(avoid)
  if(avoid)
     qb.andWhere("user.user_id != :avoid", { avoid: avoid })
      const user = await qb.getOne();

      if(!user){
        return {username: '', email: '', phone_number: 0};
      }
      else{
        return {username: user.username, email: user.email, phone_number: user.phone_number};
      }  
  },

  wrapTransaction: wrapTransaction,
};
