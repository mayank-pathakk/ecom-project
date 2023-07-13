import request from 'supertest';
import app from '../app';

it('Should see a response with 302', async()=> {
    await request(app).get('/').expect(302);
})
