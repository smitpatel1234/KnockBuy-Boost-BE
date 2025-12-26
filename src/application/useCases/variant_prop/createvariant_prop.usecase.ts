import { EntityManager } from "typeorm";
import { VariantRepoPort } from '../../port/variant-repo.port';
import { VariantPropertyModel } from "../../../domain/models/Variant.models";

export const create_varient_property = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, data: VariantPropertyModel
) => {
    return await variantRepo.createProperty(entityManager, data);
}
