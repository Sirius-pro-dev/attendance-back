import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById
} from '../../controllers/roleController';  // Adjust the import path based on your project structure
import Role from '../../models/role';

jest.mock('../../models/role', () => ({
  __esModule: true,
  default: {
    constructor: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
  }
}));

describe('Role API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('createRole', () => {
  //   it('should create a new role', async () => {
  //     const roleData = { name: 'John Doe', email: 'john@example.com' };

  //     const result = await createRole(roleData);
  
  //     expect(Role).toHaveBeenCalledWith(roleData);  // Ensure Role was called with correct data
  //     // expect(result.data).toEqual(roleData);
  //   });
  // });

  describe('getAllRoles', () => {
    it('should get all roles', async () => {
      await getAllRoles();

      expect(Role.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
    });
  });

  describe('getRoleById', () => {
    it('should get a role by ID', async () => {
      const roleId = 'someRoleId';

      await getRoleById(roleId);

      expect(Role.findById).toHaveBeenCalledWith(roleId, { _id: 0, __v: 0 });
    });
  });

  describe('updateRoleById', () => {
    it('should update a role by ID', async () => {
      const roleId = 'someRoleId';
      const updatedData = { /* Updated data */ };

      await updateRoleById(roleId, updatedData);

      expect(Role.findByIdAndUpdate).toHaveBeenCalledWith(roleId, updatedData, { new: true });
    });
  });

  describe('deleteRoleById', () => {
    it('should delete a role by ID', async () => {
      const roleId = 'someRoleId';

      await deleteRoleById(roleId);

      expect(Role.findByIdAndRemove).toHaveBeenCalledWith(roleId);
    });
  });
});
