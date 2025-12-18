import { EntityManager } from "typeorm";
import { LoginCredentials } from "../../domain/models/Auth.models";
import { User } from "../../infrastructure/orm/entities/user";
import { UUID } from "crypto";

export interface AuthRepoPort {
      FindUser:  (t: EntityManager, credentials: LoginCredentials) => Promise<User | null | undefined>;
      saveRefreshToken:  (t:EntityManager, {id,refreshToken}:{ id: UUID, refreshToken: string }) => Promise<void>;
      removeRefreshToken: (t:EntityManager, id: UUID) => Promise<void>;
      wrapTransaction:  <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
} 