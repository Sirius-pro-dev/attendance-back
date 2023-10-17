import Group from '../models/group';

type Group = {
  name?: string;
  meetings?: string;
  users?: string;
};

export const createGroup = async data => {
  const newGroup = new Group(data);
  return await newGroup.save();
};

export const getAllGroups = async () => {
  return await Group.find({}, { _id: 0, __v: 0 });
};

export const getGroupById = async id => {
  return await Group.findOne({ groupId: id }, { _id: 0, __v: 0 });
};

export const updateGroupById = async (id, body) => {
  const group = await Group.findOne({ groupId: id });

  if (!group) {
    return null;
  }

  return await Group.findByIdAndUpdate(group._id, body, { new: true });
};

export const deleteGroupById = async id => {
  const group = await Group.findOne({ groupId: id });

  if (!group) {
    return null;
  }

  return await Group.findByIdAndRemove(group._id);
};

export const validateGroupData = groupData => {
  const errors: Group = {};

  if (!groupData.name) {
    errors.name = 'Name is required';
  }
  // if (!groupData.meetings) {
  //   errors.meetings = 'Meetings is required';
  // }
  // if (!groupData.users) {
  //   errors.users = 'Users is required';
  // }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const isNameAlreadyInUse = async name => {
  const group = await Group.findOne({ name });
  return group !== null;
};
