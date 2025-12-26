import { EntityManager } from "typeorm";
import { VariantRepoPort } from '../../port/variant-repo.port';
import { UUID } from "crypto";


export const delete_varient_property = async (
  entityManager: EntityManager,
  variantRepo: VariantRepoPort,{ variantProperty_id: id }: {variantProperty_id: UUID}
) => {
    return await variantRepo.deleteProperty(entityManager, id);
}