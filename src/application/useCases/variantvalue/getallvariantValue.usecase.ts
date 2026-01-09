import { EntityManager } from "typeorm";

import { VariantRepoPort } from '../../port/variant-repo.port';

export const getall_variant_values = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort
) => {
  return await variantRepo.getall_variant_values(entityManager);
}
