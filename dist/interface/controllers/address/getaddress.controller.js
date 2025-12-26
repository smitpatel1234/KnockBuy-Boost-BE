"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddressController = void 0;
const getaddress_usecase_1 = require("../../../application/useCases/address/getaddress.usecase");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const getAddressController = (AddressRepo) => {
    return async (req, res) => {
        return AddressRepo.wrapTransaction(async (t) => {
            const address_id = req.body.address_id;
            const address = await (0, getaddress_usecase_1.get_address)(t, AddressRepo, address_id);
            if (!address) {
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "address not found");
            }
        });
    };
};
exports.getAddressController = getAddressController;
