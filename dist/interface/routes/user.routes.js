"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authvarification_1 = require("../../infrastructure/helper/middleware/authvarification");
const validator_1 = require("../../infrastructure/helper/validator ");
const user_1 = require("../../domain/schemas/user");
const credentials_and_user_manage_repo_1 = require("../../infrastructure/repositories/credentials_and_user_manage.repo");
const user_2 = require("../../domain/schemas/user");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.put('/update-user', (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(user_1.userProfile), (0, user_controller_1.updateUserController)(credentials_and_user_manage_repo_1.UserAndCredentialsRepo));
router.delete('/delete-user', (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(user_2.user_id_schema), (0, user_controller_1.deleteUserController)(credentials_and_user_manage_repo_1.UserAndCredentialsRepo));
exports.default = router;
