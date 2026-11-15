---
title: 用目录结构管理笔记分类
date: 2025-11-10
summary: 这个站点本身的组织方式，顺便当格式示例。
tags: [astro]
---

文件名和目录名就是 URL，也是分类。没有额外的分类表要维护。

```
src/content/notes/tech/llm/llm-as-classifier.md
→ /notes/tech/llm/llm-as-classifier/
→ 分类：技术 / 大模型应用
```

## 加一个新分类

建目录，丢一篇 `.md` 进去，完事。想让它显示中文名，在 `src/lib/categories.ts` 里补一行：

```ts
'tech/llm': { title: '大模型应用', desc: 'RAG、Agent、评测' },
```

## 文件名规则

用英文小写加连字符。中文文件名会被 slug 化，URL 会变得不好认。
