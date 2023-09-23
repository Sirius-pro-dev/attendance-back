export default async function (fastify) {
  fastify.get('/', (request, reply) => {
    if (!request.isAuthenticated) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }

    reply.status(200).send([{}]);
  });
}
