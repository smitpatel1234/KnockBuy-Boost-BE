"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_item = void 0;
const create_item = async (em, item, itemRepo) => {
    return await itemRepo.CreateItem(em, item);
};
exports.create_item = create_item;
