"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authvarification_1 = require("../../infrastructure/helper/middleware/authvarification");
const validator_1 = require("../../infrastructure/helper/validator ");
const Variant_1 = require("../../domain/schemas/variant/Variant");
const variantprop_controller_1 = require("../controllers/varient/variantprop.controller");
const variant_repo_1 = require("../../infrastructure/repositories/variant.repo");
const router = express_1.default.Router();
router.get('/get-all-variant-properties', (0, authvarification_1.authVerification)(), (0, variantprop_controller_1.getAllVariantPropertiesController)(variant_repo_1.VariantRepo));
router.post('/create-variant-property', (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(Variant_1.AddVarientPropertysSchema), (0, variantprop_controller_1.createVariantPropController)(variant_repo_1.VariantRepo));
router.put('/update-variant-property', (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(Variant_1.VarientPropertysSchema), (0, variantprop_controller_1.UpdateVariantPropController)(variant_repo_1.VariantRepo));
router.delete('/delete-variant-property', (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(Variant_1.VarientPropertysSchema), (0, variantprop_controller_1.deleteVariantPropController)(variant_repo_1.VariantRepo));
exports.default = router;
