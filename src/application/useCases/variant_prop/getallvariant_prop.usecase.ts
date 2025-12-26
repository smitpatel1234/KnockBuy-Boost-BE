import { EntityManager } from "typeorm";
import { VariantRepoPort } from '../../port/variant-repo.port';



export const getall_variant_properties = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort
) => {
  return await variantRepo.getAllVariantProperties(entityManager);
}
