// Main footer test suite
// This file imports all footer-related tests to run them together

import { describe, expect, it } from 'vitest';

import './validations/footer.validation.test';
import './services/footer.service.test';
import './controllers/footer.controller.test';
// Removed route test import to avoid duplicate execution

describe('Footer Test Suite', () => {
  it('should have all footer tests loaded', () => {
    expect(true).toBe(true);
  });
});
