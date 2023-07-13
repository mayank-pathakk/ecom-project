import request from 'supertest';
import app from '../../app';

it('Response should be 201', async () => {
  await request(app).get('/api/v1/auth/signup').expect(201);
});
