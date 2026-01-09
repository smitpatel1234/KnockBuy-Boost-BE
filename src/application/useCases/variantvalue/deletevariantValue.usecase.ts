import { EntityManager } from "typeorm";

import { VariantRepoPort } from '../../port/variant-repo.port';

export const delete_variant_value = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, 
  id: string
) => {
    return await variantRepo.deleteValue(entityManager, id);
}
