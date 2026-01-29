"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all_items_page = void 0;
const get_all_items_page = async (em, data, itemRepo) => {
    return await itemRepo.GetAllItemsPage(em, data);
};
exports.get_all_items_page = get_all_items_page;
