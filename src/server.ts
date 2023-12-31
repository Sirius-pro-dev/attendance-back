import autoload from '@fastify/autoload';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import 'dotenv/config';
import Fastify from 'fastify';
import path from 'node:path';

import { authenticationConfig } from './configs/authentication';
import { loggerConfig } from './configs/logger';
import { connect } from './connect';
import seeds from './seed/seed';
import { authenticateToken } from './utils/auth';

const fastify = Fastify({
  logger: loggerConfig[process.env.SIRIUS_X_ATTENDANCE_PROJECT_STATUS] ?? true
});

fastify.register(fastifyJwt, {
  secret: authenticationConfig.secretKey,
  sign: {
    expiresIn: authenticationConfig.accessExpiresIn
  }
});

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

fastify.addHook('onRequest', (request, reply, done) => {
  if (
    authenticationConfig.excludedRoutes.includes(request.raw.url) ||
    process.env.SIRIUS_X_ATTENDANCE_PROJECT_STATUS == 'test'
  ) {
    done();
    return;
  }

  authenticateToken(request, reply, done, fastify);
});

fastify.setErrorHandler(function (error, request, reply) {
  fastify.log.error(error);
  reply.status(500).send({ error: 'Internal Server Error' });
});

const start = () => {
  try {
    fastify.listen({
      port: Number(process.env.SIRIUS_X_ATTENDANCE_PORT) || 3002,
      host: '0.0.0.0'
    });

    fastify.log.info(`listening on port ${Number(process.env.SIRIUS_X_ATTENDANCE_PORT) || 3002}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

const getDisconnectFromDB = connect(fastify);

seeds(fastify);

const graceFulShutDown = async () => {
  await fastify.close();
  const disconnectFromDB = await getDisconnectFromDB;
  await disconnectFromDB();
  process.exit(0);
};

process.on('SIGINT', graceFulShutDown);
process.on('SIGTERM', graceFulShutDown);

fastify.register(autoload, {
  dir: path.join(__dirname, 'routes')
});

fastify.get('/hc', (req, rep) => {
  return { ok: true, engine: 'fastify' };
});

export default fastify;
