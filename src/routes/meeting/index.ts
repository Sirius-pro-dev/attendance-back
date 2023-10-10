import { generateQR } from './../../utils/qr/index';
import {
  createMeeting,
  getMeetingById,
  updateMeetingById,
  deleteMeetingById,
  validateMeetingData,
  isTitleAlreadyInUse
} from '../../controllers/meetingController';

export default async function (fastify) {
  fastify.post('/', async (request, reply) => {
    const validationErrors = validateMeetingData(request.body);
    const isTitleTaken = await isTitleAlreadyInUse(request.body.title);

    if (validationErrors) {
      reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
      return;
    }

    // if (isTitleTaken) {
    //   reply.status(409).send({ error: 'Title is already in use' });
    //   return;
    // }

    createMeeting(request.body);
    reply.status(201).send({ message: 'Created' });
  });
  fastify.get('/:id', async (request, reply) => {
    const meetingId = request.params.id;
    const meeting = await getMeetingById(meetingId);

    if (meeting.length === 0) {
      reply.status(404).send({ error: 'Meeting not found' });
      return;
    }

    reply.status(200).send(meeting);
  });
  fastify.put('/:id', async (request, reply) => {
    const meetingId = request.params.id;
    const meetingBody = request.body;
    const validationErrors = validateMeetingData(meetingBody);
    const isTitleTaken = await isTitleAlreadyInUse(request.body.title);

    if (validationErrors) {
      reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
      return;
    }

    // if (isTitleTaken) {
    //   reply.status(409).send({ error: 'Title is already in use' });
    //   return;
    // }

    const updatedMeeting = await updateMeetingById(meetingId, meetingBody);

    if (!updatedMeeting) {
      reply.status(404).send({ error: 'Meeting not found' });
      return;
    }

    reply.status(200).send(updatedMeeting);
  });
  fastify.delete('/:id', async (request, reply) => {
    const meetingId = request.params.id;
    const deletedMeeting = await deleteMeetingById(meetingId);

    if (!deletedMeeting) {
      reply.status(404).send({ error: 'Meeting not found' });
      return;
    }

    reply.status(200).send({ message: 'Deleted' });
  });
  fastify.get('/QRCode', async (request, reply) => {
    try {
      const { url } = request.headers;

      if (!url) {
        reply.status(400).send({ error: 'url not loyal' });
        return;
      }

      const genQR = generateQR(url);

      reply
        .status(200)
        .header('Content-Type', 'image/png')
        .send(Buffer.from((await genQR).replace(/^data:image\/(png);base64,/, ''), 'base64'));
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
