"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uplodeHandler_1 = require("../../infrastructure/helper/middleware/uplodeHandler");
const upload_controller_1 = require("../controllers/upload/upload.controller");
const router = express_1.default.Router();
router.post("/upload", uplodeHandler_1.uploads.array("files"), upload_controller_1.uploadMultipleFilesController);
exports.default = router;
