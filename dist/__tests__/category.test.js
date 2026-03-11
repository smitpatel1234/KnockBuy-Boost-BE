"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../infrastructure/webserver/express/index");
const ormconfig_1 = require("../infrastructure/orm/config/ormconfig");
const request = (0, supertest_1.default)(index_1.app);
describe('Category Integration Tests', () => {
    let adminCookies;
    beforeAll(async () => {
        const adminUser = {
            username: 'CatAdmin' + (Date.now() % 10000),
            email: `cat_admin_${Date.now()}@example.com`,
            password: 'AdminPassword123!',
            phone_number: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
        };
        await request.post('/auth/register').send(adminUser);
        const userRepository = ormconfig_1.AppDataSource.getRepository('User');
        await userRepository.update({ email: adminUser.email }, { role: 'ADMIN' });
        const loginRes = await request.post('/auth/login').send({
            identifier: adminUser.email,
            password: adminUser.password,
            role: 'ADMIN',
            recaptchaToken: 'mock-token'
        });
        adminCookies = loginRes.header['set-cookie'];
    });
    it('should get all categories', async () => {
        const res = await request.get('/category/getAll-categories');
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
    it('should create, update and delete a category', async () => {
        const newCat = { category_name: 'New Cat' };
        // Create
        const createRes = await request.post('/category/create-category')
            .set('Cookie', adminCookies)
            .send(newCat);
        expect(createRes.status).toBe(200);
        const GetallRes = await request.get('/category/getAll-categories')
            .set('Cookie', adminCookies)
            .send(newCat);
        console.log(GetallRes.body);
        const catId = GetallRes.body.data[0].category_id;
        expect(createRes.status).toBe(200);
        // Update
        const updateRes = await request.put('/category/update-category')
            .set('Cookie', adminCookies)
            .send({ category_id: catId, category_name: 'Updated Cat' });
        expect(updateRes.status).toBe(200);
        // Delete
        const deleteRes = await request.delete('/category/delete-category')
            .set('Cookie', adminCookies)
            .send({ category_id: catId });
        expect(deleteRes.status).toBe(200);
    });
});
