"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_itemcart = void 0;
const update_itemcart = async (entitiesManager, ItemCartRepo, data) => {
    return await ItemCartRepo.updateItemCartEntry(entitiesManager, data);
};
exports.update_itemcart = update_itemcart;
