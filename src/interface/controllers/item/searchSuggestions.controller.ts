import { NextFunction, Request, Response } from "express";

import { CategoryRepoPort } from "../../../application/port/category-repo.port";
import { ItemRepoPort } from "../../../application/port/item-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const searchSuggestionsController =
    (itemRepo: ItemRepoPort, categoryRepo: CategoryRepoPort) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const query = req.query.query as string;

                if (!query || query.length < 1) {
                    successmessage(res, "Success", { categories: [], items: [] });
                    return;
                }

                const items = await itemRepo.wrapTransaction((em) =>
                    itemRepo.searchItemsByName(em, query)
                );

                const categories = await categoryRepo.wrapTransaction((em) =>
                    categoryRepo.searchCategoriesByName(em, query)
                );

                successmessage(res, "Success", { categories, items });
            } catch (error) {
                next(error);
            }
        };
