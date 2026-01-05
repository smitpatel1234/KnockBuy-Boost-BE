import { EntityManager } from "typeorm";

import { VariantValueModel } from "../../../domain/models/Variant.models";
import { VariantRepoPort } from '../../port/variant-repo.port';

export const create_variant_value = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, 
  data: VariantValueModel
) => {
    return await variantRepo.createValue(entityManager, data);
}


