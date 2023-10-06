import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById
} from '../../controllers/groupController';  // Adjust the import path based on your project structure
import Group from '../../models/group';

jest.mock('../../models/group', () => ({
  __esModule: true,
  default: {
    constructor: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
  }
}));

describe('Group API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('createGroup', () => {
  //   it('should create a new group', async () => {
  //     const groupData = { name: 'John Doe', email: 'john@example.com' };

  //     const result = await createGroup(groupData);
  
  //     expect(Group).toHaveBeenCalledWith(groupData);  // Ensure Group was called with correct data
  //     // expect(result.data).toEqual(groupData);
  //   });
  // });

  describe('getAllGroups', () => {
    it('should get all groups', async () => {
      await getAllGroups();

      expect(Group.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
    });
  });

  describe('getGroupById', () => {
    it('should get a group by ID', async () => {
      const groupId = 'someGroupId';

      await getGroupById(groupId);

      expect(Group.findById).toHaveBeenCalledWith(groupId, { _id: 0, __v: 0 });
    });
  });

  describe('updateGroupById', () => {
    it('should update a group by ID', async () => {
      const groupId = 'someGroupId';
      const updatedData = { /* Updated data */ };

      await updateGroupById(groupId, updatedData);

      expect(Group.findByIdAndUpdate).toHaveBeenCalledWith(groupId, updatedData, { new: true });
    });
  });

  describe('deleteGroupById', () => {
    it('should delete a group by ID', async () => {
      const groupId = 'someGroupId';

      await deleteGroupById(groupId);

      expect(Group.findByIdAndRemove).toHaveBeenCalledWith(groupId);
    });
  });
});
