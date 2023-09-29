import User from '../models/user';

export const createUser = async data => {
  const newUser = new User(data);
  await newUser.save();
  return newUser;
};

export const getAllUsers = async () => {
  return await User.find();
};

export const getUserById = async id => {
  return await User.findById(id);
};

export const updateUserById = async (id, body) => {
  return await User.findByIdAndUpdate(id, body, { new: true });
};

export const deleteUserById = async id => {
  return await User.findByIdAndRemove(id);
};
