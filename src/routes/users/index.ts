import { getAllUsers } from '../../controllers/userController';
import Group from '../../models/group'
import Role from '../../models/role'

export default async function (fastify) {
  fastify.get('/', async (request, reply) => {
    const users = await getAllUsers();
    let users_data = [];
    for (const user of users) {
      const groups = await Group.find({ users: user._id });
      const roles = await Role.find({ users: user._id });

      users_data.push({
        initials: [user.lastname, user.firstname, user.middlename].join(' '),
        group: groups[0] ? groups[0].name : '',
        role: roles[0] ? roles[0].title : ''
      });
    }
    reply.status(200).send(users_data);
  });
}
