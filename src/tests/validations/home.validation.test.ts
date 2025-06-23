import { describe, expect, it } from 'vitest';
import homeZodSchema from '../../validations/home.validation';
import homeTestHelper from '../helpers/home.test.helper';

describe('homeZodSchema', () => {
  it('accepts valid home data', () => {
    const validData = homeTestHelper.validHomeData;

    const result = homeZodSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('rejects when heroTitle is missing', () => {
    const result = homeZodSchema.safeParse(homeTestHelper.noHeroTitleHomeData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('heroTitle');
    }
  });

  it('rejects when testimonials is not an array', () => {
    const result = homeZodSchema.safeParse(homeTestHelper.badTestimonialsHomeData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('testimonials');
    }
  });

  it('rejects when testimonial message is empty', () => {
    const result = homeZodSchema.safeParse(homeTestHelper.emptyTestimonialsHomeData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('testimonials');
    }
  });

  it('rejects when services is not an array', () => {
    const result = homeZodSchema.safeParse(homeTestHelper.badServicesHomeData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('services');
    }
  });

  it('rejects when a service is missing title', () => {
    const result = homeZodSchema.safeParse(homeTestHelper.missingServiceTitleHomeData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('services.0.title');
    }
  });

  it('rejects when a service item is missing description', () => {
    const result = homeZodSchema.safeParse(homeTestHelper.missingServiceItemDescriptionHomeData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errorMessages = result.error.errors.map(e => e.path.join('.'));
      expect(errorMessages).toContain('services.0.items.0.description');
    }
  });
});
