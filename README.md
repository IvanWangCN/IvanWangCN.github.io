# ivanwangcn.github.io

个人主页 + 笔记站。Astro 静态输出，托管在 GitHub Pages。

## 本地跑

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 产物在 dist/
```

## 加一篇笔记

1. 在 `src/content/notes/` 下对应的分类目录里新建 `.md`（文件名用英文小写加连字符）
2. 打开 `src/content/notes/_template.md` 复制 frontmatter
3. 写正文，`git push`

目录路径就是 URL 和分类：

```
src/content/notes/tech/llm/rag.md
→ /notes/tech/llm/rag/
→ 分类：技术 / 大模型应用
```

新建分类 = 建一个目录。想在页面上显示中文名，去 `src/lib/categories.ts` 补一行（不补就用文件夹名）。

注意：

- 以 `_` 开头的文件/目录不会被发布，可以放 `_drafts/`
- 不要用 `index.md` 当文件名，会和分类页撞路由
- `draft: true` 只在本地可见，构建时会被过滤

## 改个人信息

全部在 `src/lib/site.ts`：名字、定位、简介、邮箱、GitHub、Now 卡片、项目列表。

## 部署

推到 `main` 后 GitHub Actions 自动构建发布。
**首次需要在仓库 Settings → Pages 把 Source 改成「GitHub Actions」。**
