import supertest from 'supertest';
import { app } from '../infrastructure/webserver/express/index';

const request = supertest(app);

describe('Upload Integration Tests', () => {
    let userCookies: string[];

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
        userCookies = loginRes.header['set-cookie'] as unknown as string[];
    });

    it('should show unauthorized without cookies', async () => {
        const res = await request.post('/upload');
        expect(res.status).toBe(401);
    });
});
