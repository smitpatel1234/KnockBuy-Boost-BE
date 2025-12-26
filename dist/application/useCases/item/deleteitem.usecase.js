"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_item = void 0;
const delete_item = async (em, id, itemRepo) => {
    return await itemRepo.DeleteItem(em, id);
};
exports.delete_item = delete_item;
