import { EntityManager } from "typeorm";

import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import { UserCredentials, UserProfile } from "../../domain/models/User.models";

export interface UserAndCredentialsRepoPort {
  checkUserExists: (
    t: EntityManager,
    criteria: { email: string; phone_number: string; username: string; },
    avoid?: string
  ) => Promise<{ email: string; phone_number: string; username: string; }>;

  deleteUser: (t: EntityManager, id: string) => Promise<void>,
  getallUser: (t: EntityManager) => Promise<UserProfile[]>;
  getallUserPage: (
    t: EntityManager,
    data: pageParams
  ) => Promise<PaginationResponse<UserProfile>>;
  getUser: (
    t: EntityManager,
    id: string

  ) => Promise<null | UserProfile>;
  saveUser: (
    t: EntityManager,
    UserCredentials: UserCredentials
  ) => Promise<UserCredentials>;

  updateUser: (t: EntityManager, user: UserProfile) => Promise<boolean>;

  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
