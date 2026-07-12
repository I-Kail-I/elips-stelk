import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { Response } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

jest.mock('@/common/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

function mockResponse() {
  const res: Partial<Response> = {};
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res as Response;
}

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should set a cookie and return user without token', async () => {
      const dto = {
        email: 'test@example.com',
        password: '123456',
        first_name: 'John',
        last_name: 'Doe',
      };
      const res = mockResponse();
      mockAuthService.register.mockResolvedValue({ user: { email: dto.email, first_name: dto.first_name, last_name: dto.last_name }, token: 'jwt-token' });

      const result = await controller.register(dto, res);

      expect(result).toEqual({ user: { email: dto.email, first_name: dto.first_name, last_name: dto.last_name } });
      expect(res.cookie).toHaveBeenCalledWith('access_token', 'jwt-token', expect.any(Object));
    });
  });

  describe('login', () => {
    it('should set a cookie and return user without token', async () => {
      const loginDto = { email: 'test@example.com', password: '123456' };
      const res = mockResponse();
      mockAuthService.login.mockResolvedValue({ user: { email: 'test@example.com' }, token: 'jwt-token' });

      const result = await controller.login(loginDto, res);

      expect(result).toEqual({ user: { email: 'test@example.com' } });
      expect(res.cookie).toHaveBeenCalledWith('access_token', 'jwt-token', expect.any(Object));
    });
  });

  describe('logout', () => {
    it('should clear the cookie', async () => {
      const res = mockResponse();

      const result = await controller.logout(res);

      expect(result).toEqual({ message: 'Logged out successfully' });
      expect(res.clearCookie).toHaveBeenCalledWith('access_token', { path: '/' });
    });
  });

  describe('remove', () => {
    it('should call authService.remove with the email', async () => {
      const user = {
        email: 'test@example.com',
        password: 'hashed',
        first_name: 'John',
        last_name: 'Doe',
      };
      mockAuthService.remove.mockResolvedValue(user);

      const result = await controller.remove('test@example.com');

      expect(result).toEqual(user);
      expect(mockAuthService.remove).toHaveBeenCalledWith('test@example.com');
    });

    it('should throw when authService.remove throws', async () => {
      mockAuthService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('missing@example.com')).rejects.toThrow(NotFoundException);
    });
  });
});
