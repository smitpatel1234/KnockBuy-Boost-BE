"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressController = void 0;
const index_1 = require("../../../application/useCases/address/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const createAddressController = (AddressRepo) => {
    return async (req, res) => AddressRepo.wrapTransaction(async (t) => {
        {
            let user_id;
            if (req.params.id) {
                user_id = req.params.id;
            }
            else {
                user_id = req.body.user.id;
            }
            const address = req.body;
            const data = { user_id, ...address };
            await (0, index_1.create_address)(t, AddressRepo, data);
            return (0, displaymessage_1.successmessage)(res, "address created successfully");
        }
    });
};
exports.createAddressController = createAddressController;
