import express from "express";
import { uploads } from "../../infrastructure/helper/middleware/uplodeHandler";
import { uploadMultipleFilesController } from "../controllers/upload/upload.controller";
const router = express.Router();
router.post("/upload", uploads.array("files"),uploadMultipleFilesController);
export default router;