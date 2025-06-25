/* eslint-disable @typescript-eslint/unbound-method */
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { FooterModel } from '../../models/footer.model';
import footerService from '../../services/footer.service';
import footerTestHelper from '../helpers/footer.test.helper';
import type { IFooter } from '../../types/footer.types';

vi.mock('../../models/footer.model');

describe('Footer Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getFooter', () => {
    it('should return footer data when found', async () => {
      const mockFooter = {
        ...footerTestHelper.validFooterData,
        _id: 'mock-id',
        toObject: (): IFooter => footerTestHelper.validFooterData,
      };

      vi.mocked(FooterModel.findOne).mockResolvedValue(mockFooter as any);

      const result = await footerService.getFooter();

      expect(FooterModel.findOne).toHaveBeenCalledWith({});
      expect(result).toEqual(mockFooter);
    });

    it('should return null when no footer found', async () => {
      vi.mocked(FooterModel.findOne).mockResolvedValue(null);

      const result = await footerService.getFooter();

      expect(FooterModel.findOne).toHaveBeenCalledWith({});
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      vi.mocked(FooterModel.findOne).mockRejectedValue(error);

      await expect(footerService.getFooter()).rejects.toThrow('Database connection failed');
      expect(FooterModel.findOne).toHaveBeenCalledWith({});
    });
  });

  describe('addFooter', () => {
    it('should create and return new footer', async () => {
      const newFooterData = footerTestHelper.validFooterData;
      const createdFooter = {
        ...newFooterData,
        _id: 'new-footer-id',
        toObject: (): IFooter => newFooterData,
      };

      vi.mocked(FooterModel.create).mockResolvedValue(createdFooter as any);

      const result = await footerService.addFooter(newFooterData);

      expect(FooterModel.create).toHaveBeenCalledWith(newFooterData);
      expect(result).toEqual(createdFooter);
    });

    it('should handle validation errors during creation', async () => {
      const invalidFooterData = footerTestHelper.badSocialsFooterData;
      const error = new Error('Validation failed');
      vi.mocked(FooterModel.create).mockRejectedValue(error);

      await expect(footerService.addFooter(invalidFooterData as any)).rejects.toThrow('Validation failed');
      expect(FooterModel.create).toHaveBeenCalledWith(invalidFooterData);
    });

    it('should handle database errors during creation', async () => {
      const newFooterData = footerTestHelper.validFooterData;
      const error = new Error('Database connection failed');
      vi.mocked(FooterModel.create).mockRejectedValue(error);

      await expect(footerService.addFooter(newFooterData)).rejects.toThrow('Database connection failed');
      expect(FooterModel.create).toHaveBeenCalledWith(newFooterData);
    });
  });

  describe('updateFooter', () => {
    it('should update and return footer with partial data', async () => {
      const updateData = {
        copyright: '© 2026 MNC Bookkeeping Services PH',
        'info.email': 'newemail@mncbookkeeping.ph',
      };
      const updatedFooter = {
        ...footerTestHelper.validFooterData,
        ...updateData,
        _id: 'footer-id',
        toObject: (): IFooter => ({ ...footerTestHelper.validFooterData, ...updateData }),
      };

      vi.mocked(FooterModel.findOneAndUpdate).mockResolvedValue(updatedFooter as any);

      const result = await footerService.updateFooter(updateData as any);

      expect(FooterModel.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, { new: true, lean: true });
      expect(result).toEqual(updatedFooter);
    });

    it('should return null when no footer exists to update', async () => {
      const updateData = { copyright: 'Updated copyright' };
      vi.mocked(FooterModel.findOneAndUpdate).mockResolvedValue(null);

      const result = await footerService.updateFooter(updateData);

      expect(FooterModel.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, { new: true, lean: true });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      const updateData = { copyright: 'Updated copyright' };
      const error = new Error('Database connection failed');
      vi.mocked(FooterModel.findOneAndUpdate).mockRejectedValue(error);

      await expect(footerService.updateFooter(updateData)).rejects.toThrow('Database connection failed');
      expect(FooterModel.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, { new: true, lean: true });
    });

    it('should update nested fields correctly', async () => {
      const updateData = {
        'form.header': 'Updated Header',
        'info.address': '456 New Street, Manila, Philippines',
        'socials.0.url': 'https://facebook.com/mnc-updated',
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
        socials: [
          { platform: 'facebook', url: 'https://facebook.com/mnc-updated' },
          ...footerTestHelper.validFooterData.socials.slice(1),
        ],
      };

      vi.mocked(FooterModel.findOneAndUpdate).mockResolvedValue(updatedFooter as any);

      const result = await footerService.updateFooter(updateData as any);

      expect(FooterModel.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, { new: true, lean: true });
      expect(result).toEqual(updatedFooter);
    });
  });
});
