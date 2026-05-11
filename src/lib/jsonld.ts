type Settings = {
  siteTitle: string;
  seoDescription: string;
  inquiryEmail: string;
  serviceArea: string;
  instagram: string;
  tiktok: string;
};

const sameAs = (s: Settings) => [
  `https://instagram.com/${s.instagram}`,
  `https://tiktok.com/@${s.tiktok}`,
];

export function localBusiness(s: Settings, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: s.siteTitle,
    description: s.seoDescription,
    email: s.inquiryEmail,
    url: baseUrl,
    image: `${baseUrl}/og-default.png`,
    areaServed: s.serviceArea,
    sameAs: sameAs(s),
  };
}

export function person(s: Settings, url: string, name: string, jobTitle: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    url,
    sameAs: sameAs(s),
    worksFor: { '@type': 'Organization', name: s.siteTitle },
  };
}

export function service(name: string, priceText: string, url: string, baseUrl: string, s: Settings) {
  const numericPrice = priceText.replace(/[$,]/g, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    provider: { '@type': 'LocalBusiness', name: s.siteTitle, url: baseUrl },
    areaServed: s.serviceArea,
    url,
    offers: {
      '@type': 'Offer',
      price: numericPrice,
      priceCurrency: 'USD',
    },
  };
}

export function article(p: {
  title: string; date: Date; url: string; image: string; excerpt: string;
}, s: Settings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date.toISOString().slice(0, 10),
    author: { '@type': 'Organization', name: s.siteTitle },
    publisher: { '@type': 'Organization', name: s.siteTitle },
    image: p.image,
    mainEntityOfPage: p.url,
  };
}

export function video(p: {
  name: string; description: string; contentUrl: string; thumbnailUrl: string; uploadDate: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: p.name,
    description: p.description,
    thumbnailUrl: p.thumbnailUrl,
    contentUrl: p.contentUrl,
    uploadDate: p.uploadDate.toISOString().slice(0, 10),
  };
}

export function breadcrumb(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function website(name: string, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/journal?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
