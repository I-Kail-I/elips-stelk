import { Buffer } from 'node:buffer';
import { Test, TestingModule } from '@nestjs/testing';
import { NextFunction, Request, Response } from 'express';
import { FilesController } from './files.controller';

// Mock multer properly with explicit types
jest.mock('multer', () => {
  const multer = (): Record<
    string,
    (...args: any[]) => (req: Request, res: Response, next: NextFunction) => void
  > => ({
    single:
      () =>
        (req: Request, res: Response, next: NextFunction): void => {
          next();
        },
    array:
      () =>
        (req: Request, res: Response, next: NextFunction): void => {
          next();
        },
    fields:
      () =>
        (req: Request, res: Response, next: NextFunction): void => {
          next();
        },
    any:
      () =>
        (req: Request, res: Response, next: NextFunction): void => {
          next();
        },
    none:
      () =>
        (req: Request, res: Response, next: NextFunction): void => {
          next();
        },
  });

  multer.diskStorage = (): Record<string, jest.Mock> => ({
    _handleFile: jest.fn(),
    _removeFile: jest.fn(),
  });

  multer.memoryStorage = (): Record<string, jest.Mock> => ({
    _handleFile: jest.fn(),
    _removeFile: jest.fn(),
  });

  return multer;
});

function createMockFile(overrides: Partial<Express.Multer.File> = {}): Express.Multer.File {
  const timestamp = Date.now();
  const random = Math.round(Math.random() * 1e9);
  const uniqueSuffix = `${timestamp}-${random}`;

  return {
    fieldname: 'file',
    originalname: 'test.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: './uploads_folder',
    filename: `file-${uniqueSuffix}.jpg`,
    path: `uploads_folder/file-${uniqueSuffix}.jpg`,
    size: 1024,
    buffer: Buffer.from('test'),
    // eslint-disable-next-line ts/no-unsafe-assignment
    stream: null as any,
    ...overrides,
  };
}

describe('FilesController', () => {
  let controller: FilesController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file and return file information', () => {
      const mockFile = createMockFile({ originalname: 'test.jpg' });

      const result = controller.uploadFile(mockFile);

      expect(result).toBeDefined();
      expect(result.filename).toBe(mockFile.filename);
      expect(result.originalName).toBe('test.jpg');
      expect(result.path).toBe(mockFile.path);
      expect(result.size).toBe(1024);
    });

    it('should handle different file types', () => {
      const mockFile = createMockFile({
        originalname: 'test.png',
        filename: 'file-12345.png',
        mimetype: 'image/png',
      });

      const result = controller.uploadFile(mockFile);

      expect(result).toBeDefined();
      expect(result.originalName).toBe('test.png');
      expect(result.filename).toBe('file-12345.png');
    });

    it('should handle large files', () => {
      const mockFile = createMockFile({
        originalname: 'large.jpg',
        size: 10 * 1024 * 1024, // 10MB
      });

      const result = controller.uploadFile(mockFile);

      expect(result).toBeDefined();
      expect(result.originalName).toBe('large.jpg');
      expect(result.size).toBe(10 * 1024 * 1024);
    });

    it('should preserve original filename in response', () => {
      const mockFile = createMockFile({
        originalname: 'original-name.jpg',
        filename: 'file-1234567890-123456789.jpg',
      });

      const result = controller.uploadFile(mockFile);

      expect(result.originalName).toBe('original-name.jpg');
      expect(result.filename).not.toBe('original-name.jpg');
    });

    it('should return correct file path', () => {
      const mockFile = createMockFile({
        path: 'uploads_folder/custom-path.jpg',
      });

      const result = controller.uploadFile(mockFile);

      expect(result.path).toBe(mockFile.path);
      expect(result.path).toContain('uploads_folder');
    });

    it('should handle files with various fieldnames', () => {
      const mockFile = createMockFile({
        fieldname: 'customField',
        originalname: 'custom-field.jpg',
        filename: 'customField-12345.jpg',
      });

      const result = controller.uploadFile(mockFile);

      expect(result).toBeDefined();
      expect(result.filename).toBe('customField-12345.jpg');
    });

    it('should return all required file properties', () => {
      const mockFile = createMockFile({
        originalname: 'complete.jpg',
        filename: 'file-12345.jpg',
        path: 'uploads_folder/file-12345.jpg',
        size: 2048,
      });

      const result = controller.uploadFile(mockFile);

      expect(result).toHaveProperty('filename');
      expect(result).toHaveProperty('originalName');
      expect(result).toHaveProperty('path');
      expect(result).toHaveProperty('size');
      expect(result.filename).toBe('file-12345.jpg');
      expect(result.originalName).toBe('complete.jpg');
      expect(result.path).toBe('uploads_folder/file-12345.jpg');
      expect(result.size).toBe(2048);
    });

    it('should handle minimum size files', () => {
      const mockFile = createMockFile({
        originalname: 'tiny.jpg',
        size: 1, // 1 byte
      });

      const result = controller.uploadFile(mockFile);

      expect(result).toBeDefined();
      expect(result.size).toBe(1);
    });

    it('should generate unique filenames for the same original name', () => {
      const mockFile1 = createMockFile({
        originalname: 'same.jpg',
        filename: 'file-1111111111-111111111.jpg',
      });
      const mockFile2 = createMockFile({
        originalname: 'same.jpg',
        filename: 'file-2222222222-222222222.jpg',
      });

      const result1 = controller.uploadFile(mockFile1);
      const result2 = controller.uploadFile(mockFile2);

      expect(result1.originalName).toBe('same.jpg');
      expect(result2.originalName).toBe('same.jpg');
      expect(result1.filename).not.toBe(result2.filename);
    });
  });

  describe('controller integration scenarios', () => {
    it('should handle multiple file uploads sequentially', () => {
      const file1 = createMockFile({
        originalname: 'file1.jpg',
        filename: 'file-12345-111.jpg',
      });
      const file2 = createMockFile({
        originalname: 'file2.jpg',
        filename: 'file-67890-222.jpg',
      });
      const file3 = createMockFile({
        originalname: 'file3.jpg',
        filename: 'file-11111-333.jpg',
      });

      const result1 = controller.uploadFile(file1);
      const result2 = controller.uploadFile(file2);
      const result3 = controller.uploadFile(file3);

      expect(result1.originalName).toBe('file1.jpg');
      expect(result1.filename).toBe('file-12345-111.jpg');
      expect(result2.originalName).toBe('file2.jpg');
      expect(result2.filename).toBe('file-67890-222.jpg');
      expect(result3.originalName).toBe('file3.jpg');
      expect(result3.filename).toBe('file-11111-333.jpg');
    });

    it('should handle filenames with multiple dots', () => {
      const mockFile = createMockFile({
        originalname: 'my.file.name.jpg',
        filename: 'file-12345-67890.jpg',
      });

      const result = controller.uploadFile(mockFile);

      expect(result.originalName).toBe('my.file.name.jpg');
      expect(result.filename).toBe('file-12345-67890.jpg');
    });

    it('should handle files with no extension', () => {
      const mockFile = createMockFile({
        originalname: 'noextension',
        filename: 'file-12345-67890',
      });

      const result = controller.uploadFile(mockFile);

      expect(result.originalName).toBe('noextension');
      expect(result.filename).toBe('file-12345-67890');
    });

    it('should handle PDF files', () => {
      const mockFile = createMockFile({
        originalname: 'document.pdf',
        filename: 'file-12345-67890.pdf',
        mimetype: 'application/pdf',
      });

      const result = controller.uploadFile(mockFile);

      expect(result.originalName).toBe('document.pdf');
      expect(result.filename).toBe('file-12345-67890.pdf');
    });
  });
});
