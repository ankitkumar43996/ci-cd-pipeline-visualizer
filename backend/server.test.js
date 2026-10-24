const request = require('supertest');
const app = require('./server');

describe('Sample Unit Tests', () => {
  it('GET / returns valid response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
