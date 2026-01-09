import { EntityManager } from "typeorm";

import { AddAddress, Address } from "../../domain/models/address.models";

export interface AddressRepoPort {
    addAddress(entityManager: EntityManager , addAddress: AddAddress): Promise<Address>;
    deleteAddress(entityManager: EntityManager,deleteAddress: string): Promise<boolean>;
    getAddressByID(entityManager: EntityManager,address_id: string): Promise<Address | null>;
    getAllAddressByUserID(entityManager: EntityManager,user_id: string): Promise<Address[]>;
    updateAddress(entityManager: EntityManager,address: Address): Promise<boolean>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T> ;
}  