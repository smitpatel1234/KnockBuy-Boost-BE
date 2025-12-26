"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_address = void 0;
const update_address = async (entitiesManager, AddressRepo, address) => {
    return await AddressRepo.updateAddress(entitiesManager, address);
};
exports.update_address = update_address;
