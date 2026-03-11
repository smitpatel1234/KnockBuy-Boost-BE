"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../infrastructure/webserver/express/index");
const ormconfig_1 = require("../infrastructure/orm/config/ormconfig");
const user_1 = require("../infrastructure/orm/entities/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const request = (0, supertest_1.default)(index_1.app);
describe('Variant Integration Tests', () => {
    let cookies;
    const adminUser = {
        username: 'Admin' + Date.now(),
        email: `admin_${Date.now()}@example.com`,
        password: 'Password123!',
        phone_number: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
    };
    beforeAll(async () => {
        // Create Admin user directly in DB
        const hashedPassword = await bcrypt_1.default.hash(adminUser.password, 10);
        const userRepository = ormconfig_1.AppDataSource.getRepository(user_1.User);
        await userRepository.save(userRepository.create({
            ...adminUser,
            password: hashedPassword,
            role: 'ADMIN'
        }));
        // Login to get cookies
        const loginRes = await request
            .post('/auth/login')
            .send({
            identifier: adminUser.email,
            password: adminUser.password,
            role: 'ADMIN',
            recaptchaToken: 'mock-token'
        });
        cookies = loginRes.header['set-cookie'];
    });
    it('should get all variant properties', async () => {
        const res = await request
            .get('/variant/get-all-variant-properties')
            .set('Cookie', cookies);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
