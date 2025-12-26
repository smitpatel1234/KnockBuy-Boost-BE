"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_address = void 0;
const delete_address = async (entitiesManager, AddressRepo, id) => {
    return await AddressRepo.deleteAddress(entitiesManager, id);
};
exports.delete_address = delete_address;
