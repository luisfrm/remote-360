const request = require('supertest');
const app = require('../src/app');
const createApp = require('../src/app');

describe('API Test', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  describe('API Test', () => {
    let app;

    beforeAll(() => {
      app = createApp();
    });

    it('should return 200 OK and "Hello World!"', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.text).toBe("Hello World!");
    });

    it('should allow requests from allowed origins', async () => {
      const res = await request(app)
        .get('/')
        .set('Origin', 'http://localhost:5173');
      expect(res.statusCode).toEqual(200);
    });

    it('should block requests from disallowed origins', async () => {
      const res = await request(app)
        .get('/')
        .set('Origin', 'http://disallowed-origin.com');
      expect(res.statusCode).toEqual(500);
      expect(res.error.text).toContain('Not allowed by CORS');
    });
  });
});