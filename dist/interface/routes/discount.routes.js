"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authvarification_1 = require("../../infrastructure/helper/middleware/authvarification");
const validator_1 = require("../../infrastructure/helper/validator");
const discount_1 = require("../../domain/schemas/discount");
const discount_repo_1 = require("../../infrastructure/repositories/discount.repo");
const discount_2 = require("../controllers/discount");
const router = express_1.default.Router();
router.post('/create-discount', (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(discount_1.AddDiscountSchema), (0, discount_2.createDiscountController)(discount_repo_1.DiscountRepo));
router.put('/update-discount', (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(discount_1.UpdateDiscountSchema), (0, discount_2.updateDiscountController)(discount_repo_1.DiscountRepo));
router.delete('/delete-discount', (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(discount_1.DiscountIdSchema), (0, discount_2.deleteDiscountController)(discount_repo_1.DiscountRepo));
router.get('/get-discount', (0, authvarification_1.authVerification)(), (0, discount_2.getDiscountController)(discount_repo_1.DiscountRepo));
router.get('/get-all-discounts', (0, authvarification_1.authVerification)(), (0, discount_2.getAllDiscountsController)(discount_repo_1.DiscountRepo));
router.get('/get-all-discounts-page', (0, authvarification_1.authVerification)(), (0, discount_2.getAllDiscountsPageController)(discount_repo_1.DiscountRepo));
exports.default = router;
