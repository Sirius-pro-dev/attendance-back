import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} from '../../controllers/userController';  // Adjust the import path based on your project structure
import User from '../../models/user';

jest.mock('../../models/user', () => ({
  __esModule: true,
  default: {
    constructor: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
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

      expect(User.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
    });
  });

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      const userId = 'someUserId';

      await getUserById(userId);

      expect(User.findById).toHaveBeenCalledWith(userId, { _id: 0, __v: 0 });
    });
  });

  describe('updateUserById', () => {
    it('should update a user by ID', async () => {
      const userId = 'someUserId';
      const updatedData = { /* Updated data */ };

      await updateUserById(userId, updatedData);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, updatedData, { new: true });
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by ID', async () => {
      const userId = 'someUserId';

      await deleteUserById(userId);

      expect(User.findByIdAndRemove).toHaveBeenCalledWith(userId);
    });
  });
});
