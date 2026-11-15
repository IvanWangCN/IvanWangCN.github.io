import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

/** 全部笔记，按日期倒序；生产构建里过滤掉 draft */
export async function getNotes(): Promise<Note[]> {
  const all = await getCollection('notes', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** note.id 就是它相对 notes/ 的路径，去掉扩展名：tech/llm/foo */
export const catOf = (note: Note) => note.id.split('/').slice(0, -1).join('/');
export const noteUrl = (note: Note) => `/notes/${note.id}/`;
export const fmtDate = (date: Date) => date.toISOString().slice(0, 10);

/** 目录树里出现过的全部分类路径，含中间层 */
export function allCats(notes: Note[]): string[] {
  const set = new Set<string>();
  for (const note of notes) {
    const parts = note.id.split('/').slice(0, -1);
    for (let i = 1; i <= parts.length; i++) set.add(parts.slice(0, i).join('/'));
  }
  return [...set].sort();
}

/** 该目录（含子目录）下的所有笔记 */
export function notesIn(notes: Note[], dir: string): Note[] {
  return notes.filter((n) => {
    const cat = catOf(n);
    return dir ? cat === dir || cat.startsWith(dir + '/') : true;
  });
}

/** 直接子分类，一层 */
export function subCats(notes: Note[], dir: string): string[] {
  const prefix = dir ? dir + '/' : '';
  const set = new Set<string>();
  for (const n of notes) {
    if (!n.id.startsWith(prefix)) continue;
    const rest = n.id.slice(prefix.length).split('/');
    if (rest.length > 1) set.add(prefix + rest[0]);
  }
  return [...set].sort();
}

/** 同一分类（不含子目录）下的前后篇，notes 需已按日期倒序 */
export function siblings(notes: Note[], current: Note) {
  const cat = catOf(current);
  const same = notes.filter((n) => catOf(n) === cat);
  const i = same.findIndex((n) => n.id === current.id);
  return { newer: same[i - 1], older: same[i + 1] };
}

export function readingTime(note: Note): string {
  // 中文按 400 字/分钟粗估
  const chars = (note.body ?? '').replace(/\s/g, '').length;
  return `${Math.max(1, Math.round(chars / 400))} 分钟`;
}
