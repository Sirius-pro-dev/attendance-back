import { authenticationConfig } from '../../configs/authentication';
import {
  generateAccessToken,
  generateAuthenticationTokens,
  generateRefreshToken,
  login
} from '../../controllers/authController';
import { createUser } from '../../controllers/userController';
import User from '../../models/user';

export default async function (fastify) {
  fastify.post('/register', async (request, reply) => {
    const { email, lastname, firstname, middlename, password } = request.body;
    // TODO: механизм проверки уникальности полей
    const newUser = await createUser({ email, lastname, firstname, middlename, password });
    const newAuthenticationTokens = await generateAuthenticationTokens(newUser, fastify);

    reply.status(200).send({
      newAccessToken: newAuthenticationTokens.newAccessToken,
      newRefreshToken: newAuthenticationTokens.newRefreshToken,
      accessExpiresIn: authenticationConfig.accessExpiresIn,
      refreshExpiresIn: authenticationConfig.refreshExpiresIn
    });
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;
    const lognResult = await login({ email, password }, fastify);

    if (!lognResult.status) {
      reply.status(401).send({ error: lognResult.message });
      return;
    }

    const newAuthenticationTokens = await generateAuthenticationTokens(lognResult.user, fastify);

    reply.status(200).send({
      newAccessToken: newAuthenticationTokens.newAccessToken,
      newRefreshToken: newAuthenticationTokens.newRefreshToken,
      accessExpiresIn: authenticationConfig.accessExpiresIn,
      refreshExpiresIn: authenticationConfig.refreshExpiresIn
    });
  });

  fastify.post('/refresh', async (request, reply) => {
    const refreshToken = request.headers.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (!user) {
      reply.status(401).send({ error: 'Неверный refresh-токен' });
      return;
    }

    await generateRefreshToken(user, fastify);
    const newAccessToken = generateAccessToken(user, fastify);

    reply.status(200).send({ newAccessToken });
  });
}
