import { EntityManager } from "typeorm";

import { Address} from "../../../domain/models/address.models";
import { AddressRepoPort } from "../../port/address-repo.port";

export const update_address  = async (entitiesManager:EntityManager,AddressRepo: AddressRepoPort,address: Address) => {
   return  await AddressRepo.updateAddress(entitiesManager,address);    
};