import supertest from 'supertest';
import { app } from '../infrastructure/webserver/express/index';
import { AppDataSource } from '../infrastructure/orm/config/ormconfig';
import { User } from '../infrastructure/orm/entities/user';
import bcrypt from 'bcrypt';

const request = supertest(app);

describe('Variant Integration Tests', () => {
    let cookies: string[];
    const adminUser = {
        username: 'Admin' + Date.now(),
        email: `admin_${Date.now()}@example.com`,
        password: 'Password123!',
        phone_number: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
    };

    beforeAll(async () => {
        // Create Admin user directly in DB
        const hashedPassword = await bcrypt.hash(adminUser.password, 10);
        const userRepository = AppDataSource.getRepository(User);
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

        cookies = loginRes.header['set-cookie'] as unknown as string[];
    });

    it('should get all variant properties', async () => {
        const res = await request
            .get('/variant/get-all-variant-properties')
            .set('Cookie', cookies);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
