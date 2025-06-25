import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import homeService from '../../services/home.service';
import { HomeModel } from '../../models/home.model';
import homeTestHelper from '../helpers/home.test.helper';

// Mock the HomeModel
vi.mock('../../models/home.model');

describe('Home Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getHome', () => {
    it('should return home data when found', async () => {
      const mockHome = homeTestHelper.validHomeData;
      vi.mocked(HomeModel.findOne).mockResolvedValue(mockHome);

      const result = await homeService.getHome();

      expect(HomeModel.findOne).toHaveBeenCalledWith({});
      expect(result).toEqual(mockHome);
    });

    it('should return null when no home found', async () => {
      vi.mocked(HomeModel.findOne).mockResolvedValue(null);

      const result = await homeService.getHome();

      expect(HomeModel.findOne).toHaveBeenCalledWith({});
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      vi.mocked(HomeModel.findOne).mockRejectedValue(error);

      await expect(homeService.getHome()).rejects.toThrow('Database connection failed');
      expect(HomeModel.findOne).toHaveBeenCalledWith({});
    });
  });

  describe('addHome', () => {
    it('should create and return new home data', async () => {
      const homeData = homeTestHelper.validHomeData;
      const createdHome = { ...homeData, _id: 'new-home-id' };
      vi.mocked(HomeModel.create).mockResolvedValue(createdHome);

      const result = await homeService.addHome(homeData);

      expect(HomeModel.create).toHaveBeenCalledWith(homeData);
      expect(result).toEqual(createdHome);
    });

    it('should handle validation errors during creation', async () => {
      const homeData = homeTestHelper.validHomeData;
      const error = new Error('Validation failed: hero.title is required');
      vi.mocked(HomeModel.create).mockRejectedValue(error);

      await expect(homeService.addHome(homeData)).rejects.toThrow('Validation failed: hero.title is required');
      expect(HomeModel.create).toHaveBeenCalledWith(homeData);
    });

    it('should handle database errors during creation', async () => {
      const homeData = homeTestHelper.validHomeData;
      const error = new Error('Database connection failed');
      vi.mocked(HomeModel.create).mockRejectedValue(error);

      await expect(homeService.addHome(homeData)).rejects.toThrow('Database connection failed');
      expect(HomeModel.create).toHaveBeenCalledWith(homeData);
    });

    it('should handle duplicate key errors', async () => {
      const homeData = homeTestHelper.validHomeData;
      const error = new Error('E11000 duplicate key error');
      vi.mocked(HomeModel.create).mockRejectedValue(error);

      await expect(homeService.addHome(homeData)).rejects.toThrow('E11000 duplicate key error');
      expect(HomeModel.create).toHaveBeenCalledWith(homeData);
    });
  });

  describe('updateHome', () => {
    it('should update and return home data', async () => {
      const updateData = {
        hero: {
          title: 'Updated Hero Title',
          subtitle: 'Updated Hero Subtitle',
          cta: 'Updated CTA',
        },
      };
      const updatedHome = { ...homeTestHelper.validHomeData, ...updateData };
      vi.mocked(HomeModel.findOneAndUpdate).mockResolvedValue(updatedHome);

      const result = await homeService.updateHome(updateData);

      expect(HomeModel.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, { new: true, lean: true });
      expect(result).toEqual(updatedHome);
    });

    it('should return null when no home exists to update', async () => {
      const updateData = {
        hero: {
          title: 'Updated Hero Title',
          subtitle: 'Updated Hero Subtitle',
          cta: 'Updated CTA',
        },
      };
      vi.mocked(HomeModel.findOneAndUpdate).mockResolvedValue(null);

      const result = await homeService.updateHome(updateData);

      expect(HomeModel.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, { new: true, lean: true });
      expect(result).toBeNull();
    });

    it('should handle partial updates correctly', async () => {
      const updateData = {
        servicesHeader: 'Updated Services Header',
      };
      const updatedHome = { ...homeTestHelper.validHomeData, ...updateData };
      vi.mocked(HomeModel.findOneAndUpdate).mockResolvedValue(updatedHome);

      const result = await homeService.updateHome(updateData);

      expect(HomeModel.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, { new: true, lean: true });
      expect(result).toEqual(updatedHome);
    });

    it('should handle database errors during update', async () => {
      const updateData = {
        hero: {
          title: 'Updated Hero Title',
          subtitle: 'Updated Hero Subtitle',
          cta: 'Updated CTA',
        },
      };
      const error = new Error('Database connection failed');
      vi.mocked(HomeModel.findOneAndUpdate).mockRejectedValue(error);

      await expect(homeService.updateHome(updateData)).rejects.toThrow('Database connection failed');
      expect(HomeModel.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, { new: true, lean: true });
    });

    it('should handle validation errors during update', async () => {
      const updateData = {
        hero: {
          title: '',
          subtitle: 'Updated Hero Subtitle',
          cta: 'Updated CTA',
        },
      };
      const error = new Error('Validation failed: hero.title is required');
      vi.mocked(HomeModel.findOneAndUpdate).mockRejectedValue(error);

      await expect(homeService.updateHome(updateData)).rejects.toThrow('Validation failed: hero.title is required');
      expect(HomeModel.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, { new: true, lean: true });
    });

    it('should handle complex nested updates', async () => {
      const updateData = {
        hero: {
          title: 'Updated Hero Title',
          subtitle: 'Updated Hero Subtitle',
          cta: 'Updated CTA',
        },
        testimonials: [
          {
            testifier: 'New Testifier',
            company: 'New Company',
            message: 'New testimonial message',
          },
        ],
      };
      const updatedHome = { ...homeTestHelper.validHomeData, ...updateData };
      vi.mocked(HomeModel.findOneAndUpdate).mockResolvedValue(updatedHome);

      const result = await homeService.updateHome(updateData);

      expect(HomeModel.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, { new: true, lean: true });
      expect(result).toEqual(updatedHome);
    });
  });
}); 