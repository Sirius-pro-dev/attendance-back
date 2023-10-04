import User from '../models/user';

type User = {
  firstname?: string;
  lastname?: string;
  middlename?: string;
  login?: string;
  password?: string;
};

export const createUser = async (data) => {
  const newUser = new User(data);
  await newUser.save();
  return newUser;
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

export const validateUserData = (userData) => {
  const errors: User = {};

  if (!userData.firstname) {
    errors.firstname = 'First name is required';
  }
  if (!userData.lastname) {
    errors.lastname = 'Last name is required';
  }
  if (!userData.middlename) {
    errors.middlename = 'Middle name is required';
  }
  if (!userData.login) {
    errors.login = 'Login is required';
  }
  if (!userData.password) {
    errors.password = 'Password is required';
  } else if (userData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (userData.login && userData.login.length < 5) {
    errors.login = 'Login must be at least 5 characters long';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const isLoginAlreadyInUse = async (login) => {
    const user = await User.findOne({ login });
    return user !== null;
}
  