import { EntityManager } from "typeorm";
import { VariantRepoPort } from '../../port/variant-repo.port';
import { UUID } from "crypto";
import { VariantPropertyModel } from "../../../domain/models/Variant.models";

export const create_varient_property = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, data: VariantPropertyModel
) => {
    return await variantRepo.createProperty(entityManager, data);
}
export const getall_variant_properties = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort
) => {
  return await variantRepo.getAllVariantProperties(entityManager);
}
export const update_varient_property = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, data: VariantPropertyModel
) => {
    return await variantRepo.updateProperty(entityManager, data);
}

export const delete_varient_property = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, id: UUID
) => {
    return await variantRepo.deleteProperty(entityManager, id);
}