import { EntityManager } from "typeorm";

import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AddressRepoPort } from "../../port/address-repo.port";
export const get_address = async (entityManager:EntityManager ,AddressRepo: AddressRepoPort ,user_id: string) => {
    const address = await AddressRepo.getAddressByID(entityManager,user_id);
    if(!address) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,"Address not found");
    return address;
};