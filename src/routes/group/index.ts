import {
  createGroup,
  getGroupById,
  updateGroupById,
  deleteGroupById,
  validateGroupData,
  isNameAlreadyInUse
} from '../../controllers/groupController';

export default async function (fastify) {
  fastify.post('/', async (request, reply) => {
    const validationErrors = validateGroupData(request.body);
    const isNameTaken = await isNameAlreadyInUse(request.body.name);

    if (validationErrors) {
      reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
      return;
    }

    if (isNameTaken) {
      reply.status(409).send({ error: 'Name is already in use' });
      return;
    }

    createGroup(request.body);
    reply.status(201).send({ message: 'Created' });
  });
  fastify.get('/:id', async (request, reply) => {
    const groupId = request.params.id;
    const group = await getGroupById(groupId);

    if (!group) {
      reply.status(404).send({ error: 'Group not found' });
      return;
    }

    reply.status(200).send(group);
  });
  fastify.put('/:id', async (request, reply) => {
    const groupId = request.params.id;
    const groupBody = request.body;
    const validationErrors = validateGroupData(groupBody);
    const isNameTaken = await isNameAlreadyInUse(request.body.name);

    if (validationErrors) {
      reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
      return;
    }

    if (isNameTaken) {
      reply.status(409).send({ error: 'Name is already in use' });
      return;
    }

    const updatedGroup = await updateGroupById(groupId, groupBody);

    if (!updatedGroup) {
      reply.status(404).send({ error: 'Group not found' });
      return;
    }

    reply.status(200).send(updatedGroup);
  });
  fastify.delete('/:id', async (request, reply) => {
    const groupId = request.params.id;
    const deletedGroup = await deleteGroupById(groupId);

    if (!deletedGroup) {
      reply.status(404).send({ error: 'Group not found' });
      return;
    }

    reply.status(200).send({ message: 'Deleted' });
  });
}
