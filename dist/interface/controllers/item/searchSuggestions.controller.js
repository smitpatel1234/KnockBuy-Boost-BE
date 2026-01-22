"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSuggestionsController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const searchSuggestionsController = (itemRepo, categoryRepo) => async (req, res, next) => {
    try {
        const query = req.query.query;
        if (!query || query.length < 1) {
            (0, displaymessage_1.successmessage)(res, "Success", { items: [], categories: [] });
            return;
        }
        const items = await itemRepo.wrapTransaction((em) => itemRepo.searchItemsByName(em, query));
        const categories = await categoryRepo.wrapTransaction((em) => categoryRepo.searchCategoriesByName(em, query));
        (0, displaymessage_1.successmessage)(res, "Success", { items, categories });
    }
    catch (error) {
        next(error);
    }
};
exports.searchSuggestionsController = searchSuggestionsController;
