import supertest from 'supertest';
import { app } from '../infrastructure/webserver/express/index';

const request = supertest(app);

describe('Address Integration Tests', () => {
    let userCookies: string[];

    beforeAll(async () => {
        const testUser = {
            username: 'AddrUser' + (Date.now() % 10000),
            email: `addr_user_${Date.now()}@example.com`,
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

    it('should create, get, update and delete address', async () => {
        const newAddr = {
            address_line1: 'Main St',
            address_line2: 'Main St',
            city: 'Test City',
            state: 'Test State',
            pincode: 123456,
            country: 'Test Country',

        };

        // Create
        const createRes = await request.post('/address/create-address')
            .set('Cookie', userCookies)
            .send(newAddr);

        expect(createRes.status).toBe(200);

        // Get
        const getallRes = await request.get('/address/getall-address-for-user')
            .set('Cookie', userCookies)
        expect(getallRes.status).toBe(200);

        const getRes = await request.get('/address/get-address')
            .set('Cookie', userCookies)
            .send({ address_id: getallRes.body.data[0].address_id });
        expect(getRes.status).toBe(200);
        // Update
        const updateRes = await request.put('/address/update-address')
            .set('Cookie', userCookies)
            .send({ ...newAddr, address_id: getallRes.body.data[0].address_id, street: 'Updated St' });
        expect(updateRes.status).toBe(200);

        // Delete
        const deleteRes = await request.delete('/address/delete-address')
            .set('Cookie', userCookies)
            .send({ address_id: getallRes.body.data[0].address_id });
        expect(deleteRes.status).toBe(200);
    });
});
