"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("../../../interface/routes/auth.routes"));
const user_routes_1 = __importDefault(require("../../../interface/routes/user.routes"));
const variant_routes_1 = __importDefault(require("../../../interface/routes/variant.routes"));
const upload_routes_1 = __importDefault(require("../../../interface/routes/upload.routes"));
const category_routes_1 = __importDefault(require("../../../interface/routes/category.routes"));
const item_routes_1 = __importDefault(require("../../../interface/routes/item.routes"));
const address_routes_1 = __importDefault(require("../../../interface/routes/address.routes"));
const path_1 = __importDefault(require("path"));
const createRoutes = () => {
    const router = express_1.default.Router();
    router.use('/auth', auth_routes_1.default);
    router.use('/user', user_routes_1.default);
    router.use('/variant', variant_routes_1.default);
    router.use('', upload_routes_1.default);
    router.use('/category', category_routes_1.default);
    router.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../../../../uploads")));
    router.use('/item', item_routes_1.default);
    router.use('/address', address_routes_1.default);
    return router;
};
exports.createRoutes = createRoutes;
