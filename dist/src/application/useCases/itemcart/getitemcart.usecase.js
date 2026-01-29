"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_itemcart = void 0;
const get_itemcart = async (entitiesManager, ItemCartRepo, user_id) => {
    return await ItemCartRepo.getAllItemCartEntry(entitiesManager, user_id);
};
exports.get_itemcart = get_itemcart;
