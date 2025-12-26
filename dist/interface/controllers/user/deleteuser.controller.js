"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = void 0;
const delete_user_usecase_1 = require("../../../application/useCases/user/delete-user.usecase");
const deleteUserController = (UserAndCredentialsRepo) => {
    return async (req, res) => UserAndCredentialsRepo.wrapTransaction(async (t) => {
        const userId = req.body.user_id;
        await (0, delete_user_usecase_1.delete_User)(t, userId, UserAndCredentialsRepo);
    });
};
exports.deleteUserController = deleteUserController;
