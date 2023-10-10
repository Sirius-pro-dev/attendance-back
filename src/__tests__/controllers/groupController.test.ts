import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById
} from '../../controllers/groupController';
import Group from '../../models/group';

jest.mock('../../models/group', () => ({
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

      expect(Group.find).toHaveBeenCalled();
    });
  });

  describe('getGroupById', () => {
    it('should get a group by ID', async () => {
      const groupId = 'someGroupId';

      await getGroupById(groupId);

      expect(Group.find).toHaveBeenCalled();
    });
  });

  describe('updateGroupById', () => {
    it('should update a group by ID', async () => {
      const groupId = 'someGroupId';
      const updatedData = {
        /* Updated data */
      };

      await updateGroupById(groupId, updatedData);

      expect(Group.findOne).toHaveBeenCalled();
    });
  });

  describe('deleteGroupById', () => {
    it('should delete a group by ID', async () => {
      const groupId = 'someGroupId';

      await deleteGroupById(groupId);

      expect(Group.findOne).toHaveBeenCalled();
    });
  });
});
