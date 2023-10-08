import { getAllUsers } from '../../controllers/userController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    const users = await getAllUsers();
    reply.status(200).send(users);
  });
}
