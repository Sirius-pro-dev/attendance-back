import { getAllSessions } from '../../controllers/sessionController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    const sessions = await getAllSessions();
    reply.status(200).send(sessions);
  });
}
