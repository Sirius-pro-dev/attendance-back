import { getAllUsers } from '../../controllers/userController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    try {
      // if (!request.isAuthenticated) {
      //   reply.status(401).send({ error: 'Unauthorized' });
      //   return;
      // }
      const users = await getAllUsers();
      reply.status(200).send(users);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
