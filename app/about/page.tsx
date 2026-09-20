import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于 | AllStack Demo",
  description: "关于本应用的技术栈与数据流说明",
};

const TECH_STACK: { name: string; desc: string }[] = [
  { name: "Next.js 16", desc: "App Router + Route Handlers + Turbopack" },
  { name: "React 19", desc: "Server / Client Components 边界" },
  { name: "TypeScript 5", desc: "前后端共享严谨的接口类型" },
  { name: "Tailwind CSS v4", desc: "原子化样式，零运行时配置" },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        返回首页
      </Link>

      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        关于本应用
      </h1>
      <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        这是一个演示「前端调用接口拉取服务端数据」的全栈最小示例。首页挂载后由客户端
        发起 <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.85em] dark:bg-white/[.08]">GET /api/posts</code>
        ，服务端 Route Handler 查询数据源后返回 JSON，前端渲染文章卡片。
      </p>

      <h2 className="mt-10 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
        技术栈
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {TECH_STACK.map((item) => (
          <li
            key={item.name}
            className="rounded-2xl border border-black/[.08] bg-white p-4 dark:border-white/[.12] dark:bg-zinc-900"
          >
            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              {item.name}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {item.desc}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          回到文章列表
        </Link>
      </div>
    </main>
  );
}
