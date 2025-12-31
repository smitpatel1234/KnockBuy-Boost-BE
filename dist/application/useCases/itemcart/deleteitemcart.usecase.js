"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_itemcart = void 0;
const delete_itemcart = async (entitiesManager, ItemCartRepo, data) => {
    return await ItemCartRepo.deleteItemCartEntry(entitiesManager, data);
};
exports.delete_itemcart = delete_itemcart;
