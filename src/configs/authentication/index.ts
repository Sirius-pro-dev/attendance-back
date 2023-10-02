export const authenticationConfig = {
  secretKey: process.env.SIRIUS_X_ATTENDANCE_SECRET_KEY || 'secret-key',
  accessExpiresIn: '1d',
  refreshExpiresIn: '7d',
  excludedRoutes: ['/auth/register', '/auth/login']
};
