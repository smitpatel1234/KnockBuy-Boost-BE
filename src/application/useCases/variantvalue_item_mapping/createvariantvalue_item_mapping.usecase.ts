import { EntityManager } from "typeorm";
import { VariantRepoPort } from '../../port/variant-repo.port';
import { ItemVariantValueMappingModel } from "../../../domain/models/Variant.models";

export const createvariantvalue_item_mapping = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, 
  data: ItemVariantValueMappingModel
) => {
    return await variantRepo.mapItemToVariantValue(entityManager, data);
}

