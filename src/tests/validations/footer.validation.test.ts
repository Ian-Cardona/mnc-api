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

  it('rejects when info is missing', () => {
    const result = footerZodSchema.safeParse(footerTestHelper.noInfoFooterData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('info');
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

  it('rejects invalid social platform', () => {
    const result = footerZodSchema.safeParse(footerTestHelper.invalidSocialPlatformFooterData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('socials.0.platform');
    }
  });

  it('rejects when form fields are missing', () => {
    const result = footerZodSchema.safeParse(footerTestHelper.missingFormFieldsFooterData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('form.subheader');
    }
  });

  it('rejects when required fields are missing', () => {
    const invalidData = {
      form: footerTestHelper.validFooterData.form,
      socials: footerTestHelper.validFooterData.socials,
      // missing info, copyright, links
    };

    const result = footerZodSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('info');
      expect(errorMessages).toContain('copyright');
      expect(errorMessages).toContain('links');
    }
  });

  it('rejects empty socials array', () => {
    const invalidData = {
      ...footerTestHelper.validFooterData,
      socials: [],
    };

    const result = footerZodSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('socials');
    }
  });

  it('rejects invalid social object structure', () => {
    const invalidData = {
      ...footerTestHelper.validFooterData,
      socials: [
        { platform: 'facebook' }, // missing url
      ],
    };

    const result = footerZodSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('socials.0.url');
    }
  });
});
