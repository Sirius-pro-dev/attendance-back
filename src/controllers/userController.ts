import User from '../models/user';

export const createUser = async data => {
  const newUser = new User(data);
  return await newUser.save();
};

export const getAllUsers = async () => {
  return await User.find({}, { _id: 0, __v: 0 });
};

export const getUserById = async id => {
  return await User.findById(id, { _id: 0, __v: 0 });
};

export const updateUserById = async (id, body) => {
  return await User.findByIdAndUpdate(id, body, { new: true });
};

export const deleteUserById = async id => {
  return await User.findByIdAndRemove(id);
};
