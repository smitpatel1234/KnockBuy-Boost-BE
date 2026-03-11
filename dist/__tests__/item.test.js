"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../infrastructure/webserver/express/index");
const ormconfig_1 = require("../infrastructure/orm/config/ormconfig");
const request = (0, supertest_1.default)(index_1.app);
describe('Item Integration Tests', () => {
    let adminCookies;
    beforeAll(async () => {
        // Login as admin - assuming an admin exists or we create one
        // For simplicity, let's register a user and manually promote to ADMIN in DB if needed
        // Or just use a test user if authVerification([]) allows it (which it doesn't, it checks for ADMIN)
        // Let's create an admin for testing
        const adminUser = {
            username: 'AdminUser' + (Date.now() % 10000),
            email: `admin_${Date.now()}@example.com`,
            password: 'AdminPassword123!',
            phone_number: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
        };
        await request.post('/auth/register').send(adminUser);
        // Manually update role to ADMIN in DB
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
    it('should get all items', async () => {
        const res = await request.get('/item/get-all-items');
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
    it('should create a new item as admin', async () => {
        const newItem = {
            item_name: 'Test Item',
            description: 'Test Description',
            item_price: 100,
            stock: 10,
            category_id: 'some-uuid', // Need a real category ID or mock
            slug: 'test-item-' + Date.now()
        };
        // We first need a category
        const catRes = await request.post('/category/create-category')
            .set('Cookie', adminCookies)
            .send({ category_name: 'Test Category' });
        const catgetallRes = await request.get('/category/getAll-categories');
        const categoryId = catgetallRes.body.data[0].category_id;
        newItem.category_id = categoryId;
        const res = await request.post('/item/create-item')
            .set('Cookie', adminCookies)
            .send(newItem);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
    it('should search for items', async () => {
        const res = await request.post('/item/public/search-items').send({
            searchTerm: 'Test'
        });
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
