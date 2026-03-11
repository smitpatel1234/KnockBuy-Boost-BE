"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDescriptionController = void 0;
const updateDescription_usecase_1 = require("../../../application/useCases/item/updateDescription.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const updateDescriptionController = (descRepo) => {
    return async (req, res) => {
        const { itemId } = req.params;
        const descriptionData = req.body;
        await descRepo.wrapTransaction(async (t) => {
            const data = await (0, updateDescription_usecase_1.updateItemDescription)(t, itemId, descriptionData, descRepo);
            (0, displaymessage_1.successmessage)(res, "Item description updated successfully", data);
        });
    };
};
exports.updateDescriptionController = updateDescriptionController;
