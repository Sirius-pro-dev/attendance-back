import { ObjectId } from 'mongoose';
import Session from '../models/session';

type Session = {
  title?: string,
  timeFrom?: string,
  timeTo?: string,
  author?: string,
  group?: string
};

export const createSession = async data => {
  const newSession = new Session(data);
  return await newSession.save();
};

export const getAllSessions = async () => {
  return await Session.find({}, { _id: 0, __v: 0 });
};

export const getSessionById = async id => {
  return await Session.find({sessionId: id}, { _id: 0, __v: 0 });
};

export const updateSessionById = async (id, body) => {
  const session = await Session.findOne({sessionId: id});

  if (!session) {
    return null;
  }

  return await Session.findByIdAndUpdate(session._id, body, { new: true });
};

export const deleteSessionById = async id => {
  const session = await Session.findOne({sessionId: id});

  if (!session) {
    return null;
  }
  
  return await Session.findByIdAndRemove(session._id);
};

export const validateSessionData = (sessionData) => {
  const errors: Session = {};

  if (!sessionData.title) {
    errors.title = 'Title is required';
  }
  if (!sessionData.timeFrom) {
    errors.timeFrom = 'TimeFrom is required';
  }
  if (!sessionData.timeTo) {
    errors.timeTo = 'TimeTo is required';
  }
  // if (!sessionData.author) {
  //   errors.author = 'Author is required';
  // }
  // if (!sessionData.group) {
  //   errors.group = 'Group is required';
  // }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const isTitleAlreadyInUse = async (title) => {
    const session = await Session.findOne({ title });
    return session !== null;
}
