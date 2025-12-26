import { EntityManager } from "typeorm";
import { AddressRepoPort } from "../../port/address-repo.port";
import { Address , AddAddress    } from "../../../domain/models/address.models";
export const create_address = async (entitiesManager:EntityManager,AddressRepo: AddressRepoPort, data: AddAddress) => {
    
    return await AddressRepo.addAddress(entitiesManager,data);
};