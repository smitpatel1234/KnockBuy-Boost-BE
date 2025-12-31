"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_itemcart = void 0;
const create_itemcart = async (entitiesManager, ItemCartRepo, data) => {
    return await ItemCartRepo.crateItemCartEntry(entitiesManager, data);
};
exports.create_itemcart = create_itemcart;
