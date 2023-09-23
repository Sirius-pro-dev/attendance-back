import Group from '../models/group';
import User from '../models/user';
import Session from '../models/session';
import Attending from '../models/attending';
import Role from '../models/role';

const seed = async () => {
  const user1 = new User({
    firstname: 'Артур',
    lastname: 'Амантаев',
    middlename: 'Махмудович',
    password: 'qwerty',
    login: 'artur',
  });
  await user1.save();
  const user2 = new User({
    firstname: 'Даниил',
    lastname: 'Усов',
    middlename: 'Андреевич',
    password: 'qwerty1',
    login: 'daniel',
  });
  await user2.save();
  const user3 = new User({
    firstname: 'Сергей',
    lastname: 'Рындин',
    middlename: null,
    password: 'abc123',
    login: 'naziser',
  });
  await user3.save();
  const teacher = new User({
    firstname: 'Валерий',
    lastname: 'Учитель',
    middlename: null,
    password: 'abc123',
    login: 'valerian_floppa',
  });
  await teacher.save();
  console.log('users are created');

  const student_role = new Role({
    title: 'Студент',
    slug: 'student',
    users: [user1, user2, user3],
  });
  await student_role.save();
  const teacher_role = new Role({
    title: 'Преподаватель',
    slug: 'teacher',
    users: [teacher],
  });
  await teacher_role.save();
  console.log('roles are created');

  const group = new Group({
    name: 'Л0711-21/1',
    users: [user1, user2, user3],
  });
  await group.save();
  console.log('groups are created');

  const session1 = new Session({
    title: 'JS разработка',
    timeFrom: new Date(2023, 9, 22, 18, 30, 0),
    timeTo: new Date(2023, 9, 22, 20, 0, 0),
    author: teacher,
    group: group,
  });
  await session1.save();
  const session2 = new Session({
    title: 'Как писать код красиво',
    timeFrom: new Date(2023, 11, 1, 6, 30, 0),
    timeTo: new Date(2023, 11, 1, 9, 0, 0),
    author: teacher,
    group: group,
  });
  await session2.save();
  console.log('sessions are created');

  const attendance1 = new Attending({
    session: session1,
    user: user1,
    joined_at: new Date(2023, 9, 22, 18, 30, 10),
  });
  await attendance1.save();
  const attendance2 = new Attending({
    session: session1,
    user: user2,
    joined_at: new Date(2023, 9, 22, 18, 35, 21),
  });
  await attendance2.save();
  console.log('attendances are created');
};

export default seed;
