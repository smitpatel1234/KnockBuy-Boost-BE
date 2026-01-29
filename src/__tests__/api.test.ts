import supertest from 'supertest'

import { app } from "../infrastructure/webserver/express/index"

describe('Sample Test', () => {
  it('should supertest ', async () => {
    const response = await supertest(app).get('/item/get-all-items');
    expect(response.status).toBe(200);

  })
})
