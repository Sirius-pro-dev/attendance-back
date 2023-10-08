import {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  validateUserData,
  isEmailAlreadyInUse
} from '../../controllers/userController';

export default async function (fastify) {
  fastify.post('/', async (request, reply) => {
    const validationErrors = validateUserData(request.body);
    const isEmailTaken = await isEmailAlreadyInUse(request.body.email);

    if (validationErrors) {
      reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
      return;
    }

    // if (isEmailTaken) {
    //   reply.status(409).send({ error: 'Email is already in use' });
    //   return;
    // }

    createUser(request.body);
    reply.status(201).send({ message: 'Created' });
  });
  fastify.get('/:id', async (request, reply) => {
    const userId = request.params.id;
    const user = await getUserById(userId);
    if (user.length === 0) {
      reply.status(404).send({ error: 'User not found' });
      return;
    }

    reply.status(200).send(user);
  });
  fastify.put('/:id', async (request, reply) => {
    const userId = request.params.id;
    const userBody = request.body;
    const isEmailTaken = await isEmailAlreadyInUse(userBody.email);
    const validationErrors = validateUserData(userBody);

    if (validationErrors) {
      reply.status(400).send({ error: 'Invalid Data', details: validationErrors });
      return;
    }

    // if (isEmailTaken) {
    //   reply.status(409).send({ error: 'Email is already in use' });
    //   return;
    // }

    const updatedUser = await updateUserById(userId, userBody);

    if (!updatedUser) {
      reply.status(404).send({ error: 'User not found' });
      return;
    }

    reply.status(200).send(updatedUser);
  });
  fastify.delete('/:id', async (request, reply) => {
    const userId = request.params.id;
    const deletedUser = await deleteUserById(userId);

    if (!deletedUser) {
      reply.status(404).send({ error: 'User not found' });
      return;
    }

    reply.status(200).send({ message: 'Deleted' });
  });
}
