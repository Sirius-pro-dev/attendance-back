import { createUser, getUserById, updateUserById, deleteUserById, validateUserData, isLoginAlreadyInUse } from '../../controllers/userController';

export default async function (fastify) {
  fastify.post('/', async (request, reply) => {
    try {
      // if (!request.isAuthenticated) {
      //   reply.status(401).send({ error: 'Unauthorized' });
      //   return;
      // }
      const validationErrors = validateUserData(request.body);
      const isLoginTaken = await isLoginAlreadyInUse(request.body.login);

      if (validationErrors) {
        reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
        return;
      }

      if (isLoginTaken) {
        reply.status(409).send({ error: 'Login is already in use' });
        return;
      }

      createUser(request.body);
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
      // if (!request.isAuthenticated) {
      //   reply.status(401).send({ error: 'Unauthorized' });
      //   return;
      // }
      const userId = request.query.id;
      const userBody = request.body;
      const updatedUser = await updateUserById(userId, userBody)
      const validationErrors = validateUserData(userBody);
      const isLoginTaken = await isLoginAlreadyInUse(userBody.login);

      if (validationErrors) {
        reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
        return;
      }

      if (isLoginTaken) {
        reply.status(409).send({ error: 'Login is already in use' });
        return;
      }

      if (!updatedUser) {
        reply.status(404).send({ error: 'User not found' });
        return;
      }

      reply.status(200).send(updatedUser);
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
      const userId = request.query.id;
      const deletedUser = await deleteUserById(userId);

      if (!deletedUser) {
        reply.status(404).send({ error: 'User not found' });
        return;
      }

      reply.status(200).send({message: 'Deleted'});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
