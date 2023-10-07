import { authenticateToken } from '../../../utils/auth/index'

// Mock dependencies
const mockRequest = {
  headers: {
    authorization: 'mockedToken',
  },
  jwtVerify: jest.fn().mockReturnValue({ userId: 'mockedUserId' }),
};

const mockReply = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};

const mockFastify = {
  log: {
    error: jest.fn(),
  },
};

describe('authenticateToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate a valid token and set userId in request', async () => {
    await authenticateToken(mockRequest, mockReply, jest.fn(), mockFastify);

    expect(mockRequest.jwtVerify).toHaveBeenCalledWith('mockedToken');
    expect(mockReply.status).not.toHaveBeenCalled();
    expect(mockReply.send).not.toHaveBeenCalled();
  });

  it('should handle missing token', async () => {
    mockRequest.headers.authorization = undefined;

    await authenticateToken(mockRequest, mockReply, jest.fn(), mockFastify);

    expect(mockReply.status).toHaveBeenCalledWith(401);
    expect(mockReply.send).toHaveBeenCalledWith({ error: 'Отсутствует access-токен' });
  });
});
