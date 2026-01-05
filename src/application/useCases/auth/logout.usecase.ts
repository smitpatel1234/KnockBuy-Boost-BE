import { EntityManager } from "typeorm";

import { verifyToken } from "../../../infrastructure/helper/TokenGenerator";
import { AuthRepoPort } from "../../port/auth-repo.port";

export const logoutUser = async (
  entitiesmanager: EntityManager,
  token: string,
  authRepo: AuthRepoPort
) => {
     const payload = await verifyToken(token) as { id: string; role: string };
     await authRepo.removeRefreshToken(entitiesmanager, payload.id);
}
