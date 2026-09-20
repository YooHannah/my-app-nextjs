
/**
 * 服务端数据源（模拟数据库表 + 查询）。
 * 仅在服务端被 Route Handler 引用，不会打包进客户端 bundle。
 */
export interface Post {
  id: number;
  title: string;
  author: string;
  excerpt: string;
  tags: string[];
  views: number;
  publishedAt: string; // ISO 8601
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  fetchedAt: string; // 服务端生成时间，便于前端确认数据来自服务端
}

const POSTS: Post[] = [
  {
    id: 1,
    title: "Next.js 16 App Router 实践指南",
    author: "张三",
    excerpt:
      "介绍 App Router 下 Server Components、Route Handlers 与缓存模型的协作方式，以及从 Pages Router 迁移的注意事项。",
    tags: ["Next.js", "React"],
    views: 1280,
    publishedAt: "2026-09-18T09:30:00.000Z",
  },
  {
    id: 2,
    title: "TypeScript 严格模式下的 API 类型设计",
    author: "李四",
    excerpt:
      "如何用接口与判别联合为前后端接口建立端到端的类型安全，减少运行时因数据结构不一致导致的 Bug。",
    tags: ["TypeScript", "架构"],
    views: 864,
    publishedAt: "2026-09-17T03:12:00.000Z",
  },
  {
    id: 3,
    title: "Tailwind CSS v4 新特性速览",
    author: "王五",
    excerpt:
      "Tailwind v4 基于新引擎重写，配置方式、主题变量与 PostCSS 插件都有变化，本文梳理升级要点。",
    tags: ["CSS", "Tailwind"],
    views: 2048,
    publishedAt: "2026-09-15T14:05:00.000Z",
  },
  {
    id: 4,
    title: "LLM Agent 服务端流式输出实现",
    author: "赵六",
    excerpt:
      "结合 A2A SDK 探讨 Agent 服务如何通过流式响应向前端持续推送中间状态，并处理中断与重试。",
    tags: ["LLM", "Agent", "后端"],
    views: 3175,
    publishedAt: "2026-09-12T08:45:00.000Z",
  },
];

/** 模拟一次异步数据库查询（约 600ms 网络/IO 延迟）。 */
export async function getPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  // 按发布时间倒序返回，模拟 DB ORDER BY published_at DESC
  return [...POSTS].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}