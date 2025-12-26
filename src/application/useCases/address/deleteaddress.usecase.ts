import { EntityManager } from "typeorm";
import { AddressRepoPort } from "../../port/address-repo.port";
export const delete_address  = async (entitiesManager:EntityManager,AddressRepo: AddressRepoPort , id:string ) => {
     return await AddressRepo.deleteAddress(entitiesManager, id);
};