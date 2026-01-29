"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all_items = void 0;
const get_all_items = async (em, itemRepo) => {
    return await itemRepo.GetAllItems(em);
};
exports.get_all_items = get_all_items;
