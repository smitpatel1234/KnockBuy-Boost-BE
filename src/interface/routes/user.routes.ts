import express from "express";

import { UserRole } from "../../domain/models/User.models";
import { userProfile } from "../../domain/schemas/user";
import { user_id_schema } from "../../domain/schemas/user";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import { UserAndCredentialsRepo } from '../../infrastructure/repositories/credentials_and_user_manage.repo';
import { deleteUserController } from '../controllers/user/deleteuser.controller';
import { getAllUserController } from "../controllers/user/getalluser.controller";
import { getAllUserPageController } from "../controllers/user/getalluserpage.controller";
import { getUserController } from '../controllers/user/getuser.controller';
import { getUserProfileController } from "../controllers/user/getuserprofile.controller";
import { updateUserController } from '../controllers/user/updateuser.controller';

const router = express.Router();
router.put('/update-user', authVerification([UserRole.USER]), validateDetails(userProfile), updateUserController(UserAndCredentialsRepo));
router.delete('/delete-user', authVerification([UserRole.USER]), validateDetails(user_id_schema), deleteUserController(UserAndCredentialsRepo));
router.get('/get-user/:id', authVerification([]), getUserController(UserAndCredentialsRepo));
router.get('/get-user/', authVerification([UserRole.USER]), getUserProfileController(UserAndCredentialsRepo));
router.get('/get-all-user', authVerification([]), getAllUserController(UserAndCredentialsRepo));
router.get('/get-all-user-page', authVerification([]), getAllUserPageController(UserAndCredentialsRepo));

export default router;
