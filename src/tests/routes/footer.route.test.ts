import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import footerService from '../../services/footer.service';
import footerTestHelper from '../helpers/footer.test.helper';
import { HTTP_STATUS } from '../../constants/http.constants';
import footerRoutes from '../../routes/footer.route';
import { errorMiddleware } from '../../middleware/error.middleware';

// Mock the footer service
vi.mock('../../services/footer.service');

describe('Footer Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a test Express app
    app = express();
    app.use(express.json());

    // Use footer routes
    app.use('/api/footer', footerRoutes);
    app.use(errorMiddleware);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/footer', () => {
    it('should return footer data successfully', async () => {
      const mockFooter = footerTestHelper.validFooterData;
      vi.mocked(footerService.getFooter).mockResolvedValue(mockFooter);

      const response = await request(app)
        .get('/api/footer')
        .expect(HTTP_STATUS.OK);

      expect(response.body).toEqual({ data: mockFooter });
      expect(footerService.getFooter).toHaveBeenCalledOnce();
    });

    it('should return null when no footer found', async () => {
      vi.mocked(footerService.getFooter).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/footer')
        .expect(HTTP_STATUS.OK);

      expect(response.body).toEqual({ data: null });
      expect(footerService.getFooter).toHaveBeenCalledOnce();
    });

    it('should handle service errors', async () => {
      const error = new Error('Database error');
      vi.mocked(footerService.getFooter).mockRejectedValue(error);

      const response = await request(app)
        .get('/api/footer')
        .expect(500);

      expect(response.body).toHaveProperty('error');
      expect(footerService.getFooter).toHaveBeenCalledOnce();
    });
  });

  describe('POST /api/footer', () => {
    it('should create footer successfully with valid data', async () => {
      const footerData = footerTestHelper.validFooterData;
      const createdFooter = { ...footerData, _id: 'new-footer-id' };
      vi.mocked(footerService.addFooter).mockResolvedValue(createdFooter);

      const response = await request(app)
        .post('/api/footer')
        .send(footerData)
        .expect(HTTP_STATUS.CREATED);

      expect(response.body).toEqual({ data: createdFooter });
      expect(footerService.addFooter).toHaveBeenCalledWith(footerData);
    });

    it('should reject invalid footer data', async () => {
      const invalidData = footerTestHelper.badSocialsFooterData;

      const response = await request(app)
        .post('/api/footer')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(footerService.addFooter).not.toHaveBeenCalled();
    });

    it('should reject missing required fields', async () => {
      const incompleteData = {
        form: footerTestHelper.validFooterData.form,
        socials: footerTestHelper.validFooterData.socials,
        // missing info, copyright, links
      };

      const response = await request(app)
        .post('/api/footer')
        .send(incompleteData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(footerService.addFooter).not.toHaveBeenCalled();
    });

    it('should handle service errors during creation', async () => {
      const footerData = footerTestHelper.validFooterData;
      const error = new Error('Creation failed');
      vi.mocked(footerService.addFooter).mockRejectedValue(error);

      const response = await request(app)
        .post('/api/footer')
        .send(footerData)
        .expect(500);

      expect(response.body).toHaveProperty('error');
      expect(footerService.addFooter).toHaveBeenCalledWith(footerData);
    });

    it('should reject invalid social platform', async () => {
      const invalidData = footerTestHelper.invalidSocialPlatformFooterData;

      const response = await request(app)
        .post('/api/footer')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(footerService.addFooter).not.toHaveBeenCalled();
    });
  });

  describe('PUT /api/footer', () => {
    it('should update footer successfully with valid data', async () => {
      const updateData = {
        ...footerTestHelper.validFooterData,
        copyright: '© 2026 MNC Bookkeeping Services PH',
        info: {
          ...footerTestHelper.validFooterData.info,
          email: 'newemail@mncbookkeeping.ph',
        },
      };
      vi.mocked(footerService.updateFooter).mockResolvedValue(updateData);

      const response = await request(app)
        .put('/api/footer')
        .send(updateData)
        .expect(HTTP_STATUS.OK);

      expect(response.body).toEqual({ data: updateData });
      expect(footerService.updateFooter).toHaveBeenCalledWith(updateData);
    });

    it('should reject empty update data', async () => {
      const response = await request(app)
        .put('/api/footer')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(footerService.updateFooter).not.toHaveBeenCalled();
    });

    it('should handle when no footer exists to update', async () => {
      const updateData = {
        ...footerTestHelper.validFooterData,
        copyright: 'Updated copyright',
      };
      vi.mocked(footerService.updateFooter).mockResolvedValue(null);

      const response = await request(app)
        .put('/api/footer')
        .send(updateData)
        .expect(500);

      expect(response.body).toHaveProperty('error');
      expect(footerService.updateFooter).toHaveBeenCalledWith(updateData);
    });

    it('should handle service errors during update', async () => {
      const updateData = {
        ...footerTestHelper.validFooterData,
        copyright: 'Updated copyright',
      };
      const error = new Error('Update failed');
      vi.mocked(footerService.updateFooter).mockRejectedValue(error);

      const response = await request(app)
        .put('/api/footer')
        .send(updateData)
        .expect(500);

      expect(response.body).toHaveProperty('error');
      expect(footerService.updateFooter).toHaveBeenCalledWith(updateData);
    });

    it('should reject invalid update data', async () => {
      const invalidUpdateData = {
        ...footerTestHelper.validFooterData,
        socials: 'Not an array!',
      };

      const response = await request(app)
        .put('/api/footer')
        .send(invalidUpdateData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(footerService.updateFooter).not.toHaveBeenCalled();
    });

    it('should handle partial updates correctly', async () => {
      const updateData = {
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
      vi.mocked(footerService.updateFooter).mockResolvedValue(updateData);

      const response = await request(app)
        .put('/api/footer')
        .send(updateData)
        .expect(HTTP_STATUS.OK);

      expect(response.body).toEqual({ data: updateData });
      expect(footerService.updateFooter).toHaveBeenCalledWith(updateData);
    });
  });
});
