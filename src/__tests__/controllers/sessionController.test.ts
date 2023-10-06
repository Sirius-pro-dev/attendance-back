import {
  createSession,
  getAllSessions,
  getSessionById,
  updateSessionById,
  deleteSessionById
} from '../../controllers/sessionController';  // Adjust the import path based on your project structure
import Session from '../../models/session';

jest.mock('../../models/session', () => ({
  __esModule: true,
  default: {
    constructor: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
  }
}));

describe('Session API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('createSession', () => {
  //   it('should create a new session', async () => {
  //     const sessionData = { name: 'John Doe', email: 'john@example.com' };

  //     const result = await createSession(sessionData);
  
  //     expect(Session).toHaveBeenCalledWith(sessionData);  // Ensure Session was called with correct data
  //     // expect(result.data).toEqual(sessionData);
  //   });
  // });

  describe('getAllSessions', () => {
    it('should get all sessions', async () => {
      await getAllSessions();

      expect(Session.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
    });
  });

  describe('getSessionById', () => {
    it('should get a session by ID', async () => {
      const sessionId = 'someSessionId';

      await getSessionById(sessionId);

      expect(Session.findById).toHaveBeenCalledWith(sessionId, { _id: 0, __v: 0 });
    });
  });

  describe('updateSessionById', () => {
    it('should update a session by ID', async () => {
      const sessionId = 'someSessionId';
      const updatedData = { /* Updated data */ };

      await updateSessionById(sessionId, updatedData);

      expect(Session.findByIdAndUpdate).toHaveBeenCalledWith(sessionId, updatedData, { new: true });
    });
  });

  describe('deleteSessionById', () => {
    it('should delete a session by ID', async () => {
      const sessionId = 'someSessionId';

      await deleteSessionById(sessionId);

      expect(Session.findByIdAndRemove).toHaveBeenCalledWith(sessionId);
    });
  });
});
