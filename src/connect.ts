import mongoose from 'mongoose';
import { mongoConfig } from './configs/mongo';

export const connect = async fastify => {
  console.log(mongoConfig.connectURL);
  
  await mongoose.connect(mongoConfig.connectURL);

  fastify.log.info('Connected to db');

  return async function () {
    await mongoose.disconnect();
  };
};
