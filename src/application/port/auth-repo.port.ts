import { EntityManager } from "typeorm";
import { LoginCredentials } from "../../domain/models/Auth.models";
import { User } from "../../infrastructure/orm/entities/user";

export interface AuthRepoPort {
      FindUser: (t: EntityManager, credentials: LoginCredentials) => Promise<User | null | undefined>;
      saveRefreshToken: (t: EntityManager, { id, refreshToken }: { id: string, refreshToken: string }) => Promise<void>;
      findRefreshTokenHash: (t: EntityManager, id: string) => Promise<string | null>;
      removeRefreshToken: (t: EntityManager, id: string) => Promise<void>;
      wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
} 