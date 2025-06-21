import { describe, expect, it } from 'vitest';
import footerZodSchema from '../../validations/footer.validation';
import footerTestHelper from '../helpers/footer.test.helper';

describe('footerZodSchema', () => {
  it('accepts valid footer data', () => {
    const validData = footerTestHelper.validFooterData;

    const result = footerZodSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('rejects when address is missing', () => {
    const result = footerZodSchema.safeParse(footerTestHelper.noAddressFooterData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('address');
    }
  });

  it('rejects when socials is not an array', () => {
    const result = footerZodSchema.safeParse(footerTestHelper.badSocialsFooterData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('socials');
    }
  });

  it('accepts empty links array', () => {
    const result = footerZodSchema.safeParse(footerTestHelper.emptyLinksFooterData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.links).toEqual([]);
    }
  });
});
