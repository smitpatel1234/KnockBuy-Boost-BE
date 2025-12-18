"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passportStrategy_1 = __importDefault(require("../../helper/passportStrategy"));
const ormconfig_1 = require("../../orm/config/ormconfig");
// import { swaggerUi, swaggerSpec } from "../../../swagger/swagger";
const _openapi_json_1 = __importDefault(require("../../../../api-docs/_openapi.json"));
const auth_routes_1 = __importDefault(require("../../../interface/routes/auth.routes"));
const user_routes_1 = __importDefault(require("../../../interface/routes/user.routes"));
const variant_routes_1 = __importDefault(require("../../../interface/routes/variant.routes"));
exports.app = (0, express_1.default)();
ormconfig_1.AppDataSource.initialize().then(() => {
    console.log('Data Source has been initialized!');
}).catch((err) => {
    console.error('Error during Data Source initialization', err);
});
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(passportStrategy_1.default.initialize());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.use('/auth', auth_routes_1.default);
exports.app.use('/user', user_routes_1.default);
exports.app.use('/variant', variant_routes_1.default);
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(_openapi_json_1.default));
};
setupSwagger(exports.app);
exports.app.listen(5000, () => console.log('Server running on port 5000 http://localhost:5000/api-docs'));
