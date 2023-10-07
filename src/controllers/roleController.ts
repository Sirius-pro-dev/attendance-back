import Role from '../models/role';

export const createRole = async data => {
  const newRole = new Role(data);
  return await newRole.save();
};

export const getAllRoles = async () => {
  return await Role.find({}, { _id: 0, __v: 0 });
};

export const getRoleById = async id => {
  return await Role.findById(id, { _id: 0, __v: 0 });
};

export const updateRoleById = async (id, body) => {
  return await Role.findByIdAndUpdate(id, body, { new: true });
};

export const deleteRoleById = async id => {
  return await Role.findByIdAndRemove(id);
};
