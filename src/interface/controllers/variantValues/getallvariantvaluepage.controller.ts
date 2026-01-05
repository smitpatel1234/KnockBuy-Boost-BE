import { Request, Response } from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { getallvariantValuePage } from "../../../application/useCases/variantvalue/getallvariantValuePage.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { parsePaginationParams } from "../../../infrastructure/helper/request.helper";

export const getAllVariantValuePageController = (variantRepo: VariantRepoPort) => {
    return async (req: Request, res: Response) =>
        variantRepo.wrapTransaction(async (t: EntityManager) => {
            const params = parsePaginationParams(req);
            const data = await getallvariantValuePage(t, variantRepo, params);
            successmessage(res, "Variant values fetched successfully", data);
        });
};
