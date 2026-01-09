import { EntityManager } from "typeorm";

import { VariantRepoPort } from '../../port/variant-repo.port';
export const delete_varient_property = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort,id : string
) => {
    return await variantRepo.deleteProperty(entityManager, id);
}