import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import homeRoutes from '../../routes/home.route';
import homeService from '../../services/home.service';
import homeTestHelper from '../helpers/home.test.helper';
import { HTTP_STATUS } from '../../constants/http.constants';
import { errorMiddleware } from '../../middleware/error.middleware';

// Mock the home service
vi.mock('../../services/home.service');

describe('Home Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use('/api/home', homeRoutes);
    app.use(errorMiddleware);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/home', () => {
    it('should return home data successfully', async () => {
      const mockHome = homeTestHelper.validHomeData;
      vi.mocked(homeService.getHome).mockResolvedValue(mockHome);

      const response = await request(app)
        .get('/api/home')
        .expect(HTTP_STATUS.OK);

      expect(response.body).toEqual({ data: mockHome });
      expect(homeService.getHome).toHaveBeenCalledOnce();
    });

    it('should return null when no home found', async () => {
      vi.mocked(homeService.getHome).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/home')
        .expect(HTTP_STATUS.OK);

      expect(response.body).toEqual({ data: null });
      expect(homeService.getHome).toHaveBeenCalledOnce();
    });

    it('should handle service errors', async () => {
      const error = new Error('Database error');
      vi.mocked(homeService.getHome).mockRejectedValue(error);

      const response = await request(app)
        .get('/api/home')
        .expect(HTTP_STATUS.INTERNAL_SERVER_ERROR);

      expect(response.body).toMatchObject({
        error: {
          name: 'Error',
          message: expect.any(String),
          status: 500,
        },
      });
      expect(homeService.getHome).toHaveBeenCalledOnce();
    });
  });

  describe('POST /api/home', () => {
    it('should create home successfully with valid data', async () => {
      const homeData = homeTestHelper.validHomeData;
      const createdHome = { ...homeData, _id: 'new-home-id' };
      vi.mocked(homeService.addHome).mockResolvedValue(createdHome);

      const response = await request(app)
        .post('/api/home')
        .send(homeData)
        .expect(HTTP_STATUS.CREATED);

      expect(response.body).toEqual({ data: createdHome });
      expect(homeService.addHome).toHaveBeenCalledWith(homeData);
    });

    it('should reject invalid home data', async () => {
      const invalidData = {
        hero: {
          title: '',
          subtitle: 'Invalid subtitle',
          cta: 'Invalid CTA',
        },
        servicesHeader: '',
        servicesDescription: '',
        testimonialsHeader: '',
        testimonialsDescription: '',
        testimonials: [],
        services: [],
      };

      const response = await request(app)
        .post('/api/home')
        .send(invalidData)
        .expect(HTTP_STATUS.BAD_REQUEST);

      expect(response.body).toMatchObject({
        error: {
          name: 'ZodError',
          message: expect.any(String),
          status: 400,
        },
      });
      expect(homeService.addHome).not.toHaveBeenCalled();
    });

    it('should reject empty testimonials array', async () => {
      const invalidData = homeTestHelper.emptyTestimonialsData;

      const response = await request(app)
        .post('/api/home')
        .send(invalidData)
        .expect(HTTP_STATUS.BAD_REQUEST);

      expect(response.body).toMatchObject({
        error: {
          name: 'ZodError',
          message: expect.any(String),
          status: 400,
        },
      });
      expect(homeService.addHome).not.toHaveBeenCalled();
    });

    it('should handle service errors during creation', async () => {
      const homeData = homeTestHelper.validHomeData;
      const error = new Error('Creation failed');
      vi.mocked(homeService.addHome).mockRejectedValue(error);

      const response = await request(app)
        .post('/api/home')
        .send(homeData)
        .expect(HTTP_STATUS.INTERNAL_SERVER_ERROR);

      expect(response.body).toMatchObject({
        error: {
          name: 'Error',
          message: expect.any(String),
          status: 500,
        },
      });
      expect(homeService.addHome).toHaveBeenCalledWith(homeData);
    });

    it('should reject missing required fields', async () => {
      const invalidData = {
        hero: {
          title: 'Valid Title',
          subtitle: 'Valid Subtitle',
          cta: 'Valid CTA',
        },
        // Missing servicesHeader, servicesDescription, etc.
        testimonials: [
          {
            testifier: 'John Doe',
            company: 'ABC Company',
            message: 'Test message',
          },
        ],
        services: [
          {
            title: 'Service',
            items: [{ description: 'Description' }],
          },
        ],
      };

      const response = await request(app)
        .post('/api/home')
        .send(invalidData)
        .expect(HTTP_STATUS.BAD_REQUEST);

      expect(response.body).toMatchObject({
        error: {
          name: 'ZodError',
          message: expect.any(String),
          status: 400,
        },
      });
      expect(homeService.addHome).not.toHaveBeenCalled();
    });
  });

  describe('PUT /api/home', () => {
    it('should update home successfully with valid data', async () => {
      const updateData = {
        ...homeTestHelper.validHomeData,
        hero: {
          title: 'Updated Hero Title',
          subtitle: 'Updated Hero Subtitle',
          cta: 'Updated CTA',
        },
      };
      vi.mocked(homeService.updateHome).mockResolvedValue(updateData);

      const response = await request(app)
        .put('/api/home')
        .send(updateData)
        .expect(HTTP_STATUS.OK);

      expect(response.body).toEqual({ data: updateData });
      expect(homeService.updateHome).toHaveBeenCalledWith(updateData);
    });

    it('should reject empty request body', async () => {
      const response = await request(app)
        .put('/api/home')
        .send({})
        .expect(HTTP_STATUS.BAD_REQUEST);

      expect(response.body).toMatchObject({
        error: {
          name: 'Error',
          message: expect.any(String),
          status: 400,
        },
      });
      expect(homeService.updateHome).not.toHaveBeenCalled();
    });

    it('should reject invalid update data', async () => {
      const invalidData = {
        hero: {
          title: '',
          subtitle: 'Valid Subtitle',
          cta: 'Valid CTA',
        },
      };

      const response = await request(app)
        .put('/api/home')
        .send(invalidData)
        .expect(HTTP_STATUS.BAD_REQUEST);

      expect(response.body).toMatchObject({
        error: {
          name: 'ZodError',
          message: expect.any(String),
          status: 400,
        },
      });
      expect(homeService.updateHome).not.toHaveBeenCalled();
    });

    it('should handle when no home exists to update', async () => {
      const updateData = {
        ...homeTestHelper.validHomeData,
        hero: {
          title: 'Updated Hero Title',
          subtitle: 'Updated Hero Subtitle',
          cta: 'Updated CTA',
        },
      };
      vi.mocked(homeService.updateHome).mockResolvedValue(null);

      const response = await request(app)
        .put('/api/home')
        .send(updateData)
        .expect(HTTP_STATUS.INTERNAL_SERVER_ERROR);

      expect(response.body).toMatchObject({
        error: {
          name: 'Error',
          message: expect.any(String),
          status: 500,
        },
      });
      expect(homeService.updateHome).toHaveBeenCalledWith(updateData);
    });

    it('should handle service errors during update', async () => {
      const updateData = {
        ...homeTestHelper.validHomeData,
        hero: {
          title: 'Updated Hero Title',
          subtitle: 'Updated Hero Subtitle',
          cta: 'Updated CTA',
        },
      };
      const error = new Error('Update failed');
      vi.mocked(homeService.updateHome).mockRejectedValue(error);

      const response = await request(app)
        .put('/api/home')
        .send(updateData)
        .expect(HTTP_STATUS.INTERNAL_SERVER_ERROR);

      expect(response.body).toMatchObject({
        error: {
          name: 'Error',
          message: expect.any(String),
          status: 500,
        },
      });
      expect(homeService.updateHome).toHaveBeenCalledWith(updateData);
    });

    it('should reject empty testimonials array in update', async () => {
      const invalidData = {
        ...homeTestHelper.validHomeData,
        testimonials: [],
      };

      const response = await request(app)
        .put('/api/home')
        .send(invalidData)
        .expect(HTTP_STATUS.BAD_REQUEST);

      expect(response.body).toMatchObject({
        error: {
          name: 'ZodError',
          message: expect.any(String),
          status: 400,
        },
      });
      expect(homeService.updateHome).not.toHaveBeenCalled();
    });
  });
}); 