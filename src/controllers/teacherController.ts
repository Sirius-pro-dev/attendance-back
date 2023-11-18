import User from '../models/user';
import Role from '../models/role';

type User = {
  firstname?: string;
  lastname?: string;
  middlename?: string;
  email?: string;
  password?: string;
};

export const getAllTeachers = async () => {
  const teacherRole = await Role.findOne({ slug: 'teacher' })
  return await User.find({_id: teacherRole.users}, { _id: 0, __v: 0 });
};
