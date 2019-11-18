const request = require('supertest');
const app = require('../src/app');
const avatar = require('./helper/avatar');
const truncate = require('./helper/truncate');

describe('User', () => {

  beforeEach(async () => {
    await truncate();
  });

  it('should be created user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Diego',
        lastName: 'Rugue',
        email: 'user@teste.com',
        password: '1234',
        avatar,
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be email already registered', async () => {
    await request(app)
      .post('/users')
      .send({
        firstName: 'Diego',
        lastName: 'Rugue',
        email: 'user@teste.com',
        password: '1234',
      });

    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Diego',
        lastName: 'Rugue',
        email: 'user@teste.com',
        password: '1234',
      });

    expect(response.status).toBe(401);
  });
});
