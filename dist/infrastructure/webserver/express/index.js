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
const routes_1 = require("./routes");
const ormconfig_1 = require("../../orm/config/ormconfig");
const logger_1 = require("../../helper/logger");
// import { swaggerUi, swaggerSpec } from "../../../swagger/swagger";
const _openapi_json_1 = __importDefault(require("../../../../api-docs/_openapi.json"));
const GlobelErrorHandler_1 = require("../../helper/middleware/GlobelErrorHandler");
const logger_2 = require("../../helper/logger");
const httpError_1 = require("../../helper/httpError");
const constants_1 = require("../../config/constants");
exports.app = (0, express_1.default)();
(0, logger_2.createLoggerInstance)();
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
exports.app.use('', (0, routes_1.createRoutes)());
exports.app.use(GlobelErrorHandler_1.GlobelErrorHandler);
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(_openapi_json_1.default));
};
setupSwagger(exports.app);
exports.app.use((req, res, next) => {
    const notFoundError = new httpError_1.HttpError({
        statusCode: constants_1.StatusCodes.NOT_FOUND,
        message: {
            tag: "Endpoint not found",
        }
    });
    (0, GlobelErrorHandler_1.GlobelErrorHandler)(notFoundError, req, res, next);
});
exports.app.listen(5000, () => logger_1.logger.info('Server running on port 5000 http://localhost:5000/api-docs'));
