export default async function (fastify) {
  fastify.post('/', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const { title } = request.body;

      reply.status(201).send({});
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.get('/:groupId', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const groupId = request.params.groupId;

      reply.status(200).send({});
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.put('/:groupId', (request, reply) => {
    try {
      const nameIsAlreadyInUse = false;
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const groupId = request.params.groupId;
      const { title } = request.body;

      if (nameIsAlreadyInUse) {
        reply.status(409).send({ error: 'Name is already in use' });
      }

      reply.status(200).send({});
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.delete('/:groupId', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const groupId = request.params.groupId;

      reply.status(204).send({});
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
