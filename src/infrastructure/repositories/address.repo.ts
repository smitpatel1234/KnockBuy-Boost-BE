import { EntityManager } from "typeorm";

import { AddressRepoPort } from "../../application/port/address-repo.port";
import { AddAddress, Address as AddressType,DeleteAddress } from "../../domain/models/address.models";
import { wrapTransaction } from "../helper/transaction";
import { Address } from "../orm/entities/address";
export const AddressRepo: AddressRepoPort = {
  addAddress: async (entityManager: EntityManager, addAddress: AddAddress) => {
    return await entityManager.getRepository(Address).save(addAddress);
  },
  deleteAddress: async (
    entityManager: EntityManager,
    deleteAddress: string
  ) => {
    const address_id = deleteAddress;
    const res = await entityManager
      .getRepository(Address)
      .softDelete({address_id: address_id});
    return (res.affected ?? 0) > 0 ? true : false;
  },
  getAddressByID: async (entityManager: EntityManager, address_id: string) => {
    return await entityManager
      .getRepository(Address)
      .findOneOrFail({ where: { address_id: address_id } });
  },
  getAllAddressByUserID: async (
    entityManager: EntityManager,
    user_id: string
  ) => {
    return await entityManager
      .getRepository(Address)
      .find({ where: { user_id: user_id } });
  },
  updateAddress: async (entityManager: EntityManager, address: AddressType) => {
    const addAddress = entityManager.create(Address, address);
    const res = await entityManager
      .getRepository(Address)
      .save(addAddress)
      
    return res  ? true : false;
  },
  wrapTransaction: wrapTransaction,
};
