export default async function (fastify) {
  fastify.post('/', (request, reply) => {
    if (!request.isAuthenticated) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const { sessionID, studentID } = request.body;

    reply.status(201).send({});
  });
  fastify.get('/:attendingId', (request, reply) => {
    if (!request.isAuthenticated) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const attendingId = request.params.attendingId;

    reply.status(200).send({});
  });
  fastify.put('/:attendingId', (request, reply) => {
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
  });
  fastify.delete('/:attendingId', (request, reply) => {
    if (!request.isAuthenticated) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const attendingId = request.params.attendingId;

    reply.status(204).send({});
  });
}
