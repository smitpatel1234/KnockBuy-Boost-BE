"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const credentials_and_user_manage_repo_1 = require("../../infrastructure/repositories/credentials_and_user_manage.repo");
const register_controller_1 = require("../controllers/auth/register.controller");
const validator_1 = require("../../infrastructure/helper/validator");
const user_1 = require("../../domain/schemas/user");
const auth_1 = require("../../domain/schemas/auth");
const login_out_controller_1 = require("../controllers/auth/login-out.controller");
// import { LoginUserInGoogleController } from '../controllers/auth/google.controller';
const auth_repo_1 = require("../../infrastructure/repositories/auth.repo");
const authvarification_1 = require("../../infrastructure/helper/middleware/authvarification");
const refresh_controller_1 = require("../controllers/auth/refresh.controller");
const User_models_1 = require("../../domain/models/User.models");
const router = express_1.default.Router();
router.post('/register', (0, validator_1.validateDetails)(user_1.userCredentials), (0, register_controller_1.registerUserController)(credentials_and_user_manage_repo_1.UserAndCredentialsRepo));
router.post('/refresh-token', (0, refresh_controller_1.refreshTokenController)(auth_repo_1.AuthRepo));
router.post('/login', (0, validator_1.validateDetails)(auth_1.LoginCredentials), (0, login_out_controller_1.LoginUserController)(auth_repo_1.AuthRepo));
router.post('/logout', (0, authvarification_1.authVerification)([User_models_1.UserRole.USER]), (0, login_out_controller_1.LogoutUserController)(auth_repo_1.AuthRepo));
// router.get('/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email'],
//     session: false,
//     failureRedirect: "/google/failure"
//   })
// );
// router.get('/google/callback',
//   passport.authenticate('google', { session: false, failureRedirect: '/google/failure' }),
//   LoginUserInGoogleController(AuthRepo),
// );
// router.get('/google/failure', (req, res) => {
//   res.status(401).json({
//     statusCode: 401,
//     success: false,
//     message: 'Google authentication failed',
//   });
// });
exports.default = router;
