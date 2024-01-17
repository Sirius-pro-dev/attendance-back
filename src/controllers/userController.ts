import User from '../models/user';

type User = {
  firstname?: string;
  lastname?: string;
  middlename?: string;
  email?: string;
  password?: string;
};

export const createUser = async data => {
  const newUser = new User(data);
  await newUser.save();
  return newUser;
};

export const getAllUsers = async () => {
  return await User.find({}, { __v: 0, refreshToken: false, password_hash: false, password: false });
};

export const getUserById = async (id: string) => {
  return await User.findOne(
    { userId: id },
    { _id: 0, __v: 0, refreshToken: false, password_hash: false, password: false }
  );
};

export const updateUserById = async (id: string, body) => {
  const user = await User.findOne({ userId: id });

  if (!user) {
    return null;
  }

  return await User.findByIdAndUpdate(user._id, body, { new: true });
};

export const deleteUserById = async (id: string) => {
  const user = await User.findOne({ userId: id });

  if (!user) {
    return null;
  }

  return await User.findByIdAndRemove(user._id);
};

export const validateUserData = userData => {
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
  if (!userData.email) {
    errors.email = 'Email is required';
  }
  if (!userData.password) {
    errors.password = 'Password is required';
  } else if (userData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (userData.email && userData.email.length < 5) {
    errors.email = 'Email must be at least 5 characters long';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const isEmailAlreadyInUse = async (email: string) => {
  const user = await User.findOne({ email });
  return !!user;
};
