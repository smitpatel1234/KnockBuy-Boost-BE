"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const item_1 = require("../../../application/useCases/item");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const getItemController = (itemRepo, variantRepo) => {
    return async (req, res) => itemRepo.wrapTransaction(async (t) => {
        const { slug, id } = req.query;
        if (slug) {
            const data = await (0, item_1.get_item_by_slug)(t, String(slug), itemRepo, variantRepo);
            if (!data)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Item Not Found");
            return (0, displaymessage_1.successmessage)(res, "Get item successfully", data);
        }
        else if (id) {
            const data = await (0, item_1.get_item_by_id)(t, String(id), itemRepo, variantRepo);
            if (!data)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Item Not Found");
            return (0, displaymessage_1.successmessage)(res, "Get item successfully", data);
        }
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Item Not Found");
    });
};
exports.getItemController = getItemController;
