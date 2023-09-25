import mongoose from 'mongoose';

export const connect = async fastify => {
  await mongoose.connect(
    `mongodb://${process.env.SIRIUS_X_MONGO_USERNAME}:${process.env.SIRIUS_X_MONGO_PASSWORD}@${
      process.env.SIRIUS_X_DB
    }:27017/${process.env.SIRIUS_X_MONGO_AUTHSOURCE ? `?authSource=${process.env.SIRIUS_X_MONGO_AUTHSOURCE}` : ''}`
  );

  fastify.log.info('Connected to db');

  return async function () {
    await mongoose.disconnect();
  };
};
