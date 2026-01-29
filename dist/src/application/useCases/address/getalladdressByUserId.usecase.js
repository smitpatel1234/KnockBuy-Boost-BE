"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all_address_by_user_id = void 0;
const get_all_address_by_user_id = async (entityManager, AddressRepo, user_id) => {
    return await AddressRepo.getAllAddressByUserID(entityManager, user_id);
};
exports.get_all_address_by_user_id = get_all_address_by_user_id;
