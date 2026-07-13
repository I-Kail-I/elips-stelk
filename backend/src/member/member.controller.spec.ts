import type { Member } from '@/generated/prisma/client';
import { Buffer } from 'node:buffer';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MemberRole } from '@/generated/prisma/enums';
import { CreateMemberDto } from './dto/create-member.dto';
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

function createMockFile(filename: string): Express.Multer.File {
  return {
    fieldname: 'images',
    originalname: filename,
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: './uploads_folder',
    filename: `images-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`,
    path: `uploads_folder/images-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`,
    size: 1024,
    buffer: Buffer.from('test'),
    // eslint-disable-next-line ts/no-unsafe-assignment
    stream: null as any,
  };
}

describe('MemberController', () => {
  let controller: MemberController;
  let memberService: jest.Mocked<MemberService>;

  beforeAll(() => {
    process.env.BACKEND_URL = 'http://localhost:3000';
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService],
    }).compile();

    controller = module.get<MemberController>(MemberController);
    memberService = module.get<MemberService>(MemberService) as jest.Mocked<MemberService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new member without files', async () => {
      const createMemberDto: CreateMemberDto = createMockCreateMemberDto();
      const expectedResult: Member = createMockMember(createMemberDto);

      (memberService.create as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.create(createMemberDto);

      expect(result).toEqual(expectedResult);
      expect(memberService.create).toHaveBeenCalledWith(createMemberDto);
      expect(memberService.create).toHaveBeenCalledTimes(1);
    });

    it('should create a new member with files', async () => {
      const createMemberDto: CreateMemberDto = createMockCreateMemberDto();
      const mockFiles: Express.Multer.File[] = [
        createMockFile('test1.jpg'),
        createMockFile('test2.jpg'),
      ];

      const expectedMember: Member = createMockMember({
        ...createMemberDto,
        image: mockFiles.map((file) => `http://localhost:3000/api/uploads/${file.filename}`),
      });

      (memberService.create as jest.Mock).mockResolvedValue(expectedMember);

      const result = await controller.create(createMemberDto, mockFiles);

      expect(result.image).toEqual(
        mockFiles.map((file) => `http://localhost:3000/api/uploads/${file.filename}`),
      );
      expect(result.image).toHaveLength(2);
    });

    it('should handle single file upload', async () => {
      const createMemberDto: CreateMemberDto = createMockCreateMemberDto();
      const mockFiles: Express.Multer.File[] = [createMockFile('single.jpg')];

      const expectedMember: Member = createMockMember({
        ...createMemberDto,
        image: [`http://localhost:3000/api/uploads/${mockFiles[0].filename}`],
      });

      (memberService.create as jest.Mock).mockResolvedValue(expectedMember);

      const result = await controller.create(createMemberDto, mockFiles);

      expect(result.image).toHaveLength(1);
    });

    it('should handle empty files array', async () => {
      const createMemberDto: CreateMemberDto = createMockCreateMemberDto({
        image: [],
      });
      const expectedResult: Member = createMockMember(createMemberDto);

      (memberService.create as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.create(createMemberDto, []);

      expect(result.image).toEqual([]);
    });

    it('should handle undefined files', async () => {
      const createMemberDto: CreateMemberDto = createMockCreateMemberDto({
        image: [],
      });
      const expectedResult: Member = createMockMember(createMemberDto);

      (memberService.create as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.create(createMemberDto);

      expect(result.image).toEqual([]);
    });

    it('should create member with different data', async () => {
      const createMemberDto: CreateMemberDto = createMockCreateMemberDto({
        name: 'Alice Smith',
        role: MemberRole.ketua,
        message: 'Admin application',
      });
      const expectedResult: Member = createMockMember(createMemberDto);

      (memberService.create as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.create(createMemberDto);

      expect(result.name).toBe('Alice Smith');
      expect(result.role).toBe(MemberRole.ketua);
      expect(result.message).toBe('Admin application');
    });

    it('should handle various file types', async () => {
      const createMemberDto: CreateMemberDto = createMockCreateMemberDto();
      const mockFiles: Express.Multer.File[] = [
        createMockFile('test.png'),
        createMockFile('test.gif'),
        createMockFile('test.webp'),
      ];

      const expectedMember: Member = createMockMember({
        ...createMemberDto,
        image: mockFiles.map((file) => `http://localhost:3000/api/uploads/${file.filename}`),
      });

      (memberService.create as jest.Mock).mockResolvedValue(expectedMember);

      const result = await controller.create(createMemberDto, mockFiles);

      expect(result.image).toHaveLength(3);
    });
  });

  describe('findAll', () => {
    it('should return an array of members', async () => {
      const mockMembers: Member[] = [
        createMockMember({ id: 1, name: 'Member 1' }),
        createMockMember({ id: 2, name: 'Member 2' }),
        createMockMember({ id: 3, name: 'Member 3' }),
      ];

      (memberService.findAll as jest.Mock).mockResolvedValue(mockMembers);

      const result = await controller.findAll();

      expect(result).toEqual(mockMembers);
      expect(result).toHaveLength(3);
      expect(memberService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no members exist', async () => {
      const emptyMembers: Member[] = [];
      (memberService.findAll as jest.Mock).mockResolvedValue(emptyMembers);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
      expect(memberService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return members with image arrays', async () => {
      const mockMembers: Member[] = [
        createMockMember({
          id: 1,
          name: 'Member 1',
          image: ['path/to/image1.jpg', 'path/to/image2.jpg'],
        }),
        createMockMember({
          id: 2,
          name: 'Member 2',
          image: ['path/to/image3.jpg'],
        }),
      ];

      (memberService.findAll as jest.Mock).mockResolvedValue(mockMembers);

      const result = await controller.findAll();

      expect(result[0].image).toHaveLength(2);
      expect(result[1].image).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('should return a single member by id', async () => {
      const memberId = '1';
      const expectedMember: Member = createMockMember({ id: 1 });

      (memberService.findOne as jest.Mock).mockResolvedValue(expectedMember);

      const result = await controller.findOne(memberId);

      expect(result).toEqual(expectedMember);
      expect(memberService.findOne).toHaveBeenCalledWith(1);
      expect(memberService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should convert string id to number', async () => {
      const memberId = '5';
      const expectedMember: Member = createMockMember({ id: 5 });

      (memberService.findOne as jest.Mock).mockResolvedValue(expectedMember);

      await controller.findOne(memberId);

      expect(memberService.findOne).toHaveBeenCalledWith(5);
    });

    it('should throw NotFoundException when member is not found', async () => {
      const memberId = '999';

      (memberService.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException('Member tidak ditemukan'),
      );

      await expect(controller.findOne(memberId)).rejects.toThrow(NotFoundException);
      await expect(controller.findOne(memberId)).rejects.toThrow('Member tidak ditemukan');
    });
  });

  describe('update', () => {
    it('should update a member without files', async () => {
      const memberId = '1';
      const updateMemberDto: UpdateMemberDto = createMockUpdateMemberDto();
      const expectedResult: Member = createMockMember({ id: 1, ...updateMemberDto });

      (memberService.update as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.update(memberId, updateMemberDto);

      expect(result).toEqual(expectedResult);
      expect(memberService.update).toHaveBeenCalledWith(1, updateMemberDto);
      expect(memberService.update).toHaveBeenCalledTimes(1);
    });

    it('should update a member with new files', async () => {
      const memberId = '1';
      const updateMemberDto: UpdateMemberDto = createMockUpdateMemberDto();
      const mockFiles: Express.Multer.File[] = [
        createMockFile('updated1.jpg'),
        createMockFile('updated2.jpg'),
      ];

      const expectedResult: Member = createMockMember({
        id: 1,
        ...updateMemberDto,
        image: mockFiles.map((file) => `http://localhost:3000/api/uploads/${file.filename}`),
      });

      (memberService.update as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.update(memberId, updateMemberDto, mockFiles);

      expect(result.image).toEqual(
        mockFiles.map((file) => `http://localhost:3000/api/uploads/${file.filename}`),
      );
      expect(memberService.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          image: mockFiles.map((file) => `http://localhost:3000/api/uploads/${file.filename}`),
        }),
      );
    });

    it('should update with partial data', async () => {
      const memberId = '1';
      const partialUpdate: UpdateMemberDto = { name: 'Updated Name' };
      const expectedResult: Member = createMockMember({ id: 1, name: 'Updated Name' });

      (memberService.update as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.update(memberId, partialUpdate);

      expect(result.name).toBe('Updated Name');
      expect(memberService.update).toHaveBeenCalledWith(1, partialUpdate);
    });

    it('should throw NotFoundException when updating non-existent member', async () => {
      const memberId = '999';
      const updateMemberDto: UpdateMemberDto = createMockUpdateMemberDto();

      (memberService.update as jest.Mock).mockRejectedValue(
        new NotFoundException('Member tidak ditemukan'),
      );

      await expect(controller.update(memberId, updateMemberDto)).rejects.toThrow(NotFoundException);
    });

    it('should handle string to number conversion for id', async () => {
      const memberId = '10';
      const updateMemberDto: UpdateMemberDto = createMockUpdateMemberDto();
      const expectedResult: Member = createMockMember({ id: 10, ...updateMemberDto });

      (memberService.update as jest.Mock).mockResolvedValue(expectedResult);

      await controller.update(memberId, updateMemberDto);

      expect(memberService.update).toHaveBeenCalledWith(10, updateMemberDto);
    });
  });

  describe('remove', () => {
    it('should delete a member', async () => {
      const memberId = '1';
      const expectedResult: Member = createMockMember({ id: 1 });

      (memberService.remove as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.remove(memberId);

      expect(result).toEqual(expectedResult);
      expect(memberService.remove).toHaveBeenCalledWith(1);
      expect(memberService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent member', async () => {
      const memberId = '999';

      (memberService.remove as jest.Mock).mockRejectedValue(
        new NotFoundException('Member tidak ditemukan'),
      );

      await expect(controller.remove(memberId)).rejects.toThrow(NotFoundException);
      await expect(controller.remove(memberId)).rejects.toThrow('Member tidak ditemukan');
    });

    it('should handle string to number conversion for id', async () => {
      const memberId = '7';
      const expectedResult: Member = createMockMember({ id: 7 });

      (memberService.remove as jest.Mock).mockResolvedValue(expectedResult);

      await controller.remove(memberId);

      expect(memberService.remove).toHaveBeenCalledWith(7);
    });
  });
});
