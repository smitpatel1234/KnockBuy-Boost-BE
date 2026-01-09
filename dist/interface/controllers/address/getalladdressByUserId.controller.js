"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getALLAddressController = void 0;
const address_1 = require("../../../application/useCases/address");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getALLAddressController = (AddressRepo) => {
    return async (req, res) => AddressRepo.wrapTransaction(async (t) => {
        {
            const user_id = req.body.user.id;
            const data = await (0, address_1.get_all_address_by_user_id)(t, AddressRepo, user_id);
            (0, displaymessage_1.successmessage)(res, "Get all the addess successfully", data);
            return;
        }
    });
};
exports.getALLAddressController = getALLAddressController;
