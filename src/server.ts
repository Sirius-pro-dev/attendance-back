import { connect } from './connect';
import autoload from '@fastify/autoload';  

// Import the framework and instantiate it
import Fastify from 'fastify'
import path from 'node:path';
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3001 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();

const disconnectFromDB = connect();

const graceFulShutDown = async () => {
  await fastify.close();
  await disconnectFromDB();
  process.exit(0);
}

process.on('SIGINT', graceFulShutDown);
process.on('SIGTERM', graceFulShutDown);

fastify.register(autoload, {
  dir: path.join(__dirname, 'routes')
})
