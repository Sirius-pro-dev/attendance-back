export default async function (fastify) {
  fastify.post('/', (request, reply) => {
    if (!request.isAuthenticated) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const { first_name, last_name, middle_name, login, password } = request.body;

    reply.status(201).send({});
  });
  fastify.get('/:userID', (request, reply) => {
    if (!request.isAuthenticated) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const userId = request.params.userID;

    reply.status(200).send({});
  });
  fastify.put('/:userID', (request, reply) => {
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
  });
  fastify.delete('/:userID', (request, reply) => {
    if (!request.isAuthenticated) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const userId = request.params.userID;

    reply.status(204).send({});
  });
}
