import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } from '../../controllers/userController';
import User from '../../models/user';

jest.mock('../../models/user', () => ({
  __esModule: true,
  default: {
    constructor: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn()
  }
}));

describe('User API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('createUser', () => {
  //   it('should create a new user', async () => {
  //     const userData = { name: 'John Doe', email: 'john@example.com' };

  //     const result = await createUser(userData);

  //     expect(User).toHaveBeenCalledWith(userData);  // Ensure User was called with correct data
  //     // expect(result.data).toEqual(userData);
  //   });
  // });

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      await getAllUsers();

      expect(User.find).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      const userId = 'someUserId';

      await getUserById(userId);

      expect(User.find).toHaveBeenCalled();
    });
  });

  describe('updateUserById', () => {
    it('should update a user by ID', async () => {
      const userId = 'someUserId';
      const updatedData = {
        /* Updated data */
      };

      await updateUserById(userId, updatedData);

      expect(User.findOne).toHaveBeenCalled();
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by ID', async () => {
      const userId = 'someUserId';

      await deleteUserById(userId);

      expect(User.findOne).toHaveBeenCalled();
    });
  });
});
