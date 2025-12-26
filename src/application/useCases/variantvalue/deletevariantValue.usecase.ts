import { EntityManager } from "typeorm";
import { VariantRepoPort } from '../../port/variant-repo.port';
import { UUID } from "crypto";

export const delete_variant_value = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, 
  id: UUID
) => {
    return await variantRepo.deleteValue(entityManager, id);
}
