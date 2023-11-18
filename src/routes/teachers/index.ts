import { getAllTeachers } from '../../controllers/teacherController';

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    const teachers = await getAllTeachers();
    reply.status(200).send(teachers);
  });
}
