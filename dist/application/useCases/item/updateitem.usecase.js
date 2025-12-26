"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_item = void 0;
const update_item = async (em, item, itemRepo) => {
    return await itemRepo.UpdateItem(em, item);
};
exports.update_item = update_item;
