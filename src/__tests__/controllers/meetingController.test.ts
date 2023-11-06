import {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeetingById,
  deleteMeetingById
} from '../../controllers/meetingController';
import Meeting from '../../models/meeting';

jest.mock('../../models/meeting', () => ({
  __esModule: true,
  default: {
    constructor: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findByIdAndRemove: jest.fn()
  }
}));

describe('Meeting API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('createMeeting', () => {
  //   it('should create a new meeting', async () => {
  //     const meetingData = { name: 'John Doe', email: 'john@example.com' };

  //     const result = await createMeeting(meetingData);

  //     expect(Meeting).toHaveBeenCalledWith(meetingData);  // Ensure Meeting was called with correct data
  //     // expect(result.data).toEqual(meetingData);
  //   });
  // });

  describe('getAllMeetings', () => {
    it('should get all meetings', async () => {
      await getAllMeetings();

      expect(Meeting.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
    });
  });

  describe('getMeetingById', () => {
    it('should get a meeting by ID', async () => {
      const meetingId = 'someMeetingId';

      await getMeetingById(meetingId);

      expect(Meeting.findOne).toHaveBeenCalled();
    });
  });

  describe('updateMeetingById', () => {
    it('should update a meeting by ID', async () => {
      const meetingId = 'someMeetingId';
      const updatedData = {
        /* Updated data */
      };

      await updateMeetingById(meetingId, updatedData);

      expect(Meeting.findOne).toHaveBeenCalled();
    });
  });

  describe('deleteMeetingById', () => {
    it('should delete a meeting by ID', async () => {
      const meetingId = 'someMeetingId';

      await deleteMeetingById(meetingId);

      expect(Meeting.findOne).toHaveBeenCalled();
    });
  });
});
