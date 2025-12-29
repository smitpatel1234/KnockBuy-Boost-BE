import { EntityManager } from "typeorm";
import { UserCredentials, UserProfile } from "../../domain/models/User.models";
import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";

export interface UserAndCredentialsRepoPort {
  getallUser: (t: EntityManager) => Promise<UserProfile[]>;

  getUser: (
    t: EntityManager,
    id: string

  ) => Promise<UserProfile | null>;
  updateUser: (t: EntityManager, user: UserProfile) => Promise<boolean>;
  deleteUser: (t: EntityManager, id: string) => Promise<boolean>,
  checkUserExists: (
    t: EntityManager,
    criteria: { username: string; email: string; phone_number: number },
    avoid?: string
  ) => Promise<{ username: string; email: string; phone_number: number }>;
  saveUser: (
    t: EntityManager,
    UserCredentials: UserCredentials
  ) => Promise<UserCredentials>;

  getallUserPage: (
    t: EntityManager,
    data: pageParams
  ) => Promise<PaginationResponse<UserProfile>>;

  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
