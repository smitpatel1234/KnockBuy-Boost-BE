"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItemsPageController = void 0;
const item_1 = require("../../../application/useCases/item");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const request_helper_1 = require("../../../infrastructure/helper/request.helper");
const getAllItemsPageController = (itemRepo) => {
    return async (req, res) => itemRepo.wrapTransaction(async (t) => {
        const params = (0, request_helper_1.parsePaginationParams)(req);
        const itemsdata = await (0, item_1.get_all_items_page)(t, params, itemRepo);
        (0, displaymessage_1.successmessage)(res, "Get all the items successfully", itemsdata);
    });
};
exports.getAllItemsPageController = getAllItemsPageController;
