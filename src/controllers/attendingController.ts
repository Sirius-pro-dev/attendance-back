import Attending from '../models/attending';

export const createAttending = async data => {
  const newAttending = new Attending(data);
  return await newAttending.save();
};

export const getAllAttendings = async () => {
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
