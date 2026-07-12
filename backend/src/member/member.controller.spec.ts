import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateMemberDto, MemberRole } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

// Mock the MemberService to avoid importing Prisma
jest.mock('./member.service', () => ({
  MemberService: jest.fn().mockImplementation(() => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  })),
}));

// Mock JwtAuthGuard to always pass
jest.mock('@/auth/jwt-auth.guard', () => ({
  JwtAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true),
  })),
}));

function createMockMember(overrides = {}) {
  return {
    id: 1,
    name: 'John Doe',
    role: MemberRole.ANGGOTA,
    message: 'Hello, I want to join',
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

function createMockCreateMemberDto(overrides = {}) {
  return {
    name: 'John Doe',
    role: MemberRole.ANGGOTA,
    message: 'Hello, I want to join',
    ...overrides,
  };
}

function createMockUpdateMemberDto(overrides = {}) {
  return {
    name: 'Jane Doe',
    role: MemberRole.KETUA,
    message: 'Updated message',
    ...overrides,
  };
}

describe('MemberController', () => {
  let controller: MemberController;
  let memberService: MemberService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService],
    }).compile();

    controller = module.get<MemberController>(MemberController);
    memberService = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new member', async () => {
      const createMemberDto: CreateMemberDto = createMockCreateMemberDto();
      const expectedResult = createMockMember(createMemberDto);

      jest.spyOn(memberService, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createMemberDto);

      expect(result).toEqual(expectedResult);
      expect(memberService.create).toHaveBeenCalledWith(createMemberDto);
      expect(memberService.create).toHaveBeenCalledTimes(1);
    });

    it('should create member with different data', async () => {
      const createMemberDto: CreateMemberDto = createMockCreateMemberDto({
        name: 'Alice Smith',
        role: MemberRole.KETUA,
        message: 'Admin application',
      });
      const expectedResult = createMockMember(createMemberDto);

      jest.spyOn(memberService, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createMemberDto);

      expect(result.name).toBe('Alice Smith');
      expect(result.role).toBe(MemberRole.KETUA);
      expect(result.message).toBe('Admin application');
    });
  });

  describe('findAll', () => {
    it('should return an array of members', async () => {
      const mockMembers = [
        createMockMember({ id: 1, name: 'Member 1' }),
        createMockMember({ id: 2, name: 'Member 2' }),
        createMockMember({ id: 3, name: 'Member 3' }),
      ];

      jest.spyOn(memberService, 'findAll').mockResolvedValue(mockMembers);

      const result = await controller.findAll();

      expect(result).toEqual(mockMembers);
      expect(result).toHaveLength(3);
      expect(memberService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no members exist', async () => {
      jest.spyOn(memberService, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
      expect(memberService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single member by id', async () => {
      const memberId = '1';
      const expectedMember = createMockMember({ id: 1 });

      jest.spyOn(memberService, 'findOne').mockResolvedValue(expectedMember);

      const result = await controller.findOne(memberId);

      expect(result).toEqual(expectedMember);
      expect(memberService.findOne).toHaveBeenCalledWith(1);
      expect(memberService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should convert string id to number', async () => {
      const memberId = '5';
      const expectedMember = createMockMember({ id: 5 });

      jest.spyOn(memberService, 'findOne').mockResolvedValue(expectedMember);

      await controller.findOne(memberId);

      expect(memberService.findOne).toHaveBeenCalledWith(5);
    });

    it('should throw NotFoundException when member is not found', async () => {
      const memberId = '999';

      jest
        .spyOn(memberService, 'findOne')
        .mockRejectedValue(new NotFoundException('Member tidak ditemukan'));

      await expect(controller.findOne(memberId)).rejects.toThrow(NotFoundException);
      await expect(controller.findOne(memberId)).rejects.toThrow('Member tidak ditemukan');
    });
  });

  describe('update', () => {
    it('should update a member', async () => {
      const memberId = '1';
      const updateMemberDto: UpdateMemberDto = createMockUpdateMemberDto();
      const expectedResult = createMockMember({ id: 1, ...updateMemberDto });

      jest.spyOn(memberService, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(memberId, updateMemberDto);

      expect(result).toEqual(expectedResult);
      expect(memberService.update).toHaveBeenCalledWith(1, updateMemberDto);
      expect(memberService.update).toHaveBeenCalledTimes(1);
    });

    it('should update with partial data', async () => {
      const memberId = '1';
      const partialUpdate: UpdateMemberDto = { name: 'Updated Name' };
      const expectedResult = createMockMember({ id: 1, name: 'Updated Name' });

      jest.spyOn(memberService, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(memberId, partialUpdate);

      expect(result.name).toBe('Updated Name');
      expect(memberService.update).toHaveBeenCalledWith(1, partialUpdate);
    });

    it('should throw NotFoundException when updating non-existent member', async () => {
      const memberId = '999';
      const updateMemberDto: UpdateMemberDto = createMockUpdateMemberDto();

      jest
        .spyOn(memberService, 'update')
        .mockRejectedValue(new NotFoundException('Member tidak ditemukan'));

      await expect(controller.update(memberId, updateMemberDto)).rejects.toThrow(NotFoundException);
    });

    it('should handle string to number conversion for id', async () => {
      const memberId = '10';
      const updateMemberDto: UpdateMemberDto = createMockUpdateMemberDto();
      const expectedResult = createMockMember({ id: 10, ...updateMemberDto });

      jest.spyOn(memberService, 'update').mockResolvedValue(expectedResult);

      await controller.update(memberId, updateMemberDto);

      expect(memberService.update).toHaveBeenCalledWith(10, updateMemberDto);
    });
  });

  describe('remove', () => {
    it('should delete a member', async () => {
      const memberId = '1';
      const expectedResult = createMockMember({ id: 1 });

      jest.spyOn(memberService, 'remove').mockResolvedValue(expectedResult);

      const result = await controller.remove(memberId);

      expect(result).toEqual(expectedResult);
      expect(memberService.remove).toHaveBeenCalledWith(1);
      expect(memberService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent member', async () => {
      const memberId = '999';

      jest
        .spyOn(memberService, 'remove')
        .mockRejectedValue(new NotFoundException('Member tidak ditemukan'));

      await expect(controller.remove(memberId)).rejects.toThrow(NotFoundException);
      await expect(controller.remove(memberId)).rejects.toThrow('Member tidak ditemukan');
    });

    it('should handle string to number conversion for id', async () => {
      const memberId = '7';
      const expectedResult = createMockMember({ id: 7 });

      jest.spyOn(memberService, 'remove').mockResolvedValue(expectedResult);

      await controller.remove(memberId);

      expect(memberService.remove).toHaveBeenCalledWith(7);
    });
  });
});
