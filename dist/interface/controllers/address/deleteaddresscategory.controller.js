"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const deleteAddressController = (AddressRepo) => {
    return async (req, res) => CategoryRepo.wrapTransaction(async (t) => {
        {
            const category_id = req.body.category_id;
            const IsDeleted = await delete_category(t, CategoryRepo, category_id);
            if (!IsDeleted)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Category Not Found");
            ``;
            return (0, displaymessage_1.successmessage)(res, "Category deleted successfully");
        }
    });
};
exports.deleteAddressController = deleteAddressController;
