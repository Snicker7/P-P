import { describe, it, expect } from 'vitest';
import { formatDate, slugify, formatPrice } from '~/lib/format';

describe('formatDate', () => {
  it('formats an ISO date as "Month D, YYYY"', () => {
    expect(formatDate(new Date('2026-09-14'))).toBe('September 14, 2026');
  });
  it('handles single-digit days', () => {
    expect(formatDate(new Date('2026-09-04'))).toBe('September 4, 2026');
  });
});

describe('slugify', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('Emma & Jack')).toBe('emma-and-jack');
  });
  it('strips diacritics', () => {
    expect(slugify('Herrgård')).toBe('herrgard');
  });
  it('collapses repeated hyphens', () => {
    expect(slugify('a   b   c')).toBe('a-b-c');
  });
});

describe('formatPrice', () => {
  it('formats integer cents as USD with no decimals', () => {
    expect(formatPrice(650)).toBe('$650');
    expect(formatPrice(1200)).toBe('$1,200');
  });
});
