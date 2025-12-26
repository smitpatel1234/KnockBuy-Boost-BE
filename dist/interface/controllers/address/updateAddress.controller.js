"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const address_1 = require("../../../application/useCases/address");
const updateAddressController = (AddressRepo) => {
    return async (req, res) => AddressRepo.wrapTransaction(async (t) => {
        {
            const data = req.body;
            const IsUpdated = await (0, address_1.update_address)(t, AddressRepo, data);
            if (!IsUpdated)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "addess Not Found");
            return (0, displaymessage_1.successmessage)(res, "address updated successfully");
        }
    });
};
exports.updateAddressController = updateAddressController;
