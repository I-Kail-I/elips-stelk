import { Readable } from 'node:stream';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

jest.mock('./activity.service', () => ({
  ActivityService: jest.fn().mockImplementation(() => ({
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

jest.mock('@nestjs/platform-express', () => ({
  FilesInterceptor: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock('multer', () => ({
  diskStorage: jest.fn().mockReturnValue({}),
}));

function createMockUploadedFile(overrides = {}): Express.Multer.File {
  return {
    fieldname: 'images',
    originalname: 'test-image.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: 1024,
    destination: './uploads_folder',
    filename: 'images-1234567890-987654321.jpg',
    path: 'uploads_folder/images-1234567890-987654321.jpg',
    // eslint-disable-next-line node/prefer-global/buffer
    buffer: Buffer.from('test file content'),
    stream: Readable.from(['test file content']),
    ...overrides,
  };
}

function createMockActivity(overrides = {}) {
  return {
    id: 1,
    title: 'Test Activity',
    description: 'Activity description',
    markdown_file: '# Markdown content',
    image: [],
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

function createMockCreateActivityDto(overrides = {}) {
  return {
    title: 'Test Activity',
    description: 'Activity description',
    markdown_file: '# Markdown content',
    image: [],
    ...overrides,
  };
}

function createMockUpdateActivityDto(overrides = {}) {
  return {
    title: 'Updated Activity',
    description: 'Updated description',
    markdown_file: '# Updated content',
    ...overrides,
  };
}

describe('ActivityController', () => {
  let controller: ActivityController;
  let activityService: ActivityService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [ActivityService],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
    activityService = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new activity without files', async () => {
      const createActivityDto: CreateActivityDto = createMockCreateActivityDto();
      const expectedResult = createMockActivity(createActivityDto);

      jest.spyOn(activityService, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createActivityDto, []);

      expect(result).toEqual(expectedResult);
      expect(activityService.create).toHaveBeenCalledWith(createActivityDto);
      expect(activityService.create).toHaveBeenCalledTimes(1);
    });

    it('should create activity with uploaded image files', async () => {
      const createActivityDto: CreateActivityDto = createMockCreateActivityDto({
        image: undefined,
      });
      const mockFiles = [
        createMockUploadedFile({ path: 'uploads_folder/images-abc.jpg' }),
        createMockUploadedFile({ path: 'uploads_folder/images-def.jpg' }),
      ];
      const expectedData = {
        ...createActivityDto,
        image: ['uploads_folder/images-abc.jpg', 'uploads_folder/images-def.jpg'],
      };
      const expectedResult = createMockActivity(expectedData);

      jest.spyOn(activityService, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createActivityDto, mockFiles);

      expect(result.image).toEqual([
        'uploads_folder/images-abc.jpg',
        'uploads_folder/images-def.jpg',
      ]);
      expect(activityService.create).toHaveBeenCalledWith(expectedData);
    });

    it('should create activity with different data', async () => {
      const createActivityDto: CreateActivityDto = createMockCreateActivityDto({
        title: 'Workshop',
        description: 'A coding workshop',
        markdown_file: '# Workshop content',
      });
      const expectedResult = createMockActivity(createActivityDto);

      jest.spyOn(activityService, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createActivityDto, []);

      expect(result.title).toBe('Workshop');
      expect(result.description).toBe('A coding workshop');
      expect(result.markdown_file).toBe('# Workshop content');
    });
  });

  describe('findAll', () => {
    it('should return an array of activities', async () => {
      const mockActivities = [
        createMockActivity({ id: 1, title: 'Activity 1' }),
        createMockActivity({ id: 2, title: 'Activity 2' }),
        createMockActivity({ id: 3, title: 'Activity 3' }),
      ];

      jest.spyOn(activityService, 'findAll').mockResolvedValue(mockActivities);

      const result = await controller.findAll();

      expect(result).toEqual(mockActivities);
      expect(result).toHaveLength(3);
      expect(activityService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no activities exist', async () => {
      jest.spyOn(activityService, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
      expect(activityService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single activity by id', async () => {
      const activityId = '1';
      const expectedActivity = createMockActivity({ id: 1 });

      jest.spyOn(activityService, 'findOne').mockResolvedValue(expectedActivity);

      const result = await controller.findOne(activityId);

      expect(result).toEqual(expectedActivity);
      expect(activityService.findOne).toHaveBeenCalledWith(1);
      expect(activityService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should convert string id to number', async () => {
      const activityId = '5';
      const expectedActivity = createMockActivity({ id: 5 });

      jest.spyOn(activityService, 'findOne').mockResolvedValue(expectedActivity);

      await controller.findOne(activityId);

      expect(activityService.findOne).toHaveBeenCalledWith(5);
    });

    it('should throw NotFoundException when activity is not found', async () => {
      const activityId = '999';

      jest
        .spyOn(activityService, 'findOne')
        .mockRejectedValue(new NotFoundException('Activity tidak ditemukan'));

      await expect(controller.findOne(activityId)).rejects.toThrow(NotFoundException);
      await expect(controller.findOne(activityId)).rejects.toThrow('Activity tidak ditemukan');
    });
  });

  describe('update', () => {
    it('should update an activity without files', async () => {
      const activityId = '1';
      const updateActivityDto: UpdateActivityDto = createMockUpdateActivityDto();
      const expectedResult = createMockActivity({ id: 1, ...updateActivityDto });

      jest.spyOn(activityService, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(activityId, updateActivityDto, []);

      expect(result).toEqual(expectedResult);
      expect(activityService.update).toHaveBeenCalledWith(1, updateActivityDto);
      expect(activityService.update).toHaveBeenCalledTimes(1);
    });

    it('should update an activity with uploaded image files', async () => {
      const activityId = '1';
      const updateActivityDto: UpdateActivityDto = createMockUpdateActivityDto({
        image: undefined,
      });
      const mockFiles = [createMockUploadedFile({ path: 'uploads_folder/images-new.jpg' })];
      const expectedData = { ...updateActivityDto, image: ['uploads_folder/images-new.jpg'] };
      const expectedResult = createMockActivity({ id: 1, ...expectedData });

      jest.spyOn(activityService, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(activityId, updateActivityDto, mockFiles);

      expect(result.image).toEqual(['uploads_folder/images-new.jpg']);
      expect(activityService.update).toHaveBeenCalledWith(1, expectedData);
    });

    it('should update with partial data', async () => {
      const activityId = '1';
      const partialUpdate: UpdateActivityDto = { title: 'Updated Title' };
      const expectedResult = createMockActivity({ id: 1, title: 'Updated Title' });

      jest.spyOn(activityService, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(activityId, partialUpdate, []);

      expect(result.title).toBe('Updated Title');
      expect(activityService.update).toHaveBeenCalledWith(1, partialUpdate);
    });

    it('should throw NotFoundException when updating non-existent activity', async () => {
      const activityId = '999';
      const updateActivityDto: UpdateActivityDto = createMockUpdateActivityDto();

      jest
        .spyOn(activityService, 'update')
        .mockRejectedValue(new NotFoundException('Activity tidak ditemukan'));

      await expect(controller.update(activityId, updateActivityDto, [])).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle string to number conversion for id', async () => {
      const activityId = '10';
      const updateActivityDto: UpdateActivityDto = createMockUpdateActivityDto();
      const expectedResult = createMockActivity({ id: 10, ...updateActivityDto });

      jest.spyOn(activityService, 'update').mockResolvedValue(expectedResult);

      await controller.update(activityId, updateActivityDto, []);

      expect(activityService.update).toHaveBeenCalledWith(10, updateActivityDto);
    });
  });

  describe('remove', () => {
    it('should delete an activity', async () => {
      const activityId = '1';
      const expectedResult = createMockActivity({ id: 1 });

      jest.spyOn(activityService, 'remove').mockResolvedValue(expectedResult);

      const result = await controller.remove(activityId);

      expect(result).toEqual(expectedResult);
      expect(activityService.remove).toHaveBeenCalledWith(1);
      expect(activityService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent activity', async () => {
      const activityId = '999';

      jest
        .spyOn(activityService, 'remove')
        .mockRejectedValue(new NotFoundException('Activity tidak ditemukan'));

      await expect(controller.remove(activityId)).rejects.toThrow(NotFoundException);
      await expect(controller.remove(activityId)).rejects.toThrow('Activity tidak ditemukan');
    });

    it('should handle string to number conversion for id', async () => {
      const activityId = '7';
      const expectedResult = createMockActivity({ id: 7 });

      jest.spyOn(activityService, 'remove').mockResolvedValue(expectedResult);

      await controller.remove(activityId);

      expect(activityService.remove).toHaveBeenCalledWith(7);
    });
  });
});
