import { EntityManager } from "typeorm";
import { AddressRepoPort } from "../../port/address-repo.port";
import { Address} from "../../../domain/models/address.models";

export const update_address  = async (entitiesManager:EntityManager,AddressRepo: AddressRepoPort,address: Address) => {
   return  await AddressRepo.updateAddress(entitiesManager,address);    
};