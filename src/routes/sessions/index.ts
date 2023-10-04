import { getAllSession } from '../../controllers/sessionController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    try {
      const sessions = await getAllSession();
      reply.status(200).send(sessions);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
