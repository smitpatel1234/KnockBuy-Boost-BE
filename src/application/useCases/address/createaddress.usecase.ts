import { EntityManager } from "typeorm";

import { AddAddress } from "../../../domain/models/address.models";
import { AddressRepoPort } from "../../port/address-repo.port";
export const create_address = async (entitiesManager:EntityManager,AddressRepo: AddressRepoPort, data: AddAddress) => {
    return await AddressRepo.addAddress(entitiesManager,data);
};