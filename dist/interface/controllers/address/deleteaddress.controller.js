"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressController = void 0;
const address_1 = require("../../../application/useCases/address");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const deleteAddressController = (AddressRepo) => {
    return async (req, res) => AddressRepo.wrapTransaction(async (t) => {
        {
            const address_id = req.body.address_id;
            const IsDeleted = await (0, address_1.delete_address)(t, AddressRepo, address_id);
            if (!IsDeleted)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "addess Not Found");
            (0, displaymessage_1.successmessage)(res, "addess deleted successfully");
            return;
        }
    });
};
exports.deleteAddressController = deleteAddressController;
