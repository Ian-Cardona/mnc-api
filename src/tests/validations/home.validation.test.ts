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

  it('rejects when hero title is missing', () => {
    const invalidData = {
      ...homeTestHelper.validHomeData,
      hero: {
        ...homeTestHelper.validHomeData.hero,
        title: '',
      },
    };
    const result = homeZodSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toEqual(expect.any(String));
    }
  });

  it('rejects when testimonials is not an array', () => {
    const invalidData = {
      ...homeTestHelper.validHomeData,
      testimonials: 'not an array',
    };
    const result = homeZodSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toEqual(expect.any(String));
    }
  });

  it('rejects when testimonials array is empty', () => {
    const result = homeZodSchema.safeParse(homeTestHelper.emptyTestimonialsData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toEqual('At least one testimonial is required');
    }
  });

  it('rejects when services is not an array', () => {
    const invalidData = {
      ...homeTestHelper.validHomeData,
      services: 'not an array',
    };
    const result = homeZodSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toEqual(expect.any(String));
    }
  });

  it('rejects when a service is missing title', () => {
    const invalidData = {
      ...homeTestHelper.validHomeData,
      services: [
        {
          items: [{ description: 'Some service' }],
        },
      ],
    };
    const result = homeZodSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toEqual(expect.any(String));
    }
  });

  it('rejects when a service item is missing description', () => {
    const invalidData = {
      ...homeTestHelper.validHomeData,
      services: [
        {
          title: 'Some Service',
          items: [{}],
        },
      ],
    };
    const result = homeZodSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toEqual(expect.any(String));
    }
  });
});
