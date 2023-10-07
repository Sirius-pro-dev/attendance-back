import request from 'supertest';
import app, { start } from '../../server';
import {
  generateAccessToken,
  generateAuthenticationTokens
} from '../../controllers/authController';
import fastifyJwt from '@fastify/jwt';

import User from '../../models/user'
import { authenticationConfig } from '../../configs/authentication';

describe('Test users route', () => {
  describe('GET /users', () => {
    it('correct', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/users'
      });

      console.log(response.body)
      expect(response.statusCode).toBe(200);
    })
  })

  describe('GET /user/:id', () => {
    it('unauthorized', async () => {
      const id = 'fc287a17-3e85-4db6-a0ae-5e1d37cfe37d';
      const response = await app.inject({
        method: 'GET',
        url: `/user/${id}`
      });

      expect(response.statusCode).toBe(401);
    })
  })

  // describe('POST /user', () => {
  //   it('unauthorized', async () => {
  //     const response = await app.inject({
  //       method: 'POST',
  //       url: '/users'
  //     });

  //     expect(response.statusCode).toBe(401);
  //   })
  // })

  // describe('PUT /user/:id', () => {
  //   it('unauthorized', async () => {
  //     const id = 1;
  //     const response = await app.inject({
  //       method: 'PUT',
  //       url: `/users/${id}`
  //     });

  //     expect(response.statusCode).toBe(401);
  //   })
  // })

  // describe('DELETE /user/:id', () => {
  //   it('unauthorized', async () => {
  //     const id = 1;
  //     const response = await app.inject({
  //       method: 'DELETE',
  //       url: `/users/${id}`
  //     });

  //     expect(response.statusCode).toBe(401);
  //   })
  // })
})
