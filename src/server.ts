import 'dotenv/config';
import autoload from '@fastify/autoload';  
import Fastify from 'fastify'
import path from 'node:path';

import { connect } from './connect';

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

fastify.setErrorHandler(function (error, request, reply) {
  reply.status(400).send({error});
})

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.SIRIUS_X_ATTENDANCE_PORT) || 3001 });
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();

const getDisconnectFromDB = connect();

const graceFulShutDown = async () => {
  await fastify.close();
  const disconnectFromDB = await getDisconnectFromDB;
  await disconnectFromDB();
  process.exit(0);
}

process.on('SIGINT', graceFulShutDown);
process.on('SIGTERM', graceFulShutDown);

fastify.register(autoload, {
  dir: path.join(__dirname, 'routes')
})
