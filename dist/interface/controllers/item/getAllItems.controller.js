"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItemsController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const item_1 = require("../../../application/useCases/item");
const getAllItemsController = (itemRepo) => {
    return async (req, res) => itemRepo.wrapTransaction(async (t) => {
        const data = await (0, item_1.get_all_items)(t, itemRepo);
        return (0, displaymessage_1.successmessage)(res, "Get all the items successfully", data);
    });
};
exports.getAllItemsController = getAllItemsController;
