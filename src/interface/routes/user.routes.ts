import express from "express";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator ";

import { userProfile } from "../../domain/schemas/user";
import {UserAndCredentialsRepo} from '../../infrastructure/repositories/credentials_and_user_manage.repo';
import {user_id_schema } from "../../domain/schemas/user";
import {updateUserController,deleteUserController} from '../controllers/user.controller';

 const router = express.Router();
    router.put('/update-user', authVerification() ,validateDetails(userProfile) ,updateUserController(UserAndCredentialsRepo) );
    router.delete('/delete-user', authVerification(),validateDetails(user_id_schema) ,deleteUserController(UserAndCredentialsRepo) );
export default router;
 