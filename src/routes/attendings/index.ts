import { getAllAttendings } from '../../controllers/attendingController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    try {
      const attending = await getAllAttendings();
      reply.status(200).send(attending);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
