// 目录路径 → 显示名。新增分类目录时在这里补一行，不补也能跑（回退成文件夹名）。
export type CatMeta = { title: string; desc?: string };

export const cats: Record<string, CatMeta> = {
  tech: { title: '技术', desc: '工程、架构、踩过的坑' },
  'tech/llm': { title: '大模型应用', desc: 'RAG、Agent、评测' },
  'tech/frontend': { title: '前端', desc: '这个站本身也算' },
  work: { title: '日常工作', desc: '项目复盘与周记' },
  reading: { title: '读书笔记', desc: '读完要留下点什么' },
};

export function catMeta(path: string): CatMeta {
  return cats[path] ?? { title: path.split('/').pop() || path };
}

/** '' → []; 'tech/llm' → [{tech}, {tech/llm}] */
export function catCrumb(path: string) {
  const parts = path ? path.split('/') : [];
  return parts.map((_, i) => {
    const sub = parts.slice(0, i + 1).join('/');
    return { path: sub, ...catMeta(sub) };
  });
}
