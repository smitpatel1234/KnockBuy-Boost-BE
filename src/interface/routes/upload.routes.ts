import express from "express";

import { UserRole } from "../../domain/models/User.models";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { uploads } from "../../infrastructure/helper/middleware/uplodeHandler";
import { uploadMultipleFilesController } from "../controllers/upload/upload.controller";
const router = express.Router();
router.post("/upload", authVerification([UserRole.USER]), uploads.array("files"), uploadMultipleFilesController);
export default router;