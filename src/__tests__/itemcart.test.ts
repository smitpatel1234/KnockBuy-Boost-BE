import supertest from 'supertest';
import { app } from '../infrastructure/webserver/express/index';

const request = supertest(app);

describe('ItemCart Integration Tests', () => {
    let userCookies: string[];

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
        userCookies = loginRes.header['set-cookie'] as unknown as string[];
    });

    it('should get cart (empty initially)', async () => {
        const res = await request.get('/itemcart/get-itemcart')
            .set('Cookie', userCookies);
        expect(res.status).toBe(200);
    });
});
