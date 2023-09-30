import { createGroup, getGroupById, updateGroupById, deleteGroupById } from '../../controllers/groupController';

export default async function (fastify) {
  fastify.post('/', (request, reply) => {
    try {
      // if (!request.isAuthenticated) {
      //   reply.status(401).send({ error: 'Unauthorized' });
      //   return;
      // }
      createGroup(request.body);
      reply.status(201).send({ message: 'Created' });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.get('/:id', async (request, reply) => {
    try {
      // if (!request.isAuthenticated) {
      //   reply.status(401).send({ error: 'Unauthorized' });
      //   return;
      // }
      const groupId = request.query.id;
      const group = await getGroupById(groupId);

      if (!group) {
        reply.status(404).send({ error: 'Group not found' });
        return;
      }

      reply.status(200).send(group);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.put('/:id', async (request, reply) => {
    try {
      // const nameIsAlreadyInUse = false;
      // if (!request.isAuthenticated) {
      //   reply.status(401).send({ error: 'Unauthorized' });
      //   return;
      // }
      const groupId = request.query.id;
      const groupBody = request.body;
      const updatedGroup = await updateGroupById(groupId, groupBody);

      if (!updatedGroup) {
        reply.status(404).send({ error: 'Group not found' });
        return;
      }

      // if (nameIsAlreadyInUse) {
      //   reply.status(409).send({ error: 'Name is already in use' });
      // }

      reply.status(200).send(updatedGroup);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.delete('/:id', async (request, reply) => {
    try {
      // if (!request.isAuthenticated) {
      //   reply.status(401).send({ error: 'Unauthorized' });
      //   return;
      // }
      const groupId = request.query.id;
      const deletedGroup = await deleteGroupById(groupId);

      if (!deletedGroup) {
        reply.status(404).send({ error: 'Group not found' });
        return;
      }

      reply.status(200).send({ message: 'Deleted' });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
