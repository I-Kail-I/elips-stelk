import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { comparePassword, hashPassword } from '@/lib/bcrypt';
import { PrismaService } from '../common/prisma/prisma.service';
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

jest.mock('@/lib/bcrypt', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed-password'),
  comparePassword: jest.fn(),
}));

const mockJwtService = {
  sign: jest.fn().mockReturnValue('jwt-token'),
};

function createMockUser(overrides = {}) {
  return {
    id: '1',
    email: 'test@example.com',
    password: 'hashed',
    first_name: 'John',
    last_name: 'Doe',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

describe('AuthService', () => {
  let service: AuthService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, { provide: JwtService, useValue: mockJwtService }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the user when found', async () => {
      const user = createMockUser();
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

      const result = await service.findOne('test@example.com');
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne('missing@example.com')).rejects.toThrow(NotFoundException);
    });
  });

  describe('register', () => {
    const dto = {
      email: 'test@example.com',
      password: '123456',
      first_name: 'John',
      last_name: 'Doe',
    };

    it('should create a user with hashed password and return user + token', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const mockCreatedUser = createMockUser({
        email: dto.email,
        first_name: dto.first_name,
        last_name: dto.last_name,
      });

      jest.spyOn(prisma.user, 'create').mockResolvedValue(mockCreatedUser);

      const result = await service.register(dto);

      expect(result).toEqual({ user: mockCreatedUser, token: 'jwt-token' });
      expect(hashPassword).toHaveBeenCalledWith(dto.password);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: '1',
        email: 'test@example.com',
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      const existingUser = createMockUser({ email: dto.email });
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

      await expect(service.register(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    const loginDto = { email: 'test@example.com', password: '123456' };

    it('should return user without password and token on valid credentials', async () => {
      const user = createMockUser();

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      (comparePassword as jest.Mock).mockResolvedValue(true);

      const result = await service.login(loginDto);

      const { password, ...userWithoutPassword } = user;
      expect(result).toEqual({ user: userWithoutPassword, token: 'jwt-token' });
      expect(comparePassword).toHaveBeenCalledWith('123456', 'hashed');
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: '1',
        email: 'test@example.com',
      });
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      const user = createMockUser();

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      (comparePassword as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException when email is not registered', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete and return the user', async () => {
      const user = createMockUser();

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      const deleteSpy = jest.spyOn(prisma.user, 'delete').mockResolvedValue(user);

      const result = await service.remove('test@example.com');

      expect(result).toEqual(user);
      expect(deleteSpy).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.remove('missing@example.com')).rejects.toThrow(NotFoundException);
    });
  });
});
