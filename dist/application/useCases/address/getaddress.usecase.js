"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_address = void 0;
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const get_address = async (entityManager, AddressRepo, user_id) => {
    const address = await AddressRepo.getAddressByID(entityManager, user_id);
    if (!address)
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Address not found");
    return address;
};
exports.get_address = get_address;
