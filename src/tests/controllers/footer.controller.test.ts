import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import type { NextFunction, Request, Response } from 'express';
import footerController from '../../controllers/footer.controller';
import footerService from '../../services/footer.service';
import footerTestHelper from '../helpers/footer.test.helper';
import { HTTP_STATUS, ERROR_MESSAGES } from '../../constants/http.constants';
import type { IFooter, IFooterFormInput } from '../../types/footer.types';
import type { TypedRequestBody } from '../../types/request.types';

// Mock the footer service
vi.mock('../../services/footer.service');

describe('Footer Controller', () => {
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

  describe('fetchFooter', () => {
    it('should return footer data successfully', async () => {
      const mockFooter = footerTestHelper.validFooterData;
      vi.mocked(footerService.getFooter).mockResolvedValue(mockFooter);

      await footerController.fetchFooter(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(footerService.getFooter).toHaveBeenCalledOnce();
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockFooter });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return null when no footer found', async () => {
      vi.mocked(footerService.getFooter).mockResolvedValue(null);

      await footerController.fetchFooter(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(footerService.getFooter).toHaveBeenCalledOnce();
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: null });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle service errors and call next', async () => {
      const error = new Error('Service error');
      vi.mocked(footerService.getFooter).mockRejectedValue(error);

      await footerController.fetchFooter(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(footerService.getFooter).toHaveBeenCalledOnce();
      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('createFooter', () => {
    it('should create footer successfully', async () => {
      const footerData = footerTestHelper.validFooterData;
      const createdFooter = { ...footerData, _id: 'new-footer-id' };

      mockRequest.body = footerData;
      vi.mocked(footerService.addFooter).mockResolvedValue(createdFooter);

      await footerController.createFooter(
        mockRequest as TypedRequestBody<IFooter>,
        mockResponse as Response,
        mockNext,
      );

      expect(footerService.addFooter).toHaveBeenCalledWith(footerData);
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: createdFooter });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle service errors and call next', async () => {
      const footerData = footerTestHelper.validFooterData;
      const error = new Error('Creation failed');

      mockRequest.body = footerData;
      vi.mocked(footerService.addFooter).mockRejectedValue(error);

      await footerController.createFooter(
        mockRequest as TypedRequestBody<IFooter>,
        mockResponse as Response,
        mockNext,
      );

      expect(footerService.addFooter).toHaveBeenCalledWith(footerData);
      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should handle validation errors from service', async () => {
      const invalidFooterData = footerTestHelper.badSocialsFooterData;
      const error = new Error('Validation failed');

      mockRequest.body = invalidFooterData;
      vi.mocked(footerService.addFooter).mockRejectedValue(error);

      await footerController.createFooter(
        mockRequest as TypedRequestBody<IFooter>,
        mockResponse as Response,
        mockNext,
      );

      expect(footerService.addFooter).toHaveBeenCalledWith(invalidFooterData);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateFooter', () => {
    it('should update footer successfully', async () => {
      const updateData = {
        copyright: '© 2026 MNC Bookkeeping Services PH',
        'info.email': 'newemail@mncbookkeeping.ph',
      };
      const updatedFooter = { ...footerTestHelper.validFooterData, ...updateData };

      mockRequest.body = updateData;
      vi.mocked(footerService.updateFooter).mockResolvedValue(updatedFooter);

      await footerController.updateFooter(
        mockRequest as TypedRequestBody<Partial<IFooter>>,
        mockResponse as Response,
        mockNext,
      );

      expect(footerService.updateFooter).toHaveBeenCalledWith(updateData);
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: updatedFooter });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should throw error when no fields provided', async () => {
      mockRequest.body = {};

      await footerController.updateFooter(
        mockRequest as TypedRequestBody<Partial<IFooter>>,
        mockResponse as Response,
        mockNext,
      );

      expect(footerService.updateFooter).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error(ERROR_MESSAGES.NO_FIELDS_PROVIDED));
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should throw error when update returns null', async () => {
      const updateData = { copyright: 'Updated copyright' };

      mockRequest.body = updateData;
      vi.mocked(footerService.updateFooter).mockResolvedValue(null);

      await footerController.updateFooter(
        mockRequest as TypedRequestBody<Partial<IFooter>>,
        mockResponse as Response,
        mockNext,
      );

      expect(footerService.updateFooter).toHaveBeenCalledWith(updateData);
      expect(mockNext).toHaveBeenCalledWith(new Error(ERROR_MESSAGES.UPDATE_FAILED));
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should handle service errors and call next', async () => {
      const updateData = { copyright: 'Updated copyright' };
      const error = new Error('Update failed');

      mockRequest.body = updateData;
      vi.mocked(footerService.updateFooter).mockRejectedValue(error);

      await footerController.updateFooter(
        mockRequest as TypedRequestBody<Partial<IFooter>>,
        mockResponse as Response,
        mockNext,
      );

      expect(footerService.updateFooter).toHaveBeenCalledWith(updateData);
      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should handle partial updates correctly', async () => {
      const updateData = {
        'form.header': 'Updated Header',
        'info.address': '456 New Street, Manila, Philippines',
      };
      const updatedFooter = {
        ...footerTestHelper.validFooterData,
        form: {
          ...footerTestHelper.validFooterData.form,
          header: 'Updated Header',
        },
        info: {
          ...footerTestHelper.validFooterData.info,
          address: '456 New Street, Manila, Philippines',
        },
      };

      mockRequest.body = updateData;
      vi.mocked(footerService.updateFooter).mockResolvedValue(updatedFooter);

      await footerController.updateFooter(
        mockRequest as TypedRequestBody<Partial<IFooter>>,
        mockResponse as Response,
        mockNext,
      );

      expect(footerService.updateFooter).toHaveBeenCalledWith(updateData);
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: updatedFooter });
    });
  });

  describe('createEmail', () => {
    it('should add email successfully', async () => {
      const emailData = footerTestHelper.validEmailData;

      mockRequest.body = emailData;
      vi.mocked(footerService.addEmail).mockResolvedValue();

      await footerController.createEmail(mockRequest as TypedRequestBody<IFooterFormInput>, mockResponse as Response, mockNext);

      expect(footerService.addEmail).toHaveBeenCalledWith(emailData);
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: emailData });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle service errors', async () => {
      const emailData = footerTestHelper.validEmailData;
      const error = new Error('Service error');

      mockRequest.body = emailData;
      vi.mocked(footerService.addEmail).mockRejectedValue(error);

      await footerController.createEmail(mockRequest as TypedRequestBody<IFooterFormInput>, mockResponse as Response, mockNext);

      expect(footerService.addEmail).toHaveBeenCalledWith(emailData);
      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should handle invalid input data', async () => {
      const invalidEmailData = {
        emailer: 'not-an-email',
        contact: '',
        message: '',
      };

      mockRequest.body = invalidEmailData;

      await footerController.createEmail(mockRequest as TypedRequestBody<IFooterFormInput>, mockResponse as Response, mockNext);

      expect(footerService.addEmail).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: ERROR_MESSAGES.INVALID_INPUT,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
