// __tests__/users.test.js
import request from 'supertest';
import app, { start } from '../../server';

test('Test route', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/users'
  });

  expect(response.statusCode).toBe(200);
  // expect(response.body).toEqual('Expected response body');
});
