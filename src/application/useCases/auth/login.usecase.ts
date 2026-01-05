import bcrypt from "bcrypt";
import { EntityManager } from "typeorm";

import { LoginCredentials } from "../../../domain/models/Auth.models";
import { ApplicationError,ApplicationErrorType} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { genrateToken } from "../../../infrastructure/helper/TokenGenerator";
import { Envvar } from "../../../infrastructure/orm/config/ormconfig";
import { AuthRepoPort } from "../../port/auth-repo.port";
export const loginUser = async (
    entitiesmanager: EntityManager,
    credentials: LoginCredentials,
    authRepo: AuthRepoPort
) => {
    const user = await authRepo.FindUser(entitiesmanager, credentials);
    console.log(user);
    if (user) {
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (isMatch) {
            const token = await genrateToken({ id: user.user_id, role: credentials.role });
            const refreshTokenHash = await bcrypt.hash(token.refreshToken, Envvar.PassWordSalt);
            await authRepo.saveRefreshToken(entitiesmanager, { id: user.user_id, refreshToken: refreshTokenHash });
            return { token, user };
        } else {
            throw new ApplicationError(ApplicationErrorType.BAD_REQUEST , 'Invalid credentials');
        }
    } else {
        throw new ApplicationError(ApplicationErrorType.NOT_FOUND,'User not found');
    }
}
