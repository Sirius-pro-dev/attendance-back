import { authenticationConfig } from '../../configs/authentication';
import { createUser } from '../../controllers/userController';

export default async function (fastify) {
  fastify.post('/register', async (request, reply) => {
    try {
      const { email, lastname, firstname, middlename, password } = request.body;
      const login = email;
      // TODO: механизм проверки уникальности полей

      const createdUser = await createUser({ login, lastname, firstname, middlename, password });
      fastify.log.info(createdUser);

      const accessToken = fastify.jwt.sign({ email }, { expiresIn: authenticationConfig.expiresIn });
      reply.status(200).send({ accessToken });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.post('/login', (request, reply) => {
    try {
      reply.status(200).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  fastify.post('/refresh', (request, reply) => {
    try {
      reply.status(204).send({});
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
