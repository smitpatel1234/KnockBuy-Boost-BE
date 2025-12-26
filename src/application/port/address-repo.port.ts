import { Address, AddAddress, DeleteAddress } from "../../domain/models/address.models";
import { EntityManager } from "typeorm";

export interface AddressRepoPort {
    addAddress(entityManager: EntityManager , addAddress: AddAddress): Promise<Address>;
    deleteAddress(entityManager: EntityManager,deleteAddress: string): Promise<boolean>;
    getAllAddressByUserID(entityManager: EntityManager,user_id: string): Promise<Address[]>;
    updateAddress(entityManager: EntityManager,address: Address): Promise<boolean>;
    getAddressByID(entityManager: EntityManager,address_id: string): Promise<Address | null>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T> ;
}  