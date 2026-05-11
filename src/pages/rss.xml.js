import rss from '@astrojs/rss';
import { getCollection, getEntry } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('journal', e => e.data.published))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const settings = (await getEntry('settings', 'site')).data;
  return rss({
    title: `${settings.siteTitle} — Journal`,
    description: 'Notes on floral design, seasonal palettes, and the details that shape an event.',
    site: context.site,
    items: posts.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.excerpt,
      link: `/journal/${p.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
