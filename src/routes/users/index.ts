import { getAllUsers } from '../../controllers/userController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    try {
      const users = await getAllUsers();
      reply.status(200).send(users);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
