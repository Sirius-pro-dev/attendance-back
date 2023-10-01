import { authenticationConfig } from '../../configs/authentication';
import { createUser } from '../../controllers/userController';
import User from '../../models/user';

export default async function (fastify) {
  fastify.post('/register', async (request, reply) => {
    try {
      const { email, lastname, firstname, middlename, password } = request.body;
      // TODO: механизм проверки уникальности полей

      const newUser = new User({ email, lastname, firstname, middlename, password });
      const refreshToken = fastify.jwt.sign({ email }, { refreshExpiresIn: authenticationConfig.refreshExpiresIn });
      newUser.refreshToken = refreshToken;
      await newUser.save();

      const accessToken = fastify.jwt.sign({ userId: newUser.userId }, { expiresIn: authenticationConfig.expiresIn });
      reply
        .status(200)
        .send({ accessToken, userId: newUser.userId, expiresIn: authenticationConfig.expiresIn, refreshToken });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  fastify.post('/login', async (request, reply) => {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ email });

      const isPasswordValid = await user.comparePassword(password);
      if (!user) {
        reply.status(401).send({ error: 'Пользователя с таким email не найдено' });
        return;
      }

      if (isPasswordValid) {
        reply.status(401).send({ error: 'Неверный пароль' });
        return;
      }

      const refreshToken = fastify.jwt.sign(
        { userId: user.userId },
        { refreshExpiresIn: authenticationConfig.refreshExpiresIn }
      );
      user.refreshToken = refreshToken;
      await user.save();

      const accessToken = fastify.jwt.sign({ userId: user.userId }, { expiresIn: authenticationConfig.expiresIn });

      reply.status(200).send({ accessToken, refreshToken });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  fastify.post('/refresh', async (request, reply) => {
    try {
      const { refreshToken } = request.body;

      const user = await User.findOne({ refreshToken });

      if (!user) {
        reply.status(401).send({ error: 'Неверный refresh-токен' });
        return;
      }

      const accessToken = fastify.jwt.sign({ userId: user.userId }, { expiresIn: authenticationConfig.expiresIn });

      reply.status(200).send({ accessToken });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
