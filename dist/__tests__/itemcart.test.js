"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../infrastructure/webserver/express/index");
const request = (0, supertest_1.default)(index_1.app);
describe('ItemCart Integration Tests', () => {
    let userCookies;
    beforeAll(async () => {
        const testUser = {
            username: 'CartUser' + (Date.now() % 10000),
            email: `cart_user_${Date.now()}@example.com`,
            password: 'Password123!',
            phone_number: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
        };
        await request.post('/auth/register').send(testUser);
        const loginRes = await request.post('/auth/login').send({
            identifier: testUser.email,
            password: testUser.password,
            role: 'USER',
            recaptchaToken: 'mock-token'
        });
        userCookies = loginRes.header['set-cookie'];
    });
    it('should get cart (empty initially)', async () => {
        const res = await request.get('/itemcart/get-itemcart')
            .set('Cookie', userCookies);
        expect(res.status).toBe(200);
    });
});
