import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 分类由目录结构决定，不在 frontmatter 里重复声明。
// 以 _ 开头的文件/目录不会被加载（_template.md、_drafts/）。
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]), // shortcut: 暂不生成标签页，等有跨分类串联的需求再加
  }),
});

export const collections = { notes };
