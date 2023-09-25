export default async function (fastify) {
  fastify.post('/', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const { first_name, last_name, middle_name, login, password } = request.body;

      reply.status(201).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.get('/:userID', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const userId = request.params.userID;

      reply.status(200).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.put('/:userID', (request, reply) => {
    try {
      const nameIsAlreadyInUse = false;
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const userId = request.params.userID;
      const { first_name, last_name, middle_name, login, password } = request.body;

      if (nameIsAlreadyInUse) {
        reply.status(409).send({ error: 'Name is already in use' });
      }

      reply.status(200).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.delete('/:userID', (request, reply) => {
    try {
      if (!request.isAuthenticated) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const userId = request.params.userID;

      reply.status(204).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
