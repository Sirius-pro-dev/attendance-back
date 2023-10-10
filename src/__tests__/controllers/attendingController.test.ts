import {
  createAttending,
  getAllAttendings,
  getAttendingById,
  updateAttendingById,
  deleteAttendingById
} from '../../controllers/attendingController'; 
import Attending from '../../models/attending';

jest.mock('../../models/attending', () => ({
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

describe('Attending API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('createAttending', () => {
  //   it('should create a new attending', async () => {
  //     const attendingData = { name: 'John Doe', email: 'john@example.com' };

  //     const result = await createAttending(attendingData);

  //     expect(Attending).toHaveBeenCalledWith(attendingData);  // Ensure Attending was called with correct data
  //     // expect(result.data).toEqual(attendingData);
  //   });
  // });

  describe('getAllAttendings', () => {
    it('should get all attendings', async () => {
      await getAllAttendings();

      expect(Attending.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
    });
  });

  describe('getAttendingById', () => {
    it('should get a attending by ID', async () => {
      const attendingId = 'someAttendingId';

      await getAttendingById(attendingId);

      expect(Attending.find).toHaveBeenCalled();
    });
  });

  describe('updateAttendingById', () => {
    it('should update a attending by ID', async () => {
      const attendingId = 'someAttendingId';
      const updatedData = {
      };

      await updateAttendingById(attendingId, updatedData);

      expect(Attending.findOne).toHaveBeenCalled();
    });
  });

  describe('deleteAttendingById', () => {
    it('should delete a attending by ID', async () => {
      const attendingId = 'someAttendingId';

      await deleteAttendingById(attendingId);

      expect(Attending.findOne).toHaveBeenCalled();
    });
  });
});
