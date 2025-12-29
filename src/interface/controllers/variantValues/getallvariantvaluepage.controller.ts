import { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { parsePaginationParams } from "../../../infrastructure/helper/request.helper";
import { getallvariantValuePage } from "../../../application/useCases/variantvalue/getallvariantValuePage.usecase";

export const getAllVariantValuePageController = (variantRepo: VariantRepoPort) => {
    return async (req: Request, res: Response) =>
        variantRepo.wrapTransaction(async (em: EntityManager) => {
            const params = parsePaginationParams(req);
            const data = await getallvariantValuePage(variantRepo)(em, params);
            return successmessage(res, "Variant values fetched successfully", data);
        });
};
