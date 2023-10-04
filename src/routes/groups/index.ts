import { getAllGroup } from '../../controllers/groupController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    try {
      const groups = await getAllGroup();
      reply.status(200).send(groups);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
