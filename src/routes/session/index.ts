export default async function (fastify) {
  fastify.post('/', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const { title, timeFrom, timeTo, authorID, groupsID } = request.body;

      reply.status(201).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.get('/:sessionId', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const sessionId = request.params.sessionId;

      reply.status(200).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.put('/:sessionId', (request, reply) => {
    try {
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
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.delete('/:sessionId', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const sessionId = request.params.sessionId;

      reply.status(204).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
