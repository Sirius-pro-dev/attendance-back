import { getAllSession } from '../../controllers/sessionController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    try {
      // if (!request.isAuthenticated) {
      //   reply.status(401).send({ error: 'Unauthorized' });
      //   return;
      // }
      const sessions = await getAllSession();
      reply.status(200).send(sessions);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
