import express from 'express';

import { UserRole } from '../../domain/models/User.models';
import { LoginCredentials } from '../../domain/schemas/auth';
import { userCredentials } from '../../domain/schemas/user';
import { authVerification } from '../../infrastructure/helper/middleware/authvarification';
import passport from "../../infrastructure/helper/passportStrategy"
import { validateDetails } from '../../infrastructure/helper/validator';
// import { LoginUserInGoogleController } from '../controllers/auth/google.controller';
import { AuthRepo } from '../../infrastructure/repositories/auth.repo';
import { UserAndCredentialsRepo } from '../../infrastructure/repositories/credentials_and_user_manage.repo';
import { LoginUserController, LogoutUserController } from '../controllers/auth/login-out.controller';
import { refreshTokenController } from "../controllers/auth/refresh.controller"
import { registerUserController } from '../controllers/auth/register.controller';
const router = express.Router();

router.post('/register', validateDetails(userCredentials),
  registerUserController(UserAndCredentialsRepo),
);
router.post('/refresh-token', refreshTokenController(AuthRepo));
router.post('/login', validateDetails(LoginCredentials),
  LoginUserController(AuthRepo),
);
router.post('/logout', authVerification([UserRole.USER]), LogoutUserController(AuthRepo));

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

export default router;