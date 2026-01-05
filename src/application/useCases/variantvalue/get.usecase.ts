import { UUID } from "crypto";
import { EntityManager } from "typeorm";

import { VariantValueModel } from "../../../domain/models/Variant.models";
import { VariantRepoPort } from '../../port/variant-repo.port';

export const getall_variant_values = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort
) => {
  return await variantRepo.getall_variant_values(entityManager, {} as VariantValueModel);
}

export const create_variant_value = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, 
  data: VariantValueModel
) => {
    return await variantRepo.createValue(entityManager, data);
}

export const update_variant_value = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, 
  data: VariantValueModel
) => {
    return await variantRepo.updateValue(entityManager, data);
}

export const delete_variant_value = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort, 
  id: UUID
) => {
    return await variantRepo.deleteValue(entityManager, id);
}
