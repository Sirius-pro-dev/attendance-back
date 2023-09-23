export default async function (fastify) {
  fastify.get('/', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }

      reply.status(200).send([{}]);
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
