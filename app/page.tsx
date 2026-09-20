import type { ReactNode } from "react";

const FEATURES: {
  title: string;
  desc: string;
  icon: ReactNode;
}[] = [
  {
    title: "服务端渲染",
    desc: "页面在服务端生成 HTML，首屏更快且对搜索引擎友好，同时可按需在节点上直接查询数据。",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "文件系统路由",
    desc: "在 app 目录下新建文件即成为路由，配合 Link 实现无刷新跳转，链接还会自动预取。",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      </svg>
    ),
  },
  {
    title: "内置接口能力",
    desc: "通过 Route Handlers 在同一项目中编写 API，前后端共享 TypeScript 类型，端到端类型安全。",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-20">
      {/* Hero 区域 */}
      <section className="flex flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/[.08] bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/[.145] dark:bg-zinc-900 dark:text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Next.js 16 · App Router · Tailwind CSS v4
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          用一套技术栈，构建全栈 Web 应用
        </h1>
        <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          服务端渲染、文件路由与接口能力开箱即用。这个静态页面不依赖任何接口请求，
          打开即可看到完整内容，适合作为落地页与营销页的起点。
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a
            href="/about"
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            了解更多
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 text-sm font-medium text-zinc-700 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-300 dark:hover:bg-white/[.1]"
          >
            查看文档
          </a>
        </div>
      </section>

      {/* 特性卡片 */}
      <section className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className="flex flex-col gap-3 rounded-2xl border border-black/[.08] bg-white p-6 dark:border-white/[.12] dark:bg-zinc-900"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
              {feature.icon}
            </div>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              {feature.title}
            </h2>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {feature.desc}
            </p>
          </article>
        ))}
      </section>

      <iframe
        src= "https://www.bilibili.com/?spm_id_from=333.337.0.0" 
        title= "bilibili" 
        style={{
          width: "100%",
          height: "500px",  
          border: "0",
          borderRadius: "4px",
        }}
      />
    </main>
  );
}