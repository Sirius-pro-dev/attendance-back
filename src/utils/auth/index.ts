export const authenticateToken = async (request, reply, done, fastify) => {
  try {
    const token = request.headers.authorization;

    if (!token) {
      reply.status(401).send({ error: 'Отсутствует access-токен' });
      return;
    }

    const decodedToken = await request.jwtVerify(token);
    request.userId = decodedToken.userId;
    done();
  } catch (error) {
    fastify.log.error(error);
    reply.status(401).send({ error: 'Неверный или истекший access-токен' });
  }
};
