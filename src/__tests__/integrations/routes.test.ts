import request from 'supertest';
import app from '../../server';
import User from '../../models/user'
import Attending from '../../models/attending'
import Group from '../../models/group'
import Session from '../../models/session'
import Role from '../../models/session'
import { log } from 'console';

describe('Test routes', () => {
  describe('GET /users', () => {
    it('correct', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/users'
      });

      expect(response.statusCode).toBe(200);
    })
  })

  describe('GET /user/:id', () => {
    it('correct', async () => {
      const id = (await User.findOne()).userId;
      const response = await app.inject({
        method: 'GET',
        url: `/user/${id}`
      });

      expect(response.statusCode).toBe(200);
    })
  })

  describe('POST /user/:id', () => {
    it('correct', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/user',
        body: {
          firstname: 'Test',
          lastname: 'Test',
          middlename: 'Test',
          password: 'testtesttest',
          email: 'testtest'
        }
      });

      expect(response.statusCode).toBe(201);
    })
  })

  describe('PUT /user/:id', () => {
    it('correct', async () => {
      const id = (await User.findOne()).userId;
      const response = await app.inject({
        method: 'PUT',
        url: `/user/${id}`,
        body: {
          firstname: 'Test',
          lastname: 'Test',
          middlename: 'Test',
          password: 'testtesttest',
          email: 'testtesttest'
        }
      });
      expect(response.statusCode).toBe(200);
    })
  })

  describe('DELETE /user/:id', () => {
    it('correct', async () => {
      const id = (await User.findOne()).userId;
      const response = await app.inject({
        method: 'DELETE',
        url: `/user/${id}`
      });

      expect(response.statusCode).toBe(200);
    })
  })



  describe('GET /attendings', () => {
    it('correct', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/attendings'
      });

      expect(response.statusCode).toBe(200);
    })
  })

  describe('GET /attending/:id', () => {
    it('correct', async () => {
      const id = (await Attending.findOne()).attendingId;
      const response = await app.inject({
        method: 'GET',
        url: `/attending/${id}`
      });

      expect(response.statusCode).toBe(200);
    })
  })

  describe('POST /attending/:id', () => {
    it('correct', async () => {
      const sessionId = (await Session.findOne()).sessionId;
      const userId = (await User.findOne()).userId;
      const response = await app.inject({
        method: 'POST',
        url: '/attending',
        body: {
          sessionId: sessionId,
          userId: userId,
          joined_at: new Date(2023, 9, 22, 18, 30, 10)
        }
      });
      expect(response.statusCode).toBe(201);
    })
  })

  describe('PUT /attending/:id', () => {
    it('correct', async () => {
      const attending = (await Attending.findOne());
      const sessionId = (await Session.findOne()).sessionId;
      const userId = (await User.findOne()).userId;
      const userId2 = (await User.findOne()).userId;

      const response = await app.inject({
        method: 'PUT',
        url: `/attending/${attending.attendingId}`,
        body: {
          sessionId: sessionId,
          userId: null,
          joined_at: new Date(2023, 9, 22, 18, 30, 10)
        }
      });
      expect(response.statusCode).toBe(200);
    })
  })

  describe('DELETE /attending/:id', () => {
    it('correct', async () => {
      const id = (await Attending.findOne()).attendingId;
      const response = await app.inject({
        method: 'DELETE',
        url: `/attending/${id}`
      });

      expect(response.statusCode).toBe(200);
    })
  })



  describe('GET /groups', () => {
    it('correct', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/groups'
      });

      expect(response.statusCode).toBe(200);
    })
  })

  describe('GET /group/:id', () => {
    it('correct', async () => {
      const id = (await Group.findOne()).groupId;
      const response = await app.inject({
        method: 'GET',
        url: `/group/${id}`
      });

      expect(response.statusCode).toBe(200);
    })
  })

  describe('POST /group/:id', () => {
    it('correct', async () => {
      const userId = (await User.findOne()).userId;
      const response = await app.inject({
        method: 'POST',
        url: '/group',
        body: {
          name: 'Л0711-21/2',
          userIds: [userId]
        }
      });
      expect(response.statusCode).toBe(201);
    })
  })

  describe('PUT /group/:id', () => {
    it('correct', async () => {
      const group = (await Group.findOne());
      const userId = (await User.findOne()).userId;
      const response = await app.inject({
        method: 'PUT',
        url: `/group/${group.groupId}`,
        body: {
          name: `af`,
          usersIds: [userId]
        }
      });
      expect(response.statusCode).toBe(200);
    })
  })

  describe('DELETE /group/:id', () => {
    it('correct', async () => {
      const id = (await Group.findOne()).groupId;
      const response = await app.inject({
        method: 'DELETE',
        url: `/group/${id}`
      });

      expect(response.statusCode).toBe(200);
    })
  })



  describe('GET /sessions', () => {
    it('correct', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/sessions'
      });

      expect(response.statusCode).toBe(200);
    })
  })

  describe('GET /session/:id', () => {
    it('correct', async () => {
      const id = (await Session.findOne()).sessionId;
      const response = await app.inject({
        method: 'GET',
        url: `/session/${id}`
      });

      expect(response.statusCode).toBe(200);
    })
  })

  describe('POST /session/:id', () => {
    it('correct', async () => {
      const authorId = (await User.findOne()).userId;
      const groupId = (await Group.findOne()).groupId;
      const response = await app.inject({
        method: 'POST',
        url: '/session',
        body: {
          title: 'JS разработка',
          timeFrom: new Date(2023, 9, 22, 18, 30, 0),
          timeTo: new Date(2023, 9, 22, 20, 0, 0),
          authorId: authorId,
          groupId: groupId
        }
      });
      expect(response.statusCode).toBe(201);
    })
  })

  describe('PUT /session/:id', () => {
    it('correct', async () => {
      const id = (await Session.findOne()).sessionId;
      const authorId = (await User.findOne()).userId;
      const groupId = (await Group.findOne()).groupId;
      const response = await app.inject({
        method: 'PUT',
        url: `/session/${id}`,
        body: {
          title: 'JS разработка',
          timeFrom: new Date(2023, 9, 22, 18, 30, 0),
          timeTo: new Date(2023, 9, 22, 20, 0, 0),
          authorId: authorId,
          groupId: groupId
        }
      });
      expect(response.statusCode).toBe(200);
    })
  })

  describe('DELETE /session/:id', () => {
    it('correct', async () => {
      const id = (await Session.findOne()).sessionId;
      const response = await app.inject({
        method: 'DELETE',
        url: `/session/${id}`
      });

      expect(response.statusCode).toBe(200);
    })
  })



  describe('POST /register', () => {
    it('correct', async () => {
      const user = await User.findOne({ email: 'testtest2' });
      if (user) { await User.findByIdAndRemove(user._id); }

      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        body: {
          email: 'testtest2',
          lastname: 'lastname',
          firstname: 'firstname',
          middlename: 'middlename',
          password: 'qwerty123'
        }
      });

      expect(response.statusCode).toBe(200);
    })
  })

  describe('POST /login', () => {
    it('correct', async () => {
      if (!await User.findOne({ email: 'artur' })) {
        const user1 = new User({
          firstname: 'Артур',
          lastname: 'Амантаев',
          middlename: 'Махмудович',
          password: 'qwerty',
          email: 'artur'
        });
        await user1.save();
      }
      const response = await app.inject({
        method: 'POST',
        url: '/auth/login',
        body: {
          email: 'artur',
          password: 'qwerty'
        }
      });

      expect(response.statusCode).toBe(200);
    })
  })
})
