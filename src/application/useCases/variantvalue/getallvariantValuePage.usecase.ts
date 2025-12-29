import { EntityManager } from "typeorm";
import { VariantRepoPort } from "../../port/variant-repo.port";
import { pageParams } from "../../../domain/globalTypes/commonFields";

export const getallvariantValuePage = (variantRepo: VariantRepoPort) => {
    return async (em: EntityManager, data: pageParams) => {
        return await variantRepo.getall_variant_values_page(em, data);
    };
};
