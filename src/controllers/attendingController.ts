import Attending from '../models/attending';

export const createAttending = async (data) => {
  const newAttending = new Attending(data);
  return await newAttending.save();
};
  
export const getAllAttending = async () => {
  return await Attending.find();
};
  
export const getAttendingById = async (id) => {
  return await Attending.findById(id);
};
  
export const updateAttendingById = async (id, body) => {
  return await Attending.findByIdAndUpdate(id, body, { new: true });
};
  
export const deleteAttendingById = async (id) => {
  return await Attending.findByIdAndRemove(id);
};
  