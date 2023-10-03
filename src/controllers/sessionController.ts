import Session from '../models/session';

export const createSession = async data => {
  const newSession = new Session(data);
  return await newSession.save();
};

export const getAllSession = async () => {
  return await Session.find({}, { _id: 0, __v: 0 });
};

export const getSessionById = async id => {
  return await Session.findById(id, { _id: 0, __v: 0 });
};

export const updateSessionById = async (id, body) => {
  return await Session.findByIdAndUpdate(id, body, { new: true });
};

export const deleteSessionById = async id => {
  return await Session.findByIdAndRemove(id);
};
