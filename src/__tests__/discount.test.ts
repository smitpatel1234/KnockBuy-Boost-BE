import supertest from 'supertest';
import { app } from '../infrastructure/webserver/express/index';

const request = supertest(app);

describe('Discount Integration Tests', () => {
    let userCookies: string[];

    beforeAll(async () => {
        const testUser = {
            username: 'DiscUser' + (Date.now() % 10000),
            email: `disc_user_${Date.now()}@example.com`,
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

    it('should fail to validate non-existent promo', async () => {
        const res = await request.post('/discount/validate-promo')
            .set('Cookie', userCookies)
            .send({ promo_code: 'INVALID' });

        expect(res.status).toBe(422);
        expect(res.body.success).toBe(false);
    });
});
