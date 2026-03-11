import supertest from 'supertest';
import { app } from '../infrastructure/webserver/express/index';

const request = supertest(app);

describe('Auth Integration Tests', () => {
    let cookies: string[];
    const testUser = {
        username: 'TestUser' + (Date.now() % 10000), // Needs uppercase and digit
        email: `test_${Date.now()}@example.com`,
        password: 'Password123!',
        phone_number: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
    };

    it('should register a new user', async () => {
        const res = await request
            .post('/auth/register')
            .send(testUser);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("User registered successfully");
    });

    it('should login the registered user', async () => {
        const res = await request
            .post('/auth/login')
            .send({
                identifier: testUser.email,
                password: testUser.password,
                role: 'USER',
                recaptchaToken: 'mock-token'
            });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        cookies = res.header['set-cookie'] as unknown as string[];
        expect(cookies).toBeDefined();
    });

    it('should refresh the access token', async () => {
        const refreshTokenCookie = cookies.find(c => c.startsWith('refreshToken='));
        const refreshToken = refreshTokenCookie?.split(';')[0].split('=')[1] || '';

        const res = await request
            .post('/auth/refresh-token')
            .set('Cookie', cookies);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.header['set-cookie']).toBeDefined();
    });

    it('should logout the user', async () => {
        const res = await request
            .post('/auth/logout')
            .set('Cookie', cookies);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
