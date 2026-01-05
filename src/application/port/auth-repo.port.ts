import { EntityManager } from "typeorm";

import { LoginCredentials } from "../../domain/models/Auth.models";
import { User } from "../../infrastructure/orm/entities/user";

export interface AuthRepoPort {
      findRefreshTokenHash: (t: EntityManager, id: string) => Promise<null | string>;
      FindUser: (t: EntityManager, credentials: LoginCredentials) => Promise<null | undefined | User>;
      removeRefreshToken: (t: EntityManager, id: string) => Promise<void>;
      saveRefreshToken: (t: EntityManager, { id, refreshToken }: { id: string, refreshToken: string }) => Promise<void>;
      wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
} 