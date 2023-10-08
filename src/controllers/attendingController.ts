import Attending from '../models/attending';

type Attending = {
  session?: string;
  user?: string;
  joined_at?: string;
};

export const createAttending = async data => {
  const newAttending = new Attending(data);
  return await newAttending.save();
};

export const getAllAttendings = async () => {
  return await Attending.find({}, { _id: 0, __v: 0 });
};

export const getAttendingById = async id => {
  return await Attending.find({ attendingId: id }, { _id: 0, __v: 0 });
};

export const updateAttendingById = async (id, body) => {
  const attending = await Attending.findOne({ attendingId: id });

  if (!attending) {
    return null;
  }

  return await Attending.findByIdAndUpdate(attending._id, body, { new: true });
};

export const deleteAttendingById = async id => {
  const attending = await Attending.findOne({ attendingId: id });

  if (!attending) {
    return null;
  }

  return await Attending.findByIdAndRemove(attending._id);
};

export const validateAttendingData = attendingData => {
  const errors: Attending = {};

  // if (!attendingData.session) {
  //   errors.session = 'Session is required';
  // }
  // if (!attendingData.user) {
  //   errors.user = 'User is required';
  // }
  if (!attendingData.joined_at) {
    errors.joined_at = 'joined_at is required';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const isUserAlreadyInUse = async user => {
  const attending = await Attending.findOne({ user });
  return attending !== null;
};
