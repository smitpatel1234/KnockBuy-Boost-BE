import { EntityManager } from "typeorm";
import { UserCredentials, UserProfile } from "../../domain/models/User.models";
import { UUID } from "crypto";
import { User } from "../../infrastructure/orm/entities/user";

export interface UserAndCredentialsRepoPort {
  getUser: (
    t: EntityManager,
      id: UUID

  ) => Promise<User | null>;
  updateUser: (t: EntityManager, user: UserProfile) => Promise<boolean>;
  deleteUser: (t: EntityManager, id: UUID) => Promise<boolean>,
  checkUserExists: (
    t: EntityManager,
    criteria: { username: string; email: string; phone_number: number },
    avoid?: UUID 
  ) => Promise<{ username: string; email: string; phone_number: number }>;
  saveUser: (
    t: EntityManager,
    UserCredentials: UserCredentials
  ) => Promise<UserCredentials>;

  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
