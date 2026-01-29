"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddressController = void 0;
const getaddress_usecase_1 = require("../../../application/useCases/address/getaddress.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getAddressController = (AddressRepo) => {
    return async (req, res) => {
        return AddressRepo.wrapTransaction(async (t) => {
            const address_id = req.body.address_id;
            const address = await (0, getaddress_usecase_1.get_address)(t, AddressRepo, address_id);
            (0, displaymessage_1.successmessage)(res, "address is sucessfully fetched", address);
        });
    };
};
exports.getAddressController = getAddressController;
