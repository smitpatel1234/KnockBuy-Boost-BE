"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItemsController = void 0;
const item_1 = require("../../../application/useCases/item");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const request_helper_1 = require("../../../infrastructure/helper/request.helper");
const searchItemsController = (itemRepo) => {
    return async (req, res) => itemRepo.wrapTransaction(async (t) => {
        const params = (0, request_helper_1.parseSearchPaginationParams)(req);
        const itemsdata = await (0, item_1.search_items)(t, params, itemRepo);
        (0, displaymessage_1.successmessage)(res, "Search items successfully", itemsdata);
    });
};
exports.searchItemsController = searchItemsController;
