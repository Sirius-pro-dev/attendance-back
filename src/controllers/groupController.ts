import Group from '../models/group';

export const createGroup = async data => {
  const newGroup = new Group(data);
  return await newGroup.save();
};

export const getAllGroups = async () => {
  return await Group.find({}, { _id: 0, __v: 0 });
};

export const getGroupById = async id => {
  return await Group.findById(id, { _id: 0, __v: 0 });
};

export const updateGroupById = async (id, body) => {
  return await Group.findByIdAndUpdate(id, body, { new: true });
};

export const deleteGroupById = async id => {
  return await Group.findByIdAndRemove(id);
};
