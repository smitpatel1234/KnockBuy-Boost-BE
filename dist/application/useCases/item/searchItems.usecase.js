"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search_items = void 0;
const search_items = async (em, data, itemRepo) => {
    return await itemRepo.searchItems(em, data);
};
exports.search_items = search_items;
