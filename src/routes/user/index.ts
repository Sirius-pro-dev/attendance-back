import { createUser, getUserById, updateUserById, deleteUserById } from '../../controllers/userController';

export default async function (fastify) {
  fastify.post('/', (request, reply) => {
    try {
      createUser(request.body);
      reply.status(201).send({ message: 'Created' });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.get('/:id', async (request, reply) => {
    try {
      const userId = request.query.id;
      const user = await getUserById(userId);

      if (!user) {
        reply.status(404).send({ error: 'User not found' });
        return;
      }

      reply.status(200).send(user);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.put('/:id', async (request, reply) => {
    try {
      // const nameIsAlreadyInUse = false;

      const userId = request.query.id;
      const userBody = request.body;
      const updatedUser = await updateUserById(userId, userBody);

      if (!updatedUser) {
        reply.status(404).send({ error: 'User not found' });
        return;
      }

      // if (nameIsAlreadyInUse) {
      //   reply.status(409).send({ error: 'Name is already in use' });
      // }

      reply.status(200).send(updatedUser);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.delete('/:id', async (request, reply) => {
    try {
      const userId = request.query.id;
      const deletedUser = await deleteUserById(userId);

      if (!deletedUser) {
        reply.status(404).send({ error: 'User not found' });
        return;
      }

      reply.status(200).send({ message: 'Deleted' });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
