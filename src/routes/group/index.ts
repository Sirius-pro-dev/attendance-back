import { createGroup, getGroupById, updateGroupById, deleteGroupById, validateGroupData, isNameAlreadyInUse } from '../../controllers/groupController';

export default async function (fastify) {
  fastify.post('/', async (request, reply) => {
    try {
      // if (!request.isAuthenticated) {
      //   reply.status(401).send({ error: 'Unauthorized' });
      //   return;
      // }
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
      reply.status(201).send({message: 'Created'});
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
      // if (!request.isAuthenticated) {
      //   reply.status(401).send({ error: 'Unauthorized' });
      //   return;
      // }
      const groupId = request.query.id;
      const groupBody = request.body;
      const updatedGroup = await updateGroupById(groupId, groupBody)
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

      if (!updatedGroup) {
        reply.status(404).send({ error: 'Group not found' });
        return;
      }

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

      reply.status(200).send({message: 'Deleted'});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
