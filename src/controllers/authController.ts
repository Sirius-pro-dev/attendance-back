import { authenticationConfig } from '../configs/authentication';
import User, { UserType } from '../models/user';

export const login = async (data: { email: string; password: string }, fastify) => {
  const checkResult = await checkLoginDetails(data, fastify);
  if (!checkResult.message && checkResult.isPasswordValid) {
    return { status: checkResult.isPasswordValid, user: checkResult.user };
  } else if (checkResult.message) {
    return { status: false, message: checkResult.message };
  } else {
    return { status: false, message: 'Неверный пароль' };
  }
};

const checkLoginDetails = async (data, fastify) => {
  try {
    const user = await User.findOne({ email: data.email });
    const isPasswordValid = await user.comparePassword(data.password);
    return { email: true, isPasswordValid, user };
  } catch (error) {
    fastify.log.error(error);
    return { email: false, message: 'Пользователя с таким email не найдено' };
  }
};

export const generateRefreshToken = async (user, fastify): Promise<string> => {
  const newRefreshToken = fastify.jwt.sign(
    { userId: user.userId },
    { refreshExpiresIn: authenticationConfig.refreshExpiresIn }
  );
  user.refreshToken = newRefreshToken;
  await user.save();
  return newRefreshToken;
};

export const generateAccessToken = (user: UserType, fastify): string => {
  const accessToken = fastify.jwt.sign({ userId: user.userId }, { expiresIn: authenticationConfig.accessExpiresIn });
  return accessToken;
};

export const generateAuthenticationTokens = async (user, fastify) => {
  const newRefreshToken = await generateRefreshToken(user, fastify);
  const newAccessToken = generateAccessToken(user, fastify);
  return { newRefreshToken, newAccessToken };
};
