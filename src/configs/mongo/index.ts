export const mongoConfig = {
  connectURL: `mongodb://${process.env.SIRIUS_X_MONGO_USERNAME}:${process.env.SIRIUS_X_MONGO_PASSWORD}@${
    process.env.SIRIUS_X_DB
  }:27018/${process.env.SIRIUS_X_MONGO_AUTHSOURCE ? `?authSource=${process.env.SIRIUS_X_MONGO_AUTHSOURCE}` : ''}`
};
