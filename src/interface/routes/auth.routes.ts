import express from 'express';
import { UserAndCredentialsRepo } from '../../infrastructure/repositories/credentials_and_user_manage.repo';
import { registerUserController } from '../controllers/auth/register.controller';
import { validateDetails } from '../../infrastructure/helper/validator ';
import { userCredentials } from '../../domain/schemas/user';
import { LoginCredentials } from '../../domain/schemas/auth';
import { LoginUserController, LogoutUserController } from '../controllers/auth/login-out.controller';
import {LoginUserInGoogleController} from '../controllers/auth/google.controller';
import { AuthRepo } from '../../infrastructure/repositories/auth.repo';
import { authVerification } from '../../infrastructure/helper/middleware/authvarification';
import passport from "../../infrastructure/helper/passportStrategy"

const router = express.Router();

router.post('/register',validateDetails(userCredentials),
    registerUserController(UserAndCredentialsRepo) ,
);

router.post('/login',validateDetails(LoginCredentials),
    LoginUserController(AuthRepo) ,
);
router.post('/logout',authVerification(), LogoutUserController(AuthRepo));

router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile','email'],
    session: false,
    failureRedirect: "/google/failure" 
  })
);

router.get('/google/callback', 
  passport.authenticate('google', { session: false,failureRedirect: '/google/failure' }),
  LoginUserInGoogleController(AuthRepo),
  
);

router.get('/google/failure', (req, res) => {
  res.status(401).json({
    statusCode: 401,
    success: false,
    message: 'Google authentication failed',
  });
});

export default router;