import express from "express";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";

import { userProfile } from "../../domain/schemas/user";
import { UserAndCredentialsRepo } from '../../infrastructure/repositories/credentials_and_user_manage.repo';
import { user_id_schema } from "../../domain/schemas/user";
import { deleteUserController } from '../controllers/user/deleteuser.controller';
import { updateUserController } from '../controllers/user/updateuser.controller';
import { getUserController } from '../controllers/user/getuser.controller';
import { getAllUserController } from "../controllers/user/getalluser.controller";
import { getAllUserPageController } from "../controllers/user/getalluserpage.controller";
import { pageParamsSchema } from "../../domain/schemas/pagination";

const router = express.Router();
router.put('/update-user', authVerification(), validateDetails(userProfile), updateUserController(UserAndCredentialsRepo));
router.delete('/delete-user', authVerification(), validateDetails(user_id_schema), deleteUserController(UserAndCredentialsRepo));
router.get('/get-user', authVerification(), getUserController(UserAndCredentialsRepo));
router.get('/get-all-user', authVerification(), getAllUserController(UserAndCredentialsRepo));
router.get('/get-all-user-page', authVerification(), getAllUserPageController(UserAndCredentialsRepo));

export default router;
