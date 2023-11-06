import {
  createAttending,
  getAttendingById,
  updateAttendingById,
  deleteAttendingById,
  validateAttendingData,
  isUserAlreadyInUse
} from '../../controllers/attendingController';
import Meeting from '../../models/meeting'
import User from '../../models/user'

export default async function (fastify) {
  fastify.post('/', async (request, reply) => {
    const validationErrors = validateAttendingData(request.body);

    const joined_at = new Date().toISOString();
    const user = await User.findOne({ userId: request.userId });
    const meeting = await Meeting.findOne({ meetingId: request.body.meetingId});
    const userId = user._id;
    const meetingId = meeting._id;

    if (validationErrors) {
      reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
      return;
    }

    createAttending({joined_at: joined_at, user: userId, meeting: meetingId});
    reply.status(201).send({ message: 'Created' });
  });
  fastify.get('/:id', async (request, reply) => {
    const attendingId = request.params.id;
    const attending = await getAttendingById(attendingId);

    if (!attending) {
      reply.status(404).send({ error: 'Attending not found' });
      return;
    }

    reply.status(200).send(attending);
  });
  fastify.put('/:id', async (request, reply) => {
    const attendingId = request.params.id;
    const attendingBody = request.body;
    const validationErrors = validateAttendingData(attendingBody);
    const isUserTaken = await isUserAlreadyInUse(request.body.user);

    if (validationErrors) {
      reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
      return;
    }

    if (isUserTaken) {
      reply.status(409).send({ error: 'User is already in use' });
      return;
    }

    const updatedAttending = await updateAttendingById(attendingId, attendingBody);

    if (!updatedAttending) {
      reply.status(404).send({ error: 'Attending not found' });
      return;
    }

    reply.status(200).send(updatedAttending);
  });
  fastify.delete('/:id', async (request, reply) => {
    const attendingId = request.params.id;
    const deletedAttending = await deleteAttendingById(attendingId);

    if (!deletedAttending) {
      reply.status(404).send({ error: 'Attending not found' });
      return;
    }

    reply.status(200).send({ message: 'Deleted' });
  });
}
