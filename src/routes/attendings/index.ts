import { getAllAttending } from '../../controllers/attendingController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    try {
      // if (!request.isAuthenticated) {
      //   reply.status(401).send({ error: 'Unauthorized' });
      //   return;
      // }
      const attending = await getAllAttending();
      reply.status(200).send(attending);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
