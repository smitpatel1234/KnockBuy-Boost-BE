import { EntityManager } from "typeorm";

import { ItemVariantValueMappingModel } from "../../../domain/models/Variant.models";
import { VariantRepoPort } from '../../port/variant-repo.port';

export const createvariantvalue_item_mapping = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, 
  data: ItemVariantValueMappingModel
) => {
    return await variantRepo.mapItemToVariantValue(entityManager, data);
}

