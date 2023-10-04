import Attending from '../models/attending';

type Attending = {
  session?: string,
  user?: string,
  joinedAt?: string,
};

export const createAttending = async (data) => {
  const newAttending = new Attending(data);
  return await newAttending.save();
};

export const getAllAttending = async () => {
  return await Attending.find({}, { _id: 0, __v: 0 });
};

export const getAttendingById = async id => {
  return await Attending.findById(id, { _id: 0, __v: 0 });
};

export const updateAttendingById = async (id, body) => {
  return await Attending.findByIdAndUpdate(id, body, { new: true });
};

export const deleteAttendingById = async id => {
  return await Attending.findByIdAndRemove(id);
};

export const validateAttendingData = (attendingData) => {
  const errors: Attending = {};

  if (!attendingData.session) {
    errors.session = 'Name is required';
  }
  if (!attendingData.user) {
    errors.user = 'Sessions is required';
  }
  if (!attendingData.joinedAt) {
    errors.joinedAt = 'Users is required';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const isUserAlreadyInUse = async (name) => {
    const group = await Attending.findOne({ name });
    return group !== null;
}

  