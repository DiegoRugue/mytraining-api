const request = require('supertest');
const app = require('../src/app');
const truncate = require('./helper/truncate');

describe('Session', () => {

  beforeEach(async () => {
    await truncate();
  });

  it('should be created session with password', async () => {
    await request(app)
      .post('/users')
      .send({
        firstName: 'Diego',
        lastName: 'Rugue',
        email: 'session@teste.com',
        password: '1234',
      });

    const response = await request(app)
      .post('/session')
      .send({
        email: 'session@teste.com',
        password: '1234',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be created session with token', async () => {
    await request(app)
      .post('/users')
      .send({
        firstName: 'Diego',
        lastName: 'Rugue',
        email: 'session@teste.com',
        token: '1234',
      });

    const response = await request(app)
      .post('/session')
      .send({
        token: '1234'
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be email or password not match', async () => {
    const response = await request(app)
      .post('/session')
      .send({
        email: 'teste@teste.com',
        password: '1234',
      });

    expect(response.status).toBe(404);
  });

  it('should be token not found', async () => {
    const response = await request(app)
      .post('/session')
      .send({
        token: '5555',
      });

    expect(response.status).toBe(404);
  });
});
