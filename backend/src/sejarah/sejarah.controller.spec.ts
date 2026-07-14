/* eslint-disable ts/no-unsafe-assignment */
import type { sejarahModel } from '@/generated/prisma/client';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateSejarahDto } from './dto/create-sejarah.dto';
import { UpdateSejarahDto } from './dto/update-sejarah.dto';
import { SejarahController } from './sejarah.controller';
import { SejarahService } from './sejarah.service';

jest.mock('./sejarah.service', () => ({
  SejarahService: jest.fn().mockImplementation(() => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  })),
}));

jest.mock('@/auth/jwt-auth.guard', () => ({
  JwtAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true),
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

describe('SejarahController', () => {
  let controller: SejarahController;
  let sejarahService: jest.Mocked<SejarahService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SejarahController],
      providers: [SejarahService],
    }).compile();

    controller = module.get<SejarahController>(SejarahController);
    sejarahService = module.get<SejarahService>(SejarahService) as jest.Mocked<SejarahService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new sejarah', async () => {
      const createSejarahDto = createMockCreateSejarahDto();
      const expected = createMockSejarah(createSejarahDto);

      (sejarahService.create as jest.Mock).mockResolvedValue(expected);

      const result = await controller.create(createSejarahDto);

      expect(result).toEqual(expected);
      expect(sejarahService.create).toHaveBeenCalledWith(createSejarahDto);
      expect(sejarahService.create).toHaveBeenCalledTimes(1);
    });

    it('should create with different data', async () => {
      const dto = createMockCreateSejarahDto({
        title: 'Different Title',
        description: 'Different description',
      });
      const expected = createMockSejarah(dto);

      (sejarahService.create as jest.Mock).mockResolvedValue(expected);

      const result = await controller.create(dto);

      expect(result.title).toBe('Different Title');
      expect(result.description).toBe('Different description');
    });
  });

  describe('findAll', () => {
    it('should return an array of sejarah', async () => {
      const mockList: sejarahModel[] = [
        createMockSejarah({ id: 1, title: 'Sejarah 1' }),
        createMockSejarah({ id: 2, title: 'Sejarah 2' }),
        createMockSejarah({ id: 3, title: 'Sejarah 3' }),
      ];

      (sejarahService.findAll as jest.Mock).mockResolvedValue(mockList);

      const result = await controller.findAll();

      expect(result).toEqual(mockList);
      expect(result).toHaveLength(3);
      expect(sejarahService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no sejarah exist', async () => {
      (sejarahService.findAll as jest.Mock).mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return a single sejarah by id', async () => {
      const expected = createMockSejarah({ id: 1 });

      (sejarahService.findOne as jest.Mock).mockResolvedValue(expected);

      const result = await controller.findOne('1');

      expect(result).toEqual(expected);
      expect(sejarahService.findOne).toHaveBeenCalledWith(1);
    });

    it('should convert string id to number', async () => {
      const expected = createMockSejarah({ id: 5 });

      (sejarahService.findOne as jest.Mock).mockResolvedValue(expected);

      await controller.findOne('5');

      expect(sejarahService.findOne).toHaveBeenCalledWith(5);
    });

    it('should throw NotFoundException when not found', async () => {
      (sejarahService.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException('Sejarah tidak ditemukan'),
      );

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a sejarah', async () => {
      const updateDto = createMockUpdateSejarahDto();
      const expected = createMockSejarah({ id: 1, ...updateDto });

      (sejarahService.update as jest.Mock).mockResolvedValue(expected);

      const result = await controller.update('1', updateDto);

      expect(result).toEqual(expected);
      expect(sejarahService.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('should update with partial data', async () => {
      const partial: UpdateSejarahDto = { title: 'Just Title' };
      const expected = createMockSejarah({ id: 1, title: 'Just Title' });

      (sejarahService.update as jest.Mock).mockResolvedValue(expected);

      const result = await controller.update('1', partial);

      expect(result.title).toBe('Just Title');
      expect(sejarahService.update).toHaveBeenCalledWith(1, partial);
    });

    it('should throw NotFoundException when updating non-existent', async () => {
      (sejarahService.update as jest.Mock).mockRejectedValue(
        new NotFoundException('Sejarah tidak ditemukan'),
      );

      await expect(controller.update('999', createMockUpdateSejarahDto())).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a sejarah', async () => {
      const expected = createMockSejarah({ id: 1 });

      (sejarahService.remove as jest.Mock).mockResolvedValue(expected);

      const result = await controller.remove('1');

      expect(result).toEqual(expected);
      expect(sejarahService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when deleting non-existent', async () => {
      (sejarahService.remove as jest.Mock).mockRejectedValue(
        new NotFoundException('Sejarah tidak ditemukan'),
      );

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });

    it('should convert string id to number', async () => {
      const expected = createMockSejarah({ id: 7 });

      (sejarahService.remove as jest.Mock).mockResolvedValue(expected);

      await controller.remove('7');

      expect(sejarahService.remove).toHaveBeenCalledWith(7);
    });
  });
});
