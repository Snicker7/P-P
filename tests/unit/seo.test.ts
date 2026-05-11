import { describe, it, expect } from 'vitest';
import { absoluteUrl, truncate, getMeta } from '~/lib/seo';

describe('absoluteUrl', () => {
  it('joins base URL and path', () => {
    expect(absoluteUrl('https://lovamediaco.com', '/about')).toBe('https://lovamediaco.com/about');
  });
  it('strips duplicate slashes', () => {
    expect(absoluteUrl('https://lovamediaco.com/', '/about')).toBe('https://lovamediaco.com/about');
  });
});

describe('truncate', () => {
  it('truncates a long string at word boundary, adds ellipsis', () => {
    const out = truncate('one two three four five six seven eight nine ten', 20);
    expect(out.length).toBeLessThanOrEqual(21);
    expect(out.endsWith('…')).toBe(true);
  });
  it('returns input unchanged if shorter than limit', () => {
    expect(truncate('short', 20)).toBe('short');
  });
});

describe('getMeta', () => {
  it('uses page overrides when provided', () => {
    const m = getMeta({
      pageTitle: 'Page',
      pageDescription: 'Page desc',
      seoTitleOverride: 'Custom Title',
      seoDescriptionOverride: 'Custom Desc',
      siteTitle: 'Lova',
      siteDescription: 'Default',
    });
    expect(m.title).toBe('Custom Title');
    expect(m.description).toBe('Custom Desc');
  });
  it('falls back to page-level then site-level', () => {
    const m = getMeta({
      pageTitle: 'Page',
      pageDescription: undefined,
      siteTitle: 'Lova',
      siteDescription: 'Default',
    });
    expect(m.title).toBe('Page | Lova');
    expect(m.description).toBe('Default');
  });
});
