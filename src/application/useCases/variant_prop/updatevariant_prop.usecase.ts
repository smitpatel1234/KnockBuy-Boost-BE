import { EntityManager } from "typeorm";

import { VariantPropertyModel } from "../../../domain/models/Variant.models";
import { VariantRepoPort } from '../../port/variant-repo.port';


export const update_varient_property = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, data: VariantPropertyModel
) => {
     return  await variantRepo.updateProperty(entityManager, data);
}

