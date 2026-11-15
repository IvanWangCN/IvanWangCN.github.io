import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNotes, noteUrl } from '../lib/notes';
import { site } from '../lib/site';

export async function GET(context: APIContext) {
  const notes = await getNotes();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site!,
    items: notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.date,
      description: note.data.summary ?? '',
      link: noteUrl(note),
    })),
  });
}
