"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVariantPropertiesController = exports.deleteVariantPropController = exports.UpdateVariantPropController = exports.createVariantPropController = void 0;
const constants_1 = require("../../../infrastructure/config/constants");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const variant_prop_usecase_1 = require("../../../application/useCases/variant/variant_prop_usecase");
const createVariantPropController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const data = req.body;
        await (0, variant_prop_usecase_1.create_varient_property)(t, variantRepo, data).then(() => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.CREATED, res);
        }).catch((err) => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.INTERNAL_SERVER_ERROR, res, [err]);
        });
    });
};
exports.createVariantPropController = createVariantPropController;
const UpdateVariantPropController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const data = req.body;
        await (0, variant_prop_usecase_1.update_varient_property)(t, variantRepo, data).then(() => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.CREATED, res);
        }).catch((err) => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.INTERNAL_SERVER_ERROR, res, [err]);
        });
    });
};
exports.UpdateVariantPropController = UpdateVariantPropController;
const deleteVariantPropController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const data = req.body;
        await (0, variant_prop_usecase_1.delete_varient_property)(t, variantRepo, data).then(() => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.CREATED, res);
        }).catch((err) => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.INTERNAL_SERVER_ERROR, res, [err]);
        });
    });
};
exports.deleteVariantPropController = deleteVariantPropController;
const getAllVariantPropertiesController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const data = await (0, variant_prop_usecase_1.getall_variant_properties)(t, variantRepo).then((data) => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.OK, res, data);
        }).catch((err) => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.INTERNAL_SERVER_ERROR, res, [err]);
        });
    });
};
exports.getAllVariantPropertiesController = getAllVariantPropertiesController;
