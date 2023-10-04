import { createAttending, getAttendingById, updateAttendingById, deleteAttendingById, validateAttendingData, isUserAlreadyInUse } from '../../controllers/attendingController';

export default async function (fastify) {
  fastify.post('/', async (request, reply) => {
    try {
      const validationErrors = validateAttendingData(request.body);
      const isUserTaken = await isUserAlreadyInUse(request.body.user);

      if (validationErrors) {
        reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
        return;
      }

      if (isUserTaken) {
        reply.status(409).send({ error: 'User is already in use' });
        return;
      }

      createAttending(request.body);
      reply.status(201).send({ message: 'Created' });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.get('/:id', async (request, reply) => {
    try {
      const attendingId = request.query.id;
      const attending = await getAttendingById(attendingId);

      if (attending.length === 0) {
        reply.status(404).send({ error: 'Attending not found' });
        return;
      }

      reply.status(200).send(attending);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.put('/:id', async (request, reply) => {
    try {
      const attendingId = request.query.id;
      const attendingBody = request.body;
      const validationErrors = validateAttendingData(attendingBody);
      const isNameTaken = await isUserAlreadyInUse(request.body.user);

      if (validationErrors) {
        reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
        return;
      }

      if (isNameTaken) {
        reply.status(409).send({ error: 'Name is already in use' });
        return;
      }

      const updatedAttending = await updateAttendingById(attendingId, attendingBody)

      if (!updatedAttending) {
        reply.status(404).send({ error: 'Attending not found' });
        return;
      }

      reply.status(200).send(updatedAttending);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.delete('/:id', async (request, reply) => {
    try {
      const attendingId = request.query.id;
      const deletedAttending = await deleteAttendingById(attendingId);

      if (!deletedAttending) {
        reply.status(404).send({ error: 'Attending not found' });
        return;
      }

      reply.status(200).send({ message: 'Deleted' });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
