import { createSession, getSessionById, updateSessionById, deleteSessionById, validateSessionData, isTitleAlreadyInUse } from '../../controllers/sessionController';

export default async function (fastify) {
  fastify.post('/', async (request, reply) => {
    try {
      const validationErrors = validateSessionData(request.body);
      const isTitleTaken = await isTitleAlreadyInUse(request.body.title);

      if (validationErrors) {
        reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
        return;
      }

      // if (isTitleTaken) {
      //   reply.status(409).send({ error: 'Title is already in use' });
      //   return;
      // }

      createSession(request.body);
      reply.status(201).send({ message: 'Created' });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.get('/:id', async (request, reply) => {
    try {
      const sessionId = request.params.id;
      const session = await getSessionById(sessionId);

      if (session.length === 0) {
        reply.status(404).send({ error: 'Session not found' });
        return;
      }

      reply.status(200).send(session);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.put('/:id', async (request, reply) => {
    try {
      const sessionId = request.params.id;
      const sessionBody = request.body;
      const validationErrors = validateSessionData(sessionBody);
      const isTitleTaken = await isTitleAlreadyInUse(request.body.title);

      if (validationErrors) {
        reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
        return;
      }

      // if (isTitleTaken) {
      //   reply.status(409).send({ error: 'Title is already in use' });
      //   return;
      // }

      const updatedSession = await updateSessionById(sessionId, sessionBody)

      if (!updatedSession) {
        reply.status(404).send({ error: 'Session not found' });
        return;
      }

      reply.status(200).send(updatedSession);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.delete('/:id', async (request, reply) => {
    try {
      const sessionId = request.params.id;
      const deletedSession = await deleteSessionById(sessionId);

      if (!deletedSession) {
        reply.status(404).send({ error: 'Session not found' });
        return;
      }

      reply.status(200).send({ message: 'Deleted' });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
