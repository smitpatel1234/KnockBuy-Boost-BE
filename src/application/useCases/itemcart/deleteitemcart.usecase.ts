import { EntityManager } from "typeorm";

import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { ItemCartDeleteType } from "../../../domain/models/itemcart.models";
export const delete_itemcart = async (
  entitiesManager: EntityManager,
  ItemCartRepo: ItemCartRepoPort,
  data: ItemCartDeleteType
) => {
  return await ItemCartRepo.deleteItemCartEntry(entitiesManager, data);
};
