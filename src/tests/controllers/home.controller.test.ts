import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import type { NextFunction, Request, Response } from 'express';
import homeController from '../../controllers/home.controller';
import homeService from '../../services/home.service';
import homeTestHelper from '../helpers/home.test.helper';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../constants/http.constants';

// Mock the home service
vi.mock('../../services/home.service');

describe('Home Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRequest = {};
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchHome', () => {
    it('should return home data successfully', async () => {
      const mockHome = homeTestHelper.validHomeData;
      vi.mocked(homeService.getHome).mockResolvedValue(mockHome);

      await homeController.fetchHome(mockRequest as Request, mockResponse as Response, mockNext);

      expect(homeService.getHome).toHaveBeenCalledOnce();
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockHome });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return null when no home found', async () => {
      vi.mocked(homeService.getHome).mockResolvedValue(null);

      await homeController.fetchHome(mockRequest as Request, mockResponse as Response, mockNext);

      expect(homeService.getHome).toHaveBeenCalledOnce();
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: null });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle service errors and call next', async () => {
      const error = new Error('Database error');
      vi.mocked(homeService.getHome).mockRejectedValue(error);

      await homeController.fetchHome(mockRequest as Request, mockResponse as Response, mockNext);

      expect(homeService.getHome).toHaveBeenCalledOnce();
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('createHome', () => {
    it('should create home successfully', async () => {
      const homeData = homeTestHelper.validHomeData;
      const createdHome = { ...homeData, _id: 'new-home-id' };
      mockRequest.body = homeData;
      vi.mocked(homeService.addHome).mockResolvedValue(createdHome);

      await homeController.createHome(mockRequest as Request, mockResponse as Response, mockNext);

      expect(homeService.addHome).toHaveBeenCalledWith(homeData);
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: createdHome });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle service errors and call next', async () => {
      const homeData = homeTestHelper.validHomeData;
      const error = new Error('Creation failed');
      mockRequest.body = homeData;
      vi.mocked(homeService.addHome).mockRejectedValue(error);

      await homeController.createHome(mockRequest as Request, mockResponse as Response, mockNext);

      expect(homeService.addHome).toHaveBeenCalledWith(homeData);
      expect(mockNext).toHaveBeenCalledWith(error);
    });

    it('should handle validation errors from service', async () => {
      const homeData = homeTestHelper.validHomeData;
      const error = new Error('Validation failed');
      mockRequest.body = homeData;
      vi.mocked(homeService.addHome).mockRejectedValue(error);

      await homeController.createHome(mockRequest as Request, mockResponse as Response, mockNext);

      expect(homeService.addHome).toHaveBeenCalledWith(homeData);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateHome', () => {
    it('should update home successfully', async () => {
      const updateData = {
        hero: {
          title: 'Updated Hero Title',
          subtitle: 'Updated Hero Subtitle',
          cta: 'Updated CTA',
        },
      };
      const updatedHome = { ...homeTestHelper.validHomeData, ...updateData };
      mockRequest.body = updateData;
      vi.mocked(homeService.updateHome).mockResolvedValue(updatedHome);

      await homeController.updateHome(mockRequest as Request, mockResponse as Response, mockNext);

      expect(homeService.updateHome).toHaveBeenCalledWith(updateData);
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: updatedHome });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should throw error when no fields provided', async () => {
      mockRequest.body = {};

      await homeController.updateHome(mockRequest as Request, mockResponse as Response, mockNext);

      expect(homeService.updateHome).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
        message: ERROR_MESSAGES.NO_FIELDS_PROVIDED,
      }));
    });

    it('should throw error when update returns null', async () => {
      const updateData = { hero: { title: 'Updated Title', subtitle: 'Subtitle', cta: 'CTA' } };
      mockRequest.body = updateData;
      vi.mocked(homeService.updateHome).mockResolvedValue(null);

      await homeController.updateHome(mockRequest as Request, mockResponse as Response, mockNext);

      expect(homeService.updateHome).toHaveBeenCalledWith(updateData);
      expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
        message: ERROR_MESSAGES.UPDATE_FAILED,
      }));
    });

    it('should handle service errors and call next', async () => {
      const updateData = { hero: { title: 'Updated Title', subtitle: 'Subtitle', cta: 'CTA' } };
      const error = new Error('Update failed');
      mockRequest.body = updateData;
      vi.mocked(homeService.updateHome).mockRejectedValue(error);

      await homeController.updateHome(mockRequest as Request, mockResponse as Response, mockNext);

      expect(homeService.updateHome).toHaveBeenCalledWith(updateData);
      expect(mockNext).toHaveBeenCalledWith(error);
    });

    it('should handle partial updates correctly', async () => {
      const updateData = {
        hero: {
          title: 'Updated Hero Title',
          subtitle: 'Updated Hero Subtitle',
          cta: 'Updated CTA',
        },
      };
      const updatedHome = { ...homeTestHelper.validHomeData, ...updateData };
      mockRequest.body = updateData;
      vi.mocked(homeService.updateHome).mockResolvedValue(updatedHome);

      await homeController.updateHome(mockRequest as Request, mockResponse as Response, mockNext);

      expect(homeService.updateHome).toHaveBeenCalledWith(updateData);
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: updatedHome });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
}); 