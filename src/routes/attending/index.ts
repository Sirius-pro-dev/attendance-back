export default async function (fastify) {
  fastify.post('/', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const { sessionID, studentID } = request.body;

      reply.status(201).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.get('/:attendingId', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const attendingId = request.params.attendingId;

      reply.status(200).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.put('/:attendingId', (request, reply) => {
    try {
      const nameIsAlreadyInUse = false;
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const attendingId = request.params.attendingId;
      const { sessionID, studentID } = request.body;

      if (nameIsAlreadyInUse) {
        reply.status(409).send({ error: 'Name is already in use' });
      }

      reply.status(200).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.delete('/:attendingId', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const attendingId = request.params.attendingId;

      reply.status(204).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
