import request from 'supertest';
import { app } from '../../app';
import { AuthService } from '../../services/authServices';

// Mock AuthService
jest.mock('../../services/authServices');
const MockedAuthService = AuthService as jest.MockedClass<typeof AuthService>;

describe('AuthController', () => {
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthService = MockedAuthService.prototype;
  });

  const validCredentials = {
    phone: '0987654321',
    password: 'a12345678'
  };

  const mockUser = {
    id: 1,
    phone: '0987654321',
    name: 'test user',
  };

  const mockToken = 'test.auth.token';

  describe('POST /auth/app/login', () => {
    it('should login successfully for app', async () => {
      // Mock the service response
      mockAuthService.loginApp.mockResolvedValueOnce({
        token: mockToken,
        user: mockUser
      });

      const response = await request(app)
        .post('/auth/app/login')
        .send(validCredentials)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        data: {
          token: mockToken,
          user: mockUser
        }
      });

      expect(mockAuthService.loginApp).toHaveBeenCalledWith(
        validCredentials.phone,
        validCredentials.password
      );
    });

    it('should return 401 for invalid credentials in app login', async () => {
      mockAuthService.loginApp.mockRejectedValueOnce(
        new Error('Invalid credentials')
      );

      const response = await request(app)
        .post('/auth/app/login')
        .send(validCredentials)
        .expect(401);

      expect(response.body).toEqual({
        message: 'Invalid credentials'
      });
    });

    it('should validate request body', async () => {
      const response = await request(app)
        .post('/auth/app/login')
        .send({})
        .expect(500);
    });
  });

  describe('POST /auth/web/login', () => {
    it('should login successfully for web', async () => {
      mockAuthService.loginWeb.mockResolvedValueOnce({
        token: mockToken,
        user: mockUser,
      });

      const response = await request(app)
        .post('/auth/web/login')
        .send(validCredentials)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        data: {
          user: mockUser
        }
      });

      // 驗證 cookie 是否正確設置
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie'][0]).toContain('token=');
      expect(response.headers['set-cookie'][0]).toContain('HttpOnly');
    });

    it('should return 401 for invalid credentials in web login', async () => {
      mockAuthService.loginWeb.mockRejectedValueOnce(
        new Error('Invalid credentials')
      );

      const response = await request(app)
        .post('/auth/web/login')
        .send(validCredentials)
        .expect(401);

      expect(response.body).toEqual({
        message: 'Invalid credentials'
      });
    });
  });

  describe('POST /auth/logout', () => {
    it('should logout successfully', async () => {
      const response = await request(app)
        .post('/auth/logout')
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Logged out successfully'
      });

      // 驗證 cookie 是否被清除
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie'][0]).toContain('token=');
      expect(response.headers['set-cookie'][0]).toContain('Max-Age=0');
    });
  });
});