"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemController = void 0;
const item_1 = require("../../../application/useCases/item");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const getItemController = (itemRepo, variantRepo, reviewRepo, descRepo) => {
    return async (req, res) => itemRepo.wrapTransaction(async (t) => {
        const { id, slug } = req.params;
        if (slug) {
            const data = await (0, item_1.get_item_by_slug)(t, slug, itemRepo, variantRepo, descRepo, reviewRepo);
            if (!data)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Item Not Found");
            (0, displaymessage_1.successmessage)(res, "Get item successfully", data);
            return;
        }
        else if (id) {
            const data = await (0, item_1.get_item_by_id)(t, id, itemRepo, variantRepo, descRepo, reviewRepo);
            if (!data)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Item Not Found");
            (0, displaymessage_1.successmessage)(res, "Get item successfully", data);
            return;
        }
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Item Not Found");
    });
};
exports.getItemController = getItemController;
