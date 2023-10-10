import request from 'supertest';
import app from '../../server';
import User from '../../models/user';
import Attending from '../../models/attending';
import Group from '../../models/group';
import Meeting from '../../models/meeting';
import { getAllUsers } from '../../controllers/userController';

describe('Test routes', () => {
  describe('healthcheck', () => {
    describe('GET /healthcheck', () => {
      it('correct', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/healthcheck'
        });

        expect(response.statusCode).toBe(200);
      });
    });
  });
  describe('QR', () => {
    describe('GET /meeting/QRCode', () => {
      it('correct', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/meeting/QRCode',
          headers: {
            url: 'http://testurl:testport/'
          }
        });

        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('users', () => {
    describe('GET /users', () => {
      it('correct', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/users'
        });

        expect(response.statusCode).toBe(200);
      });
    });

    describe('GET /user/:id', () => {
      it('correct', async () => {
        const id = (await User.findOne()).userId;
        const response = await app.inject({
          method: 'GET',
          url: `/user/${id}`
        });

        expect(response.statusCode).toBe(200);
      });

      it('404', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/user/1'
        });

        expect(response.statusCode).toBe(404);
      });
    });

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
      });

      it('400 error', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/user',
          body: {
            firstname: '',
            lastname: '',
            middlename: '',
            password: '',
            email: ''
          }
        });

        expect(response.statusCode).toBe(400);
      });
    });

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
      });

      it('400 error', async () => {
        const id = (await User.findOne()).userId;
        const response = await app.inject({
          method: 'PUT',
          url: `/user/${id}`,
          body: {
            firstname: '',
            lastname: '',
            middlename: '',
            password: '',
            email: ''
          }
        });
        expect(response.statusCode).toBe(400);
      });
    });

    describe('DELETE /user/:id', () => {
      it('correct', async () => {
        const id = (await User.findOne()).userId;
        const response = await app.inject({
          method: 'DELETE',
          url: `/user/${id}`
        });

        expect(response.statusCode).toBe(200);
      });

      it('404 error', async () => {
        const response = await app.inject({
          method: 'DELETE',
          url: '/user/1'
        });

        expect(response.statusCode).toBe(404);
      });
    });
  });

  describe('attending', () => {
    describe('GET /attendings', () => {
      it('correct', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/attendings'
        });

        expect(response.statusCode).toBe(200);
      });
    });

    describe('GET /attending/:id', () => {
      it('correct', async () => {
        const id = (await Attending.findOne()).attendingId;
        const response = await app.inject({
          method: 'GET',
          url: `/attending/${id}`
        });

        expect(response.statusCode).toBe(200);
      });

      it('404 error', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/attending/1'
        });

        expect(response.statusCode).toBe(404);
      });
    });

    describe('POST /attending/:id', () => {
      it('correct', async () => {
        const meetingId = (await Meeting.findOne()).meetingId;
        const userId = (await User.findOne()).userId;
        const response = await app.inject({
          method: 'POST',
          url: '/attending',
          body: {
            meetingId: meetingId,
            userId: userId,
            joined_at: new Date(2023, 9, 22, 18, 30, 10)
          }
        });
        expect(response.statusCode).toBe(201);
      });

      it('400 error', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/attending',
          body: {
            meetingId: null,
            userId: null,
            joined_at: null
          }
        });
        expect(response.statusCode).toBe(400);
      });
    });

    describe('PUT /attending/:id', () => {
      it('correct', async () => {
        const attending = await Attending.findOne();
        const meetingId = (await Meeting.findOne()).meetingId;

        const response = await app.inject({
          method: 'PUT',
          url: `/attending/${attending.attendingId}`,
          body: {
            meetingId: meetingId,
            userId: null,
            joined_at: new Date(2023, 9, 22, 18, 30, 10)
          }
        });
        expect(response.statusCode).toBe(200);
      });

      it('400 error', async () => {
        const attending = await Attending.findOne();

        const response = await app.inject({
          method: 'PUT',
          url: `/attending/${attending.attendingId}`,
          body: {
            meetingId: null,
            userId: null,
            joined_at: null
          }
        });
        expect(response.statusCode).toBe(400);
      });
    });

    describe('DELETE /attending/:id', () => {
      it('correct', async () => {
        const id = (await Attending.findOne()).attendingId;
        const response = await app.inject({
          method: 'DELETE',
          url: `/attending/${id}`
        });

        expect(response.statusCode).toBe(200);
      });

      it('404 error', async () => {
        const response = await app.inject({
          method: 'DELETE',
          url: '/attending/1'
        });

        expect(response.statusCode).toBe(404);
      });
    });
  });

  describe('group', () => {
    describe('GET /groups', () => {
      it('correct', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/groups'
        });

        expect(response.statusCode).toBe(200);
      });
    });

    describe('GET /group/:id', () => {
      it('correct', async () => {
        const id = (await Group.findOne()).groupId;
        const response = await app.inject({
          method: 'GET',
          url: `/group/${id}`
        });

        expect(response.statusCode).toBe(200);
      });

      it('404 error', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/group/1'
        });

        expect(response.statusCode).toBe(404);
      });
    });

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
      });

      it('400 error', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/group',
          body: {
            name: null,
            userIds: null
          }
        });
        expect(response.statusCode).toBe(400);
      });
    });

    describe('PUT /group/:id', () => {
      it('correct', async () => {
        const group = await Group.findOne();
        const userId = (await User.findOne()).userId;
        const response = await app.inject({
          method: 'PUT',
          url: `/group/${group.groupId}`,
          body: {
            name: 'af',
            usersIds: [userId]
          }
        });
        expect(response.statusCode).toBe(200);
      });

      it('400 error', async () => {
        const group = await Group.findOne();
        const response = await app.inject({
          method: 'PUT',
          url: `/group/${group.groupId}`,
          body: {
            name: null,
            usersIds: null
          }
        });
        expect(response.statusCode).toBe(400);
      });
    });

    describe('DELETE /group/:id', () => {
      it('correct', async () => {
        const id = (await Group.findOne()).groupId;
        const response = await app.inject({
          method: 'DELETE',
          url: `/group/${id}`
        });

        expect(response.statusCode).toBe(200);
      });

      it('404 error', async () => {
        const response = await app.inject({
          method: 'DELETE',
          url: '/group/1'
        });

        expect(response.statusCode).toBe(404);
      });
    });
  });

  describe('meeting', () => {
    describe('GET /meetings', () => {
      it('correct', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/meetings'
        });

        expect(response.statusCode).toBe(200);
      });
    });

    describe('GET /meeting/:id', () => {
      it('correct', async () => {
        const id = (await Meeting.findOne()).meetingId;
        const response = await app.inject({
          method: 'GET',
          url: `/meeting/${id}`
        });

        expect(response.statusCode).toBe(200);
      });

      it('404 error', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/meeting/1'
        });

        expect(response.statusCode).toBe(404);
      });
    });
    describe('healthcheck', () => {
      describe('GET /healthcheck', () => {
        it('correct', async () => {
          const response = await app.inject({
            method: 'GET',
            url: '/healthcheck'
          });

          expect(response.statusCode).toBe(200);
        });
      });
    });

    describe('POST /meeting/:id', () => {
      it('correct', async () => {
        const authorId = (await User.findOne()).userId;
        const groupId = (await Group.findOne()).groupId;
        const response = await app.inject({
          method: 'POST',
          url: '/meeting',
          body: {
            title: 'JS разработка',
            timeFrom: new Date(2023, 9, 22, 18, 30, 0),
            timeTo: new Date(2023, 9, 22, 20, 0, 0),
            authorId: authorId,
            groupId: groupId
          }
        });
        expect(response.statusCode).toBe(201);
      });

      it('400 error', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/meeting',
          body: {
            title: null,
            timeFrom: null,
            timeTo: null,
            authorId: null,
            groupId: null
          }
        });
        expect(response.statusCode).toBe(400);
      });
    });

    describe('PUT /meeting/:id', () => {
      it('correct', async () => {
        const id = (await Meeting.findOne()).meetingId;
        const authorId = (await User.findOne()).userId;
        const groupId = (await Group.findOne()).groupId;
        const response = await app.inject({
          method: 'PUT',
          url: `/meeting/${id}`,
          body: {
            title: 'JS разработка',
            timeFrom: new Date(2023, 9, 22, 18, 30, 0),
            timeTo: new Date(2023, 9, 22, 20, 0, 0),
            authorId: authorId,
            groupId: groupId
          }
        });
        expect(response.statusCode).toBe(200);
      });

      it('400 error', async () => {
        const id = (await Meeting.findOne()).meetingId;
        const response = await app.inject({
          method: 'PUT',
          url: `/meeting/${id}`,
          body: {
            title: null,
            timeFrom: null,
            timeTo: null,
            authorId: null,
            groupId: null
          }
        });
        expect(response.statusCode).toBe(400);
      });
    });

    describe('DELETE /meeting/:id', () => {
      it('correct', async () => {
        const id = (await Meeting.findOne()).meetingId;
        const response = await app.inject({
          method: 'DELETE',
          url: `/meeting/${id}`
        });

        expect(response.statusCode).toBe(200);
      });

      it('404 error', async () => {
        const response = await app.inject({
          method: 'DELETE',
          url: '/meeting/1'
        });

        expect(response.statusCode).toBe(404);
      });
    });
  });

  describe('auth', () => {
    describe('POST /auth/register', () => {
      it('correct', async () => {
        const user = await User.findOne({ email: 'testtest2' });
        if (user) {
          await User.findByIdAndRemove(user._id);
        }

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
      });

      it('500 error', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/auth/register',
          body: {
            email: null,
            lastname: null,
            firstname: null,
            middlename: null,
            password: null
          }
        });

        expect(response.statusCode).toBe(500);
      });
    });

    describe('POST /login', () => {
      it('correct', async () => {
        if (!(await User.findOne({ email: 'artur' }))) {
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
      });

      it('correct', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/auth/login',
          body: {
            email: null,
            password: null
          }
        });

        expect(response.statusCode).toBe(401);
      });
    });
  });
});
