import { EntityManager } from "typeorm";
import { genrateToken } from "../../../infrastructure/helper/TokenGenerator";
import { AuthRepoPort } from "../../port/auth-repo.port";
import { LoginCredentials } from "../../../domain/models/Auth.models";
import { Envvar } from "../../../infrastructure/orm/config/ormconfig";
import { ApplicationError,  } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import bcrypt from "bcrypt";
export const loginUser = async (
  entitiesmanager: EntityManager,
  credentials: LoginCredentials,
  authRepo: AuthRepoPort
) => {
    const user = await authRepo.FindUser(entitiesmanager, credentials);
    if (user) {
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (isMatch) {
            const token = await genrateToken({ id: user.user_id,role:"ADMIN" });
           const refreshTokenHash = await bcrypt.hash(token.refreshToken,Envvar.PassWordSalt);
            await authRepo.saveRefreshToken(entitiesmanager, { id: user.user_id, refreshToken: refreshTokenHash });
            return token;
        } else {
            throw new Error('Invalid credentials');
        }
    } else {
        throw new Error('User not found');
    }
}
