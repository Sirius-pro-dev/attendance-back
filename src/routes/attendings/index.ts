import { getAllAttendings } from '../../controllers/attendingController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    const attending = await getAllAttendings();
    reply.status(200).send(attending);
  });
}
