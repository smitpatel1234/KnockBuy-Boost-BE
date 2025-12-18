"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_User = void 0;
const delete_User = async (t, userId, userRepo) => {
    const user = await userRepo.getUser(t, userId);
    if (!user) {
        throw new Error('User not found');
    }
    await userRepo.deleteUser(t, userId);
};
exports.delete_User = delete_User;
