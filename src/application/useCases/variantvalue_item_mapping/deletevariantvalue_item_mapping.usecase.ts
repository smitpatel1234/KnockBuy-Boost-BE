import { EntityManager } from "typeorm";
import { VariantRepoPort } from '../../port/variant-repo.port';
import { ItemVariantValueMappingModel } from "../../../domain/models/Variant.models";
import { UUID } from "crypto";

export const deletevariantvalue_item_mapping = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, 
  id: UUID
) => {
    return await variantRepo.deleteItemVariantMapping(entityManager, id);
}

