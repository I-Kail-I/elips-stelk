import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Member } from '@/generated/prisma/client';
import { MemberRole } from '@/generated/prisma/enums';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberService } from './member.service';

jest.mock('@/common/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    member: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

function createMockMember(overrides: Partial<Member> = {}): Member {
  return {
    id: 1,
    name: 'John Doe',
    role: MemberRole.anggota,
    message: 'Hello, I want to join',
    image: [],
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

function createMockCreateMemberDto(overrides: Partial<CreateMemberDto> = {}): CreateMemberDto {
  return {
    name: 'John Doe',
    role: MemberRole.anggota,
    message: 'Hello, I want to join',
    image: [],
    ...overrides,
  };
}

function createMockUpdateMemberDto(overrides: Partial<UpdateMemberDto> = {}): UpdateMemberDto {
  return {
    name: 'Jane Doe',
    role: MemberRole.ketua,
    message: 'Updated message',
    image: [],
    ...overrides,
  };
}

describe('MemberService', () => {
  let service: MemberService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberService, PrismaService],
    }).compile();

    service = module.get<MemberService>(MemberService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new member without images', async () => {
      const createMemberDto = createMockCreateMemberDto();
      const mockCreatedMember = createMockMember(createMemberDto);

      jest.spyOn(prisma.member, 'create').mockResolvedValue(mockCreatedMember);

      const result = await service.create(createMemberDto);

      expect(result).toEqual(mockCreatedMember);
      expect(prisma.member.create).toHaveBeenCalledWith({
        data: { ...createMemberDto, image: [] },
      });
    });

    it('should create member with images', async () => {
      const createMemberDto = createMockCreateMemberDto({
        image: ['path/to/image1.jpg', 'path/to/image2.jpg'],
      });

      const mockCreatedMember = createMockMember(createMemberDto);

      jest.spyOn(prisma.member, 'create').mockResolvedValue(mockCreatedMember);

      const result = await service.create(createMemberDto);

      expect(result.image).toEqual(['path/to/image1.jpg', 'path/to/image2.jpg']);
      expect(result.image).toHaveLength(2);
      expect(prisma.member.create).toHaveBeenCalledWith({
        // eslint-disable-next-line ts/no-unsafe-assignment
        data: expect.objectContaining({
          image: ['path/to/image1.jpg', 'path/to/image2.jpg'],
        }),
      });
    });

    it('should handle empty image array', async () => {
      const createMemberDto = createMockCreateMemberDto({ image: [] });
      const mockCreatedMember = createMockMember(createMemberDto);

      jest.spyOn(prisma.member, 'create').mockResolvedValue(mockCreatedMember);

      const result = await service.create(createMemberDto);

      expect(result.image).toEqual([]);
    });

    it('should create member with all provided fields', async () => {
      const createMemberDto = createMockCreateMemberDto({
        name: 'Alice Smith',
        role: MemberRole.ketua,
        message: 'I want to be an admin',
        image: ['admin-photo.jpg'],
      });

      const mockCreatedMember = createMockMember(createMemberDto);

      jest.spyOn(prisma.member, 'create').mockResolvedValue(mockCreatedMember);

      const result = await service.create(createMemberDto);

      expect(result.name).toBe('Alice Smith');
      expect(result.role).toBe(MemberRole.ketua);
      expect(result.message).toBe('I want to be an admin');
      expect(result.image).toEqual(['admin-photo.jpg']);
    });
  });

  describe('findAll', () => {
    it('should return an array of members', async () => {
      const mockMembers: Member[] = [
        createMockMember({ id: 1, name: 'Member 1', image: ['img1.jpg'] }),
        createMockMember({ id: 2, name: 'Member 2', image: ['img2.jpg'] }),
        createMockMember({ id: 3, name: 'Member 3', image: [] }),
      ];

      jest.spyOn(prisma.member, 'findMany').mockResolvedValue(mockMembers);

      const result = await service.findAll();

      expect(result).toEqual(mockMembers);
      expect(result).toHaveLength(3);
      expect(result[0].image).toEqual(['img1.jpg']);
      expect(result[2].image).toEqual([]);
      expect(prisma.member.findMany).toHaveBeenCalled();
    });

    it('should return an empty array when no members exist', async () => {
      const emptyMembers: Member[] = [];
      jest.spyOn(prisma.member, 'findMany').mockResolvedValue(emptyMembers);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return a member when found', async () => {
      const member = createMockMember({ id: 1, image: ['test.jpg'] });
      (prisma.member.findFirst as jest.Mock).mockResolvedValue(member);

      const result = await service.findOne(1);

      expect(result).toEqual(member);
      expect(result.image).toEqual(['test.jpg']);
      expect(prisma.member.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when member is not found', async () => {
      (prisma.member.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow('Member tidak ditemukan');
    });

    it('should find member with specific id', async () => {
      const member = createMockMember({ id: 5, name: 'Specific Member' });
      (prisma.member.findFirst as jest.Mock).mockResolvedValue(member);

      const result = await service.findOne(5);

      expect(result.id).toBe(5);
      expect(result.name).toBe('Specific Member');
    });
  });

  describe('update', () => {
    it('should update and return the member without changing images', async () => {
      const existingMember = createMockMember({ id: 1, image: ['original.jpg'] });
      const updateMemberDto = createMockUpdateMemberDto();
      const updatedMember = createMockMember({
        id: 1,
        ...updateMemberDto,
        image: ['original.jpg'],
      });

      (prisma.member.findFirst as jest.Mock).mockResolvedValue(existingMember);
      jest.spyOn(prisma.member, 'update').mockResolvedValue(updatedMember);

      const result = await service.update(1, updateMemberDto);

      expect(result).toEqual(updatedMember);
      expect(prisma.member.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateMemberDto,
      });
    });

    it('should update member images', async () => {
      const existingMember = createMockMember({ id: 1, image: ['old.jpg'] });
      const updateMemberDto = createMockUpdateMemberDto({
        image: ['new1.jpg', 'new2.jpg'],
      });
      const updatedMember = createMockMember({
        id: 1,
        ...updateMemberDto,
        image: ['new1.jpg', 'new2.jpg'],
      });

      (prisma.member.findFirst as jest.Mock).mockResolvedValue(existingMember);
      jest.spyOn(prisma.member, 'update').mockResolvedValue(updatedMember);

      const result = await service.update(1, updateMemberDto);

      expect(result.image).toEqual(['new1.jpg', 'new2.jpg']);
      expect(prisma.member.update).toHaveBeenCalledWith({
        where: { id: 1 },
        // eslint-disable-next-line ts/no-unsafe-assignment
        data: expect.objectContaining({
          image: ['new1.jpg', 'new2.jpg'],
        }),
      });
    });

    it('should throw NotFoundException when updating non-existent member', async () => {
      const updateMemberDto = createMockUpdateMemberDto();
      (prisma.member.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.update(999, updateMemberDto)).rejects.toThrow(NotFoundException);
      expect(prisma.member.update).not.toHaveBeenCalled();
    });

    it('should update only provided fields', async () => {
      const existingMember = createMockMember({ id: 1, image: ['keep.jpg'] });
      const partialUpdate: Partial<UpdateMemberDto> = { name: 'Updated Name' };
      const updatedMember = createMockMember({
        id: 1,
        name: 'Updated Name',
        image: ['keep.jpg'],
      });

      (prisma.member.findFirst as jest.Mock).mockResolvedValue(existingMember);
      jest.spyOn(prisma.member, 'update').mockResolvedValue(updatedMember);

      const result = await service.update(1, partialUpdate);

      expect(result.name).toBe('Updated Name');
      expect(result.image).toEqual(['keep.jpg']);
      expect(prisma.member.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: partialUpdate,
      });
    });
  });

  describe('remove', () => {
    it('should delete and return the member', async () => {
      const member = createMockMember({ id: 1, image: ['to-delete.jpg'] });

      (prisma.member.findFirst as jest.Mock).mockResolvedValue(member);
      jest.spyOn(prisma.member, 'delete').mockResolvedValue(member);

      const result = await service.remove(1);

      expect(result).toEqual(member);
      expect(result.image).toEqual(['to-delete.jpg']);
      expect(prisma.member.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when deleting non-existent member', async () => {
      (prisma.member.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prisma.member.delete).not.toHaveBeenCalled();
    });

    it('should delete the correct member by id', async () => {
      const member = createMockMember({ id: 2, name: 'Member to delete' });

      (prisma.member.findFirst as jest.Mock).mockResolvedValue(member);
      jest.spyOn(prisma.member, 'delete').mockResolvedValue(member);

      const result = await service.remove(2);

      expect(result.id).toBe(2);
      expect(result.name).toBe('Member to delete');
      expect(prisma.member.delete).toHaveBeenCalledWith({
        where: { id: 2 },
      });
    });
  });
});
