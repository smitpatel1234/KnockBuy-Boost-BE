"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_itemcart = void 0;
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const item_repo_1 = require("../../../infrastructure/repositories/item.repo");
const update_itemcart = async (entitiesManager, ItemCartRepo, data) => {
    const ISItemInStock = await item_repo_1.ItemRepo.ISItemInStock(entitiesManager, data.item, data.quantity);
    if (!ISItemInStock) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "stock is not availabel");
    }
    return await ItemCartRepo.updateItemCartEntry(entitiesManager, data);
};
exports.update_itemcart = update_itemcart;
