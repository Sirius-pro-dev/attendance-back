import Group from '../models/group';
import User from '../models/user';
import Meeting from '../models/meeting';
import Attending from '../models/attending';
import Role from '../models/role';

const seed = async fastify => {
  const users = await User.find({ firstname: 'Артур' });
  if (users.length === 0) {
    const user1 = new User({
      firstname: 'Артур',
      lastname: 'Амантаев',
      middlename: 'Махмудович',
      password: 'qwerty',
      email: 'artur'
    });
    await user1.save();
    const user2 = new User({
      firstname: 'Даниил',
      lastname: 'Усов',
      middlename: 'Андреевич',
      password: 'qwerty1',
      email: 'daniel'
    });
    await user2.save();
    const user3 = new User({
      firstname: 'Сергей',
      lastname: 'Рындин',
      middlename: null,
      password: 'abc123',
      email: 'naziser'
    });
    await user3.save();
    const teacher = new User({
      firstname: 'Валерий',
      lastname: 'Учитель',
      middlename: null,
      password: 'abc123',
      email: 'valerian_floppa'
    });
    await teacher.save();
    fastify.log.info('users are created');

    const student_role = new Role({
      title: 'Студент',
      slug: 'student',
      users: [user1, user2, user3]
    });
    await student_role.save();
    const teacher_role = new Role({
      title: 'Преподаватель',
      slug: 'teacher',
      users: [teacher]
    });
    await teacher_role.save();
    fastify.log.info('roles are created');

    const group = new Group({
      name: 'Л0711-21/1',
      users: [user1, user2, user3]
    });
    await group.save();
    fastify.log.info('groups are created');

    const meeting1 = new Meeting({
      title: 'JS разработка',
      timeFrom: new Date(2023, 9, 22, 18, 30, 0),
      timeTo: new Date(2023, 9, 22, 20, 0, 0),
      teachers: teacher,
      groups: [group]
    });
    await meeting1.save();
    const meeting2 = new Meeting({
      title: 'Как писать код красиво',
      timeFrom: new Date(2023, 11, 1, 6, 30, 0),
      timeTo: new Date(2023, 11, 1, 9, 0, 0),
      teachers: teacher,
      groups: [group]
    });
    await meeting2.save();
    fastify.log.info('meetings are created');

    const attendance1 = new Attending({
      meeting: meeting1,
      user: user1,
      joined_at: new Date(2023, 9, 22, 18, 30, 10)
    });
    await attendance1.save();
    const attendance2 = new Attending({
      meeting: meeting1,
      user: user2,
      joined_at: new Date(2023, 9, 22, 18, 35, 21)
    });
    await attendance2.save();
    fastify.log.info('attendances are created');
  }
};

export default seed;
