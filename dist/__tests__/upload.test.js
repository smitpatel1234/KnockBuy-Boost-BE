"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../infrastructure/webserver/express/index");
const request = (0, supertest_1.default)(index_1.app);
describe('Upload Integration Tests', () => {
    let userCookies;
    beforeAll(async () => {
        const testUser = {
            username: 'UploadUser' + (Date.now() % 10000),
            email: `upload_user_${Date.now()}@example.com`,
            password: 'Password123!',
            phone_number: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
        };
        await request.post('/auth/register').send(testUser);
        const loginRes = await request.post('/auth/login').set('re-captcha-token', 'mock-token').send({
            email: testUser.email,
            password: testUser.password
        });
        userCookies = loginRes.header['set-cookie'];
    });
    it('should show unauthorized without cookies', async () => {
        const res = await request.post('/upload');
        expect(res.status).toBe(401);
    });
});
