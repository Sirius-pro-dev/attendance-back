import { generateQR } from './../../utils/qr/index';
import {
  createMeeting,
  getMeetingById,
  updateMeetingById,
  deleteMeetingById,
  validateMeetingData
} from '../../controllers/meetingController';
import User from '../../models/user'
import Group from '../../models/group'
import Attending from '../../models/attending'
import Role from '../../models/role'

export default async function (fastify) {
  fastify.post('/', async (request, reply) => {
    const validationErrors = validateMeetingData(request.body);

    if (validationErrors) {
      reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
      return;
    }

    const body = request.body;
    body.timeFrom = new Date().toISOString();
    body.teacherIds = body.teacherIds.concat(request.userId);

    const teachers = await User.find({ userId: body.teacherIds });
    const groups = await Group.find({ userId: body.groupIds });
    const teacherIds = teachers.map(teacher => teacher._id);
    const groupIds = groups.map(group => group._id);
    const meeting = await createMeeting({ timeFrom: body.timeFrom, teachers: teacherIds, groups: groupIds });

    reply.status(201).send({
      meetingId: meeting.meetingId
    });
  });
  fastify.get('/:id', async (request, reply) => {
    const meetingId = request.params.id;
    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
      reply.status(404).send({ error: 'Meeting not found' });
      return;
    }

    const attendings = await Attending.find({ meeting: meeting._id });
    const userIds = attendings.map((attending) => { return attending.user })
    const users = await User.find({ _id: userIds })
    let users_data = [];
    for (const user of users) {
      const groups = await Group.find({ users: user._id });
      const roles = await Role.find({ users: user._id });

      users_data.push({
        initials: [user.lastname, user.firstname, user.middlename].join(' '),
        group: groups[0] ? groups[0].name : '',
        role: roles[0] ? roles[0].title : ''
      });
    }

    reply.status(200).send({
      users: users_data
    });
  });
  fastify.put('/:id', async (request, reply) => {
    const meetingId = request.params.id;
    const meetingBody = request.body;
    const validationErrors = validateMeetingData(meetingBody);

    if (validationErrors) {
      reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
      return;
    }

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
