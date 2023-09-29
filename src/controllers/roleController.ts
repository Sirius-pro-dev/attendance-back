import Role from '../models/role';

export const createRole = async (data) => {
  const newRole = new Role(data);
  return await newRole.save();
};
  
export const getAllRole = async () => {
  return await Role.find();
};
  
export const getRoleById = async (id) => {
  return await Role.findById(id);
};
  
export const updateRoleById = async (id, body) => {
  return await Role.findByIdAndUpdate(id, body, { new: true });
};
  
export const deleteRoleById = async (id) => {
  return await Role.findByIdAndRemove(id);
};
  