import { EntityManager } from "typeorm";
import { VariantRepoPort } from '../../port/variant-repo.port';

export const deletevariantvalue_item_mapping = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, 
  id: string
) => {
    return await variantRepo.deleteItemVariantMapping(entityManager, id);
}

