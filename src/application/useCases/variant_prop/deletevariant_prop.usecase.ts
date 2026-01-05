import { UUID } from "crypto";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from '../../port/variant-repo.port';


export const delete_varient_property = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort,{ variantProperty_id: id }: {variantProperty_id: UUID}
) => {
    return await variantRepo.deleteProperty(entityManager, id);
}