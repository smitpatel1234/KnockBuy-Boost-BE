import { EntityManager } from "typeorm";

import { AddressRepoPort } from "../../port/address-repo.port";

export const get_all_address_by_user_id = async (
  entityManager: EntityManager,
  AddressRepo: AddressRepoPort,
  user_id: string,
) => {
  return await AddressRepo.getAllAddressByUserID(entityManager, user_id);
};
