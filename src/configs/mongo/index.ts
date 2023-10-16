export const mongoConfig = {
  connectURL: `mongodb://${process.env.SIRIUS_X_ATTENDANCE_MONGO_USERNAME}:${
    process.env.SIRIUS_X_ATTENDANCE_MONGO_PASSWORD
  }@${process.env.SIRIUS_X_ATTENDANCE_MONGO_HOST}:${process.env.SIRIUS_X_ATTENDANCE_DB_PORT}/${
    process.env.SIRIUS_X_MONGO_AUTHSOURCE ? `?authSource=${process.env.SIRIUS_X_MONGO_AUTHSOURCE}` : ''
  }`
};
