export default async function (fastify) {
  fastify.post('/', (request, reply) => {
    if (!request.isAuthenticated) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const { title, timeFrom, timeTo, authorID, groupsID } = request.body;

    reply.status(201).send({});
  });
  fastify.get('/:sessionId', (request, reply) => {
    if (!request.isAuthenticated) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const sessionId = request.params.sessionId;

    reply.status(200).send({});
  });
  fastify.put('/:sessionId', (request, reply) => {
    const nameIsAlreadyInUse = false;
    if (!request.isAuthenticated) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const sessionId = request.params.sessionId;
    const { title, timeFrom, timeTo, authorID, groupsID } = request.body;

    if (nameIsAlreadyInUse) {
      reply.status(409).send({ error: 'Name is already in use' });
    }

    reply.status(200).send({});
  });
  fastify.delete('/:sessionId', (request, reply) => {
    if (!request.isAuthenticated) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const sessionId = request.params.sessionId;

    reply.status(204).send({});
  });
}
