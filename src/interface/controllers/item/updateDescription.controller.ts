import Express from "express";
import { EntityManager } from "typeorm";

import { ItemDescriptionRepoPort } from "../../../application/port/item-description-repo.port";
import { updateItemDescription } from "../../../application/useCases/item/updateDescription.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { UpdateItemDescriptionRequestBody } from "../../types/item_description.types";

export const updateDescriptionController = (descRepo: ItemDescriptionRepoPort) => {
    return async (req: Express.Request, res: Express.Response) => {
        const { itemId } = req.params;
        const descriptionData = req.body as UpdateItemDescriptionRequestBody;

        await descRepo.wrapTransaction(async (t: EntityManager) => {
            const data = await updateItemDescription(
                t,
                itemId,
                descriptionData,
                descRepo
            );

            successmessage(res, "Item description updated successfully", data);
        });
    };
};
