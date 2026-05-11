export function absoluteUrl(base: string, path: string): string {
  return base.replace(/\/$/, '') + (path.startsWith('/') ? path : '/' + path);
}

export function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max).replace(/\s+\S*$/, '');
  return cut + '…';
}

export interface MetaInput {
  pageTitle: string;
  pageDescription?: string;
  seoTitleOverride?: string;
  seoDescriptionOverride?: string;
  siteTitle: string;
  siteDescription: string;
}

export function getMeta(input: MetaInput) {
  const title =
    input.seoTitleOverride ||
    (input.pageTitle === input.siteTitle ? input.siteTitle : `${input.pageTitle} | ${input.siteTitle}`);
  const description =
    input.seoDescriptionOverride ||
    input.pageDescription ||
    input.siteDescription;
  return { title, description };
}
