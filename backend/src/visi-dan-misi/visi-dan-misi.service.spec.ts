import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateVisiDanMisiDto } from './dto/create-visi-dan-misi.dto';
import { ResponseVisiDanMisiDto } from './dto/response-visi-dan-misi.dto';
import { UpdateVisiDanMisiDto } from './dto/update-visi-dan-misi.dto';
import { VisiDanMisiService } from './visi-dan-misi.service';

jest.mock('@/common/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    visi_dan_misi: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

function createMockVisiDanMisi(overrides: Partial<ResponseVisiDanMisiDto> = {}): ResponseVisiDanMisiDto {
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

function createMockCreateVisiDanMisiDto(overrides: Partial<CreateVisiDanMisiDto> = {}): CreateVisiDanMisiDto {
  return {
    visi: 'Menjadi organisasi terbaik',
    misi: 'Melaksanakan program kerja',
    is_active: true,
    tahun_mulai: 2024,
    tahun_akhir: 2028,
    ...overrides,
  };
}

function createMockUpdateVisiDanMisiDto(overrides: Partial<UpdateVisiDanMisiDto> = {}): UpdateVisiDanMisiDto {
  return {
    visi: 'Visi yang diperbarui',
    misi: 'Misi yang diperbarui',
    is_active: false,
    tahun_mulai: 2025,
    tahun_akhir: 2029,
    ...overrides,
  };
}

describe('VisiDanMisiService', () => {
  let service: VisiDanMisiService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [VisiDanMisiService, PrismaService],
    }).compile();

    service = module.get<VisiDanMisiService>(VisiDanMisiService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new visi dan misi', async () => {
      const createDto = createMockCreateVisiDanMisiDto();
      const mockCreated = createMockVisiDanMisi(createDto);

      jest.spyOn(prisma.visi_dan_misi, 'create').mockResolvedValue(mockCreated);

      const result = await service.create(createDto);

      expect(result).toEqual(mockCreated);
      expect(prisma.visi_dan_misi.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });

    it('should create with all provided fields', async () => {
      const createDto = createMockCreateVisiDanMisiDto({
        visi: 'Visi khusus',
        misi: 'Misi khusus',
        tahun_mulai: 2023,
        tahun_akhir: 2027,
        is_active: false,
      });

      const mockCreated = createMockVisiDanMisi(createDto);

      jest.spyOn(prisma.visi_dan_misi, 'create').mockResolvedValue(mockCreated);

      const result = await service.create(createDto);

      expect(result.visi).toBe('Visi khusus');
      expect(result.misi).toBe('Misi khusus');
      expect(result.tahun_mulai).toBe(2023);
      expect(result.tahun_akhir).toBe(2027);
      expect(result.is_active).toBe(false);
    });
  });

  describe('findAll', () => {
    it('should return an array of visi dan misi', async () => {
      const mockData = [
        createMockVisiDanMisi({ id: 1, visi: 'Visi 1' }),
        createMockVisiDanMisi({ id: 2, visi: 'Visi 2' }),
      ];

      jest.spyOn(prisma.visi_dan_misi, 'findMany').mockResolvedValue(mockData);

      const result = await service.findAll();

      expect(result).toEqual(mockData);
      expect(result).toHaveLength(2);
      expect(prisma.visi_dan_misi.findMany).toHaveBeenCalled();
    });

    it('should return an empty array when no data exists', async () => {
      jest.spyOn(prisma.visi_dan_misi, 'findMany').mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return a record when found', async () => {
      const mockRecord = createMockVisiDanMisi({ id: 1 });
      (prisma.visi_dan_misi.findUnique as jest.Mock).mockResolvedValue(mockRecord);

      const result = await service.findOne(1);

      expect(result).toEqual(mockRecord);
      expect(prisma.visi_dan_misi.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when not found', async () => {
      (prisma.visi_dan_misi.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should find record with specific id', async () => {
      const mockRecord = createMockVisiDanMisi({ id: 5, visi: 'Visi Spesifik' });
      (prisma.visi_dan_misi.findUnique as jest.Mock).mockResolvedValue(mockRecord);

      const result = await service.findOne(5);

      expect(result.id).toBe(5);
      expect(result.visi).toBe('Visi Spesifik');
    });
  });

  describe('findActive', () => {
    it('should return the active visi dan misi', async () => {
      const mockRecord = createMockVisiDanMisi({ is_active: true });

      (prisma.visi_dan_misi.findFirst as jest.Mock).mockResolvedValue(mockRecord);

      const result = await service.findActive();

      expect(result).toEqual(mockRecord);
      expect(result.is_active).toBe(true);
      expect(prisma.visi_dan_misi.findFirst).toHaveBeenCalledWith({
        where: { is_active: true },
        orderBy: { created_at: 'desc' },
      });
    });

    it('should throw NotFoundException when no active record exists', async () => {
      (prisma.visi_dan_misi.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.findActive()).rejects.toThrow(NotFoundException);
      await expect(service.findActive()).rejects.toThrow('Visi dan Misi tidak ditemukan');
    });

    it('should return the most recent active record', async () => {
      const latestRecord = createMockVisiDanMisi({
        id: 2,
        is_active: true,
        visi: 'Visi Terbaru',
      });

      (prisma.visi_dan_misi.findFirst as jest.Mock).mockResolvedValue(latestRecord);

      const result = await service.findActive();

      expect(result.id).toBe(2);
      expect(result.visi).toBe('Visi Terbaru');
    });
  });

  describe('update', () => {
    it('should update and return the record', async () => {
      const existingRecord = createMockVisiDanMisi({ id: 1 });
      const updateDto = createMockUpdateVisiDanMisiDto();
      const updatedRecord = createMockVisiDanMisi({ id: 1, ...updateDto });

      (prisma.visi_dan_misi.findUnique as jest.Mock).mockResolvedValue(existingRecord);
      jest.spyOn(prisma.visi_dan_misi, 'update').mockResolvedValue(updatedRecord);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(updatedRecord);
      expect(prisma.visi_dan_misi.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
    });

    it('should throw NotFoundException when updating non-existent record', async () => {
      const updateDto = createMockUpdateVisiDanMisiDto();
      (prisma.visi_dan_misi.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.update(999, updateDto)).rejects.toThrow(NotFoundException);
      expect(prisma.visi_dan_misi.update).not.toHaveBeenCalled();
    });

    it('should update only provided fields', async () => {
      const existingRecord = createMockVisiDanMisi({ id: 1 });
      const partialUpdate = { visi: 'Visi yang diupdate saja' };
      const updatedRecord = createMockVisiDanMisi({ id: 1, visi: 'Visi yang diupdate saja' });

      (prisma.visi_dan_misi.findUnique as jest.Mock).mockResolvedValue(existingRecord);
      jest.spyOn(prisma.visi_dan_misi, 'update').mockResolvedValue(updatedRecord);

      const result = await service.update(1, partialUpdate);

      expect(result.visi).toBe('Visi yang diupdate saja');
      expect(prisma.visi_dan_misi.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: partialUpdate,
      });
    });
  });

  describe('remove', () => {
    it('should delete and return the record', async () => {
      const record = createMockVisiDanMisi({ id: 1 });

      (prisma.visi_dan_misi.findUnique as jest.Mock).mockResolvedValue(record);
      jest.spyOn(prisma.visi_dan_misi, 'delete').mockResolvedValue(record);

      const result = await service.remove(1);

      expect(result).toEqual(record);
      expect(prisma.visi_dan_misi.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when deleting non-existent record', async () => {
      (prisma.visi_dan_misi.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prisma.visi_dan_misi.delete).not.toHaveBeenCalled();
    });
  });
});