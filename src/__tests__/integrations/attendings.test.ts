// import request from 'supertest';
// import app, { start } from '../../server';

// describe('Test attendings route', () => {
//   describe('GET /attendings', () => {
//     it('unauthorized', async () => {
//       const response = await app.inject({
//         method: 'GET',
//         url: '/attendings'
//       });

//       expect(response.statusCode).toBe(200);
//     })
//   })

//   describe('GET /attending/:id', () => {
//     it('unauthorized', async () => {
//       const id = 1;
//       const response = await app.inject({
//         method: 'GET',
//         url: `/attending/${id}`
//       });

//       expect(response.statusCode).toBe(401);
//     })
//   })

//   describe('POST /attending', () => {
//     it('unauthorized', async () => {
//       const response = await app.inject({
//         method: 'POST',
//         url: '/attending'
//       });

//       expect(response.statusCode).toBe(401);
//     })
//   })

//   describe('PUT /attending/:id', () => {
//     it('unauthorized', async () => {
//       const id = 1;
//       const response = await app.inject({
//         method: 'PUT',
//         url: `/attending/${id}`
//       });

//       expect(response.statusCode).toBe(401);
//     })
//   })

//   describe('DELETE /attending/:id', () => {
//     it('unauthorized', async () => {
//       const id = 1;
//       const response = await app.inject({
//         method: 'DELETE',
//         url: `/attending/${id}`
//       });

//       expect(response.statusCode).toBe(401);
//     })
//   })
// })
