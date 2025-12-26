"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_address = void 0;
const create_address = async (entitiesManager, AddressRepo, data) => {
    return await AddressRepo.addAddress(entitiesManager, data);
};
exports.create_address = create_address;
