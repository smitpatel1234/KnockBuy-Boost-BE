"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getALLAddressControllerInParams = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const address_1 = require("../../../application/useCases/address");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const getALLAddressControllerInParams = (AddressRepo) => {
    return async (req, res) => AddressRepo.wrapTransaction(async (t) => {
        {
            const user_id = req.params.id;
            if (!user_id)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
            const data = await (0, address_1.get_all_address_by_user_id)(t, AddressRepo, user_id);
            return (0, displaymessage_1.successmessage)(res, "Get all the addess successfully", data);
        }
    });
};
exports.getALLAddressControllerInParams = getALLAddressControllerInParams;
