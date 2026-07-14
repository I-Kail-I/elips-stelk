/* eslint-disable ts/no-unsafe-assignment, ts/no-unsafe-argument */
import type { sejarahModel } from '@/generated/prisma/models';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateSejarahDto } from './dto/create-sejarah.dto';
import { UpdateSejarahDto } from './dto/update-sejarah.dto';
import { SejarahService } from './sejarah.service';

jest.mock('@/common/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    sejarah: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

function createMockSejarah(overrides: Partial<sejarahModel> = {}): sejarahModel {
  return {
    id: 1,
    title: 'Sejarah Desa',
    description: 'Deskripsi sejarah desa',
    created_at: new Date(),
    updated_at: null,
    ...overrides,
  };
}

function createMockCreateSejarahDto(overrides: Partial<CreateSejarahDto> = {}): CreateSejarahDto {
  return {
    title: 'Sejarah Desa',
    description: 'Deskripsi sejarah desa',
    ...overrides,
  };
}

function createMockUpdateSejarahDto(overrides: Partial<UpdateSejarahDto> = {}): UpdateSejarahDto {
  return {
    title: 'Updated Title',
    description: 'Updated description',
    ...overrides,
  };
}

describe('SejarahService', () => {
  let service: SejarahService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [SejarahService, PrismaService],
    }).compile();

    service = module.get<SejarahService>(SejarahService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new sejarah', async () => {
      const createSejarahDto = createMockCreateSejarahDto();
      const mockCreated = createMockSejarah(createSejarahDto);

      jest.spyOn(prisma.sejarah, 'create').mockResolvedValue(mockCreated);

      const result = await service.create(createSejarahDto);

      expect(result).toEqual(mockCreated);
      expect(prisma.sejarah.create).toHaveBeenCalledWith({
        data: createSejarahDto,
      });
    });

    it('should create with different title and description', async () => {
      const createSejarahDto = createMockCreateSejarahDto({
        title: 'Sejarah Baru',
        description: 'Deskripsi baru',
      });
      const mockCreated = createMockSejarah(createSejarahDto);

      jest.spyOn(prisma.sejarah, 'create').mockResolvedValue(mockCreated);

      const result = await service.create(createSejarahDto);

      expect(result.title).toBe('Sejarah Baru');
      expect(result.description).toBe('Deskripsi baru');
    });
  });

  describe('findAll', () => {
    it('should return an array of sejarah', async () => {
      const mockSejarah: sejarahModel[] = [
        createMockSejarah({ id: 1, title: 'Sejarah 1' }),
        createMockSejarah({ id: 2, title: 'Sejarah 2' }),
      ];

      jest.spyOn(prisma.sejarah, 'findMany').mockResolvedValue(mockSejarah);

      const result = await service.findAll();

      expect(result).toEqual(mockSejarah);
      expect(result).toHaveLength(2);
      expect(prisma.sejarah.findMany).toHaveBeenCalled();
    });

    it('should return an empty array when no sejarah exist', async () => {
      jest.spyOn(prisma.sejarah, 'findMany').mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return a sejarah when found', async () => {
      const mockSejarah = createMockSejarah({ id: 1 });
      (prisma.sejarah.findFirst as jest.Mock).mockResolvedValue(mockSejarah);

      const result = await service.findOne(1);

      expect(result).toEqual(mockSejarah);
      expect(prisma.sejarah.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when sejarah is not found', async () => {
      (prisma.sejarah.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow('Sejarah tidak ditemukan');
    });
  });

  describe('update', () => {
    it('should update and return the sejarah', async () => {
      const existing = createMockSejarah({ id: 1 });
      const updateDto = createMockUpdateSejarahDto();
      const updated = createMockSejarah({ id: 1, ...updateDto });

      (prisma.sejarah.findFirst as jest.Mock).mockResolvedValue(existing);
      jest.spyOn(prisma.sejarah, 'update').mockResolvedValue(updated);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(updated);
      expect(prisma.sejarah.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
    });

    it('should throw NotFoundException when updating non-existent', async () => {
      (prisma.sejarah.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.update(999, createMockUpdateSejarahDto())).rejects.toThrow(NotFoundException);
      expect(prisma.sejarah.update).not.toHaveBeenCalled();
    });

    it('should update only provided fields', async () => {
      const existing = createMockSejarah({ id: 1 });
      const partial: UpdateSejarahDto = { title: 'Only Title Updated' };
      const updated = createMockSejarah({ id: 1, title: 'Only Title Updated' });

      (prisma.sejarah.findFirst as jest.Mock).mockResolvedValue(existing);
      jest.spyOn(prisma.sejarah, 'update').mockResolvedValue(updated);

      const result = await service.update(1, partial);

      expect(result.title).toBe('Only Title Updated');
      expect(result.description).toBe('Deskripsi sejarah desa');
      expect(prisma.sejarah.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: partial,
      });
    });
  });

  describe('remove', () => {
    it('should delete and return the sejarah', async () => {
      const mockSejarah = createMockSejarah({ id: 1 });

      (prisma.sejarah.findFirst as jest.Mock).mockResolvedValue(mockSejarah);
      jest.spyOn(prisma.sejarah, 'delete').mockResolvedValue(mockSejarah);

      const result = await service.remove(1);

      expect(result).toEqual(mockSejarah);
      expect(prisma.sejarah.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when deleting non-existent', async () => {
      (prisma.sejarah.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prisma.sejarah.delete).not.toHaveBeenCalled();
    });
  });
});
