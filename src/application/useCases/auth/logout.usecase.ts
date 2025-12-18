import { EntityManager } from "typeorm";
import { verifyToken } from "../../../infrastructure/helper/TokenGenerator";
import { AuthRepoPort } from "../../port/auth-repo.port";
import { LoginCredentials } from "../../../domain/models/Auth.models";
import bcrypt from "bcrypt";
import { UUID } from "crypto";
export const logoutUser = async (
  entitiesmanager: EntityManager,
  token: string,
  authRepo: AuthRepoPort
) => {
     const payload = await verifyToken(token) as { id: UUID; role: string };
        if (payload) {
            await authRepo.removeRefreshToken(entitiesmanager, payload.id);
        } else {
            throw new Error('Invalid token');
        }
}
