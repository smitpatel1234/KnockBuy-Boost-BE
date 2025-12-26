import { EntityManager } from "typeorm";
import { VariantRepoPort } from '../../port/variant-repo.port';
import { VariantValueModel } from "../../../domain/models/Variant.models";

export const update_variant_value = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, 
  data: VariantValueModel
) => {
    return await variantRepo.updateValue(entityManager, data);
}