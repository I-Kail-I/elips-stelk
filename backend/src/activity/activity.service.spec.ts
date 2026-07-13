import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ActivityService } from './activity.service';

jest.mock('@/common/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    activity: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

function createMockActivity(overrides = {}) {
  return {
    id: 1,
    title: 'Test Activity',
    description: 'Test Description',
    date: new Date(),
    image: [],
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

function createMockCreateActivityDto(overrides = {}) {
  return {
    title: 'Test Activity',
    description: 'Test Description',
    date: new Date(),
    image: [],
    ...overrides,
  };
}

function createMockUpdateActivityDto(overrides = {}) {
  return {
    title: 'Updated Activity',
    description: 'Updated Description',
    date: new Date(),
    image: [],
    ...overrides,
  };
}

describe('ActivityService', () => {
  let service: ActivityService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityService, PrismaService],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new activity', async () => {
      const createActivityDto = createMockCreateActivityDto();
      const mockCreatedActivity = createMockActivity(createActivityDto);

      jest.spyOn(prisma.activity, 'create').mockResolvedValue(mockCreatedActivity);

      const result = await service.create(createActivityDto);

      expect(result).toEqual(mockCreatedActivity);
      expect(prisma.activity.create).toHaveBeenCalledWith({
        data: createActivityDto,
      });
    });

    it('should create activity with all provided fields', async () => {
      const createActivityDto = createMockCreateActivityDto({
        title: 'Special Activity',
        description: 'A very special activity',
      });

      const mockCreatedActivity = createMockActivity(createActivityDto);

      jest.spyOn(prisma.activity, 'create').mockResolvedValue(mockCreatedActivity);

      const result = await service.create(createActivityDto);

      expect(result.title).toBe('Special Activity');
      expect(result.description).toBe('A very special activity');
    });
  });

  describe('findAll', () => {
    it('should return an array of activities', async () => {
      const mockActivities = [
        createMockActivity({ id: 1, title: 'Activity 1' }),
        createMockActivity({ id: 2, title: 'Activity 2' }),
        createMockActivity({ id: 3, title: 'Activity 3' }),
      ];

      jest.spyOn(prisma.activity, 'findMany').mockResolvedValue(mockActivities);

      const result = await service.findAll();

      expect(result).toEqual(mockActivities);
      expect(result).toHaveLength(3);
      expect(prisma.activity.findMany).toHaveBeenCalled();
    });

    it('should return an empty array when no activities exist', async () => {
      jest.spyOn(prisma.activity, 'findMany').mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return an activity when found', async () => {
      const activity = createMockActivity({ id: 1 });
      (prisma.activity.findUnique as jest.Mock).mockResolvedValue(activity);

      const result = await service.findOne(1);

      expect(result).toEqual(activity);
      expect(prisma.activity.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when activity is not found', async () => {
      (prisma.activity.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow('Activity tidak ditemukan');
    });

    it('should find activity with specific id', async () => {
      const activity = createMockActivity({ id: 5, title: 'Specific Activity' });
      (prisma.activity.findUnique as jest.Mock).mockResolvedValue(activity);

      const result = await service.findOne(5);

      expect(result.id).toBe(5);
      expect(result.title).toBe('Specific Activity');
    });
  });

  describe('update', () => {
    it('should update and return the activity', async () => {
      const existingActivity = createMockActivity({ id: 1 });
      const updateActivityDto = createMockUpdateActivityDto();
      const updatedActivity = createMockActivity({ id: 1, ...updateActivityDto });

      (prisma.activity.findUnique as jest.Mock).mockResolvedValue(existingActivity);
      jest.spyOn(prisma.activity, 'update').mockResolvedValue(updatedActivity);

      const result = await service.update(1, updateActivityDto);

      expect(result).toEqual(updatedActivity);
      expect(prisma.activity.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateActivityDto,
      });
    });

    it('should throw NotFoundException when updating non-existent activity', async () => {
      const updateActivityDto = createMockUpdateActivityDto();
      (prisma.activity.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.update(999, updateActivityDto)).rejects.toThrow(NotFoundException);
      expect(prisma.activity.update).not.toHaveBeenCalled();
    });

    it('should update only provided fields', async () => {
      const existingActivity = createMockActivity({ id: 1 });
      const partialUpdate = { title: 'Updated Title' };
      const updatedActivity = createMockActivity({ id: 1, title: 'Updated Title' });

      (prisma.activity.findUnique as jest.Mock).mockResolvedValue(existingActivity);
      jest.spyOn(prisma.activity, 'update').mockResolvedValue(updatedActivity);

      const result = await service.update(1, partialUpdate);

      expect(result.title).toBe('Updated Title');
      expect(prisma.activity.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: partialUpdate,
      });
    });
  });

  describe('remove', () => {
    it('should delete and return the activity', async () => {
      const activity = createMockActivity({ id: 1 });

      (prisma.activity.findUnique as jest.Mock).mockResolvedValue(activity);
      jest.spyOn(prisma.activity, 'delete').mockResolvedValue(activity);

      const result = await service.remove(1);

      expect(result).toEqual(activity);
      expect(prisma.activity.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when deleting non-existent activity', async () => {
      (prisma.activity.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prisma.activity.delete).not.toHaveBeenCalled();
    });

    it('should delete the correct activity by id', async () => {
      const activity = createMockActivity({ id: 2, title: 'Activity to delete' });

      (prisma.activity.findUnique as jest.Mock).mockResolvedValue(activity);
      jest.spyOn(prisma.activity, 'delete').mockResolvedValue(activity);

      const result = await service.remove(2);

      expect(result.id).toBe(2);
      expect(result.title).toBe('Activity to delete');
      expect(prisma.activity.delete).toHaveBeenCalledWith({
        where: { id: 2 },
      });
    });
  });
});
