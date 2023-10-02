import Group from '../models/group';

type Group = {
  name?: string,
  sessions?: string,
  users?: string,
};

export const createGroup = async (data) => {
  const newGroup = new Group(data);
  return await newGroup.save();
};
  
export const getAllGroup = async () => {
  return await Group.find();
};
  
export const getGroupById = async (id) => {
  return await Group.findById(id);
};
  
export const updateGroupById = async (id, body) => {
  return await Group.findByIdAndUpdate(id, body, { new: true });
};
  
export const deleteGroupById = async (id) => {
  return await Group.findByIdAndRemove(id);
};

export const validateGroupData = (groupData) => {
  const errors: Group = {};

  if (!groupData.name) {
    errors.name = 'Name is required';
  }
  if (!groupData.sessions) {
    errors.sessions = 'Sessions is required';
  }
  if (!groupData.users) {
    errors.users = 'Users is required';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const isNameAlreadyInUse = async (name) => {
    const group = await Group.findOne({ name });
    return group !== null;
}

  