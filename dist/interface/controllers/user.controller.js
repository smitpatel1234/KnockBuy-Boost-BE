"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = void 0;
const constants_1 = require("../../infrastructure/config/constants");
const displaymessage_1 = require("../../infrastructure/helper/displaymessage");
const update_user_usecase_1 = require("../../application/useCases/user/update_user.usecase");
const delete_user_usecase_1 = require("../../application/useCases/user/delete-user.usecase");
const updateUserController = (UserAndCredentialsRepo) => {
    return async (req, res) => UserAndCredentialsRepo.wrapTransaction(async (t) => {
        const User = req.body;
        await (0, update_user_usecase_1.update_user)(t, UserAndCredentialsRepo, User).then((obj) => {
            if (!obj) {
                (0, displaymessage_1.displaymessage)(constants_1.constants.Code.NOT_FOUND, res);
                return;
            }
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.OK, res);
        }).catch((err) => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.INTERNAL_SERVER_ERROR, res, [err]);
        });
    });
};
exports.updateUserController = updateUserController;
const deleteUserController = (UserAndCredentialsRepo) => {
    return async (req, res) => UserAndCredentialsRepo.wrapTransaction(async (t) => {
        const userId = req.body.user_id;
        await (0, delete_user_usecase_1.delete_User)(t, userId, UserAndCredentialsRepo).then((bool) => {
            if (!bool) {
                (0, displaymessage_1.displaymessage)(constants_1.constants.Code.NOT_FOUND, res);
                return;
            }
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.CREATED, res);
        }).catch((err) => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.NOT_FOUND, res, [err]);
        });
    });
};
exports.deleteUserController = deleteUserController;
