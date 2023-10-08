import { getAllGroups } from '../../controllers/groupController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    const groups = await getAllGroups();
    reply.status(200).send(groups);
  });
}
