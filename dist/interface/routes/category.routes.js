"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authvarification_1 = require("../../infrastructure/helper/middleware/authvarification");
const validator_1 = require("../../infrastructure/helper/validator");
const category_1 = require("../../domain/schemas/category");
const category_repo_1 = require("../../infrastructure/repositories/category.repo");
const category_2 = require("../controllers/category");
const router = express_1.default.Router();
router.get('/getAll-categories', (0, category_2.getALLCategoryController)(category_repo_1.CategoryRepo));
router.post('/create-category', (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(category_1.AddCategorySchema), (0, category_2.createCategoryController)(category_repo_1.CategoryRepo));
router.put('/update-category', (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(category_1.UpdateCategorySchema), (0, category_2.updateCategoryController)(category_repo_1.CategoryRepo));
router.delete('/delete-category', (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(category_1.DeleteCategorySchema), (0, category_2.deleteCategoryController)(category_repo_1.CategoryRepo));
exports.default = router;
