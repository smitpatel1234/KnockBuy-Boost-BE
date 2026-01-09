"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRepo = void 0;
const transaction_1 = require("../helper/transaction");
const address_1 = require("../orm/entities/address");
exports.AddressRepo = {
    addAddress: async (entityManager, addAddress) => {
        return await entityManager.getRepository(address_1.Address).save(addAddress);
    },
    deleteAddress: async (entityManager, deleteAddress) => {
        const address_id = deleteAddress;
        const res = await entityManager
            .getRepository(address_1.Address)
            .softDelete({ address_id: address_id });
        return (res.affected ?? 0) > 0;
    },
    getAddressByID: async (entityManager, address_id) => {
        return await entityManager
            .getRepository(address_1.Address)
            .findOneOrFail({ where: { address_id: address_id } });
    },
    getAllAddressByUserID: async (entityManager, user_id) => {
        return await entityManager
            .getRepository(address_1.Address)
            .find({ where: { user_id: user_id } });
    },
    updateAddress: async (entityManager, address) => {
        const addAddress = entityManager.create(address_1.Address, address);
        const res = await entityManager
            .getRepository(address_1.Address)
            .save(addAddress);
        return !!res;
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
