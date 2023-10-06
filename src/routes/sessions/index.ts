import { getAllSessions } from '../../controllers/sessionController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    try {
      const sessions = await getAllSessions();
      reply.status(200).send(sessions);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
