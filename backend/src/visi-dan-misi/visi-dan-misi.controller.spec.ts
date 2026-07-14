import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateVisiDanMisiDto } from './dto/create-visi-dan-misi.dto';
import { ResponseVisiDanMisiDto } from './dto/response-visi-dan-misi.dto';
import { UpdateVisiDanMisiDto } from './dto/update-visi-dan-misi.dto';
import { VisiDanMisiController } from './visi-dan-misi.controller';
import { VisiDanMisiService } from './visi-dan-misi.service';

jest.mock('./visi-dan-misi.service', () => ({
  VisiDanMisiService: jest.fn().mockImplementation(() => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findActive: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  })),
}));

jest.mock('@/auth/jwt-auth.guard', () => ({
  JwtAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true),
  })),
}));

function createMockResponse(
  overrides: Partial<ResponseVisiDanMisiDto> = {},
): ResponseVisiDanMisiDto {
  return {
    visi: 'Menjadi organisasi terbaik',
    misi: 'Melaksanakan program kerja',
    is_active: true,
    tahun_mulai: 2024,
    tahun_akhir: 2028,
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

function createMockCreateDto(overrides: Partial<CreateVisiDanMisiDto> = {}): CreateVisiDanMisiDto {
  return {
    visi: 'Menjadi organisasi terbaik',
    misi: 'Melaksanakan program kerja',
    is_active: true,
    tahun_mulai: 2024,
    tahun_akhir: 2028,
    ...overrides,
  };
}

function createMockUpdateDto(overrides: Partial<UpdateVisiDanMisiDto> = {}): UpdateVisiDanMisiDto {
  return {
    visi: 'Visi yang diperbarui',
    misi: 'Misi yang diperbarui',
    is_active: false,
    tahun_mulai: 2025,
    tahun_akhir: 2029,
    ...overrides,
  };
}

describe('VisiDanMisiController', () => {
  let controller: VisiDanMisiController;
  let visiDanMisiService: jest.Mocked<VisiDanMisiService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisiDanMisiController],
      providers: [VisiDanMisiService],
    }).compile();

    controller = module.get<VisiDanMisiController>(VisiDanMisiController);
    visiDanMisiService = module.get<VisiDanMisiService>(
      VisiDanMisiService,
    ) as jest.Mocked<VisiDanMisiService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new visi dan misi', async () => {
      const createDto: CreateVisiDanMisiDto = createMockCreateDto();
      const expectedResult = createMockResponse(createDto);

      (visiDanMisiService.create as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(visiDanMisiService.create).toHaveBeenCalledWith(createDto);
      expect(visiDanMisiService.create).toHaveBeenCalledTimes(1);
    });

    it('should create with different data', async () => {
      const createDto: CreateVisiDanMisiDto = createMockCreateDto({
        visi: 'Visi berbeda',
        misi: 'Misi berbeda',
        is_active: false,
      });
      const expectedResult = createMockResponse(createDto);

      (visiDanMisiService.create as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(result.visi).toBe('Visi berbeda');
      expect(result.misi).toBe('Misi berbeda');
      expect(result.is_active).toBe(false);
    });
  });

  describe('findAll', () => {
    it('should return an array of visi dan misi', async () => {
      const mockData = [
        createMockResponse({ id: 1, visi: 'Visi 1' }),
        createMockResponse({ id: 2, visi: 'Visi 2' }),
      ];

      (visiDanMisiService.findAll as jest.Mock).mockResolvedValue(mockData);

      const result = await controller.findAll();

      expect(result).toEqual(mockData);
      expect(result).toHaveLength(2);
      expect(visiDanMisiService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no data exists', async () => {
      (visiDanMisiService.findAll as jest.Mock).mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findActive', () => {
    it('should return the active visi dan misi', async () => {
      const expectedResult = createMockResponse({ is_active: true });

      (visiDanMisiService.findActive as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.findActive();

      expect(result).toEqual(expectedResult);
      expect(result.is_active).toBe(true);
      expect(visiDanMisiService.findActive).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when no active record exists', async () => {
      (visiDanMisiService.findActive as jest.Mock).mockRejectedValue(
        new NotFoundException('Visi dan Misi tidak ditemukan'),
      );

      await expect(controller.findActive()).rejects.toThrow(NotFoundException);
      await expect(controller.findActive()).rejects.toThrow('Visi dan Misi tidak ditemukan');
    });
  });

  describe('findOne', () => {
    it('should return a single record by id', async () => {
      const recordId = '1';
      const expectedResult = createMockResponse({ id: 1 });

      (visiDanMisiService.findOne as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.findOne(recordId);

      expect(result).toEqual(expectedResult);
      expect(visiDanMisiService.findOne).toHaveBeenCalledWith(1);
      expect(visiDanMisiService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should convert string id to number', async () => {
      const recordId = '5';
      const expectedResult = createMockResponse({ id: 5 });

      (visiDanMisiService.findOne as jest.Mock).mockResolvedValue(expectedResult);

      await controller.findOne(recordId);

      expect(visiDanMisiService.findOne).toHaveBeenCalledWith(5);
    });

    it('should throw NotFoundException when record is not found', async () => {
      const recordId = '999';

      (visiDanMisiService.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException('Visi dan Misi dengan id: '),
      );

      await expect(controller.findOne(recordId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a record', async () => {
      const recordId = '1';
      const updateDto: UpdateVisiDanMisiDto = createMockUpdateDto();
      const expectedResult = createMockResponse({ id: 1, ...updateDto });

      (visiDanMisiService.update as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.update(recordId, updateDto);

      expect(result).toEqual(expectedResult);
      expect(visiDanMisiService.update).toHaveBeenCalledWith(1, updateDto);
      expect(visiDanMisiService.update).toHaveBeenCalledTimes(1);
    });

    it('should update with partial data', async () => {
      const recordId = '1';
      const partialUpdate: UpdateVisiDanMisiDto = { visi: 'Visi yang diupdate' };
      const expectedResult = createMockResponse({ id: 1, visi: 'Visi yang diupdate' });

      (visiDanMisiService.update as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.update(recordId, partialUpdate);

      expect(result.visi).toBe('Visi yang diupdate');
      expect(visiDanMisiService.update).toHaveBeenCalledWith(1, partialUpdate);
    });

    it('should throw NotFoundException when updating non-existent record', async () => {
      const recordId = '999';
      const updateDto: UpdateVisiDanMisiDto = createMockUpdateDto();

      (visiDanMisiService.update as jest.Mock).mockRejectedValue(
        new NotFoundException('Visi dan Misi dengan id: '),
      );

      await expect(controller.update(recordId, updateDto)).rejects.toThrow(NotFoundException);
    });

    it('should handle string to number conversion for id', async () => {
      const recordId = '10';
      const updateDto: UpdateVisiDanMisiDto = createMockUpdateDto();
      const expectedResult = createMockResponse({ id: 10, ...updateDto });

      (visiDanMisiService.update as jest.Mock).mockResolvedValue(expectedResult);

      await controller.update(recordId, updateDto);

      expect(visiDanMisiService.update).toHaveBeenCalledWith(10, updateDto);
    });
  });

  describe('remove', () => {
    it('should delete a record', async () => {
      const recordId = '1';
      const expectedResult = createMockResponse({ id: 1 });

      (visiDanMisiService.remove as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.remove(recordId);

      expect(result).toEqual(expectedResult);
      expect(visiDanMisiService.remove).toHaveBeenCalledWith(1);
      expect(visiDanMisiService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent record', async () => {
      const recordId = '999';

      (visiDanMisiService.remove as jest.Mock).mockRejectedValue(
        new NotFoundException('Visi dan Misi dengan id: '),
      );

      await expect(controller.remove(recordId)).rejects.toThrow(NotFoundException);
    });

    it('should handle string to number conversion for id', async () => {
      const recordId = '7';
      const expectedResult = createMockResponse({ id: 7 });

      (visiDanMisiService.remove as jest.Mock).mockResolvedValue(expectedResult);

      await controller.remove(recordId);

      expect(visiDanMisiService.remove).toHaveBeenCalledWith(7);
    });
  });
});
