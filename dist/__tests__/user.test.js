"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../infrastructure/webserver/express/index");
const request = (0, supertest_1.default)(index_1.app);
describe('User Integration Tests', () => {
    let userCookies;
    let userId;
    beforeAll(async () => {
        const testUser = {
            username: 'UserTest' + (Date.now() % 10000),
            email: `user_test_${Date.now()}@example.com`,
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
        userId = loginRes.body.data.user_id;
    });
    it('should get user profile', async () => {
        const res = await request.get('/user/get-user/')
            .set('Cookie', userCookies);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.user_id).toBe(userId);
    });
    it('should update self profile', async () => {
        const testUser = {
            username: 'UserTest' + (Date.now() % 10000),
            email: `user_test_${Date.now()}@example.com`,
            password: 'Password123!',
            phone_number: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
        };
        const res = await request.put('/user/update-profile')
            .set('Cookie', userCookies)
            .send({
            ...testUser,
            username: 'User' + (Date.now() % 10000),
        });
        console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
