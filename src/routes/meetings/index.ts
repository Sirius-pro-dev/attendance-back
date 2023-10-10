import { getAllMeetings } from '../../controllers/meetingController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    const meetings = await getAllMeetings();
    reply.status(200).send(meetings);
  });
}
