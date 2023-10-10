import { ObjectId } from 'mongoose';
import Meeting from '../models/meeting';

type Meeting = {
  title?: string;
  timeFrom?: string;
  timeTo?: string;
  author?: string;
  group?: string;
};

export const createMeeting = async data => {
  const newMeeting = new Meeting(data);
  return await newMeeting.save();
};

export const getAllMeetings = async () => {
  return await Meeting.find({}, { _id: 0, __v: 0 });
};

export const getMeetingById = async id => {
  return await Meeting.find({ meetingId: id }, { _id: 0, __v: 0 });
};

export const updateMeetingById = async (id, body) => {
  const meeting = await Meeting.findOne({ meetingId: id });

  if (!meeting) {
    return null;
  }

  return await Meeting.findByIdAndUpdate(meeting._id, body, { new: true });
};

export const deleteMeetingById = async id => {
  const meeting = await Meeting.findOne({ meetingId: id });

  if (!meeting) {
    return null;
  }

  return await Meeting.findByIdAndRemove(meeting._id);
};

export const validateMeetingData = meetingData => {
  const errors: Meeting = {};

  if (!meetingData.title) {
    errors.title = 'Title is required';
  }
  if (!meetingData.timeFrom) {
    errors.timeFrom = 'TimeFrom is required';
  }
  if (!meetingData.timeTo) {
    errors.timeTo = 'TimeTo is required';
  }
  // if (!meetingData.author) {
  //   errors.author = 'Author is required';
  // }
  // if (!meetingData.group) {
  //   errors.group = 'Group is required';
  // }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const isTitleAlreadyInUse = async title => {
  const meeting = await Meeting.findOne({ title });
  return meeting !== null;
};
