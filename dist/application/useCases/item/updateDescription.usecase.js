"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemDescription = void 0;
const updateItemDescription = async (em, itemId, data, descRepo) => {
    return await descRepo.upsertDescription(em, itemId, data);
};
exports.updateItemDescription = updateItemDescription;
