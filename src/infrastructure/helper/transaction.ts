import { EntityManager } from "typeorm";

import { AppDataSource } from "../orm/config/ormconfig";

export const wrapTransaction = async <T>(
    fun:(t:EntityManager) => Promise<T>,
): Promise<T> =>{
    return await AppDataSource.transaction(async (transactionalEntityManager) =>{
        return await fun(transactionalEntityManager);
    })
}
