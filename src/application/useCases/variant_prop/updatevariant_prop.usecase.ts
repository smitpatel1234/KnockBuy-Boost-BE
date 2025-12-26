import { EntityManager } from "typeorm";
import { VariantRepoPort } from '../../port/variant-repo.port';
import { VariantPropertyModel } from "../../../domain/models/Variant.models";


export const update_varient_property = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, data: VariantPropertyModel
) => {
     return  await variantRepo.updateProperty(entityManager, data);
}

