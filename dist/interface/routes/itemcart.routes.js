"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authvarification_1 = require("../../infrastructure/helper/middleware/authvarification");
const validator_1 = require("../../infrastructure/helper/validator");
const itemcart_1 = require("../../domain/schemas/itemcart");
const itemcart_repo_1 = require("../../infrastructure/repositories/itemcart.repo");
const User_models_1 = require("../../domain/models/User.models");
const index_1 = require("../controllers/itemcart/index");
const router = express_1.default.Router();
router.put("/update-itemcart", (0, authvarification_1.authVerification)([User_models_1.UserRole.USER]), (0, validator_1.validateDetails)(itemcart_1.UpdateItemCartSchema), (0, index_1.updateItemCartController)(itemcart_repo_1.ItemCartRepo));
router.delete("/delete-itemcart", (0, authvarification_1.authVerification)([User_models_1.UserRole.USER]), (0, validator_1.validateDetails)(itemcart_1.ItemCartIdSchema), (0, index_1.deleteItemCartController)(itemcart_repo_1.ItemCartRepo));
router.get("/get-itemcart", (0, authvarification_1.authVerification)([User_models_1.UserRole.USER]), (0, index_1.getItemCartController)(itemcart_repo_1.ItemCartRepo));
router.post("/create-itemcart", (0, authvarification_1.authVerification)([User_models_1.UserRole.USER]), (0, validator_1.validateDetails)(itemcart_1.ItemCartSchema), (0, index_1.createItemCartController)(itemcart_repo_1.ItemCartRepo));
exports.default = router;
