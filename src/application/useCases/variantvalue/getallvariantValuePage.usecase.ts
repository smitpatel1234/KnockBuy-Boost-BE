import { EntityManager } from "typeorm";

import { pageParams } from "../../../domain/globalTypes/commonFields";
import { VariantRepoPort } from "../../port/variant-repo.port";

export const getallvariantValuePage = async (em: EntityManager, variantRepo: VariantRepoPort, data: pageParams) => {
    return await variantRepo.getall_variant_values_page(em, data);
};
