"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authvarification_1 = require("../../infrastructure/helper/middleware/authvarification");
const validator_1 = require("../../infrastructure/helper/validator");
const address_1 = require("../../domain/schemas/address");
const address_repo_1 = require("../../infrastructure/repositories/address.repo");
const address_2 = require("../controllers/address");
const router = express_1.default.Router();
router.put("/update-address", (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(address_1.UpdateAddressSchema), (0, address_2.createAddressController)(address_repo_1.AddressRepo));
router.delete("/delete-address", (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(address_1.AddressIdSchema), (0, address_2.deleteAddressController)(address_repo_1.AddressRepo));
router.get("/get-address", (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(address_1.AddressIdSchema), (0, address_2.getAddressController)(address_repo_1.AddressRepo));
router.get("/getall-address-for-user", (0, authvarification_1.authVerification)(), (0, address_2.getALLAddressController)(address_repo_1.AddressRepo));
router.post("/create-address", (0, authvarification_1.authVerification)(), (0, validator_1.validateDetails)(address_1.AddressSchema), (0, address_2.createAddressController)(address_repo_1.AddressRepo));
exports.default = router;
