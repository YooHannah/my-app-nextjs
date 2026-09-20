"use client";

import { useCallback, useEffect, useState } from "react";
import type { PostsResponse } from "../lib/posts";

export default function PostList() {
  const [data, setData] = useState<PostsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 只负责发请求与写入结果；函数内首次 setState 均在 await 之后，
  // 因此在 effect 中调用不会触发同步级联渲染。
  const fetchPosts = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await fetch("/api/posts", {
        signal,
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`服务端返回异常（HTTP ${res.status}）`);
      }

      const json = (await res.json()) as PostsResponse;
      setData(json);
      setError(null);
    } catch (err) {
      // 组件卸载导致的主动中止不算错误
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "发生未知错误");
    }
  }, []);

  // 首次加载：isLoading 初始值已是 true，effect 内无需同步 setState
  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      await fetchPosts(controller.signal);
      if (!controller.signal.aborted) setIsLoading(false);
    })();
    return () => controller.abort();
  }, [fetchPosts]);

  // 手动刷新：保留已有列表，仅按钮与列表进入 loading 态
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await fetchPosts();
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchPosts]);

  // 错误后重试：回到整页骨架屏
  const handleRetry = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await fetchPosts();
    } finally {
      setIsLoading(false);
    }
  }, [fetchPosts]);

  return (
    <section className="w-full">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            服务端文章列表
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            页面挂载后由前端调用{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.85em] dark:bg-white/[.08]">
              GET /api/posts
            </code>{" "}
            拉取数据
            {data ? (
              <>
                ，共 {data.total} 条 · 服务端时间{" "}
                {new Date(data.fetchedAt).toLocaleTimeString("zh-CN")}
              </>
            ) : null}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void handleRefresh()}
          disabled={isLoading || isRefreshing}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          <svg
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
            <path d="M21 3v6h-6" />
          </svg>
          {isRefreshing ? "刷新中…" : "刷新"}
        </button>
      </header>

      {error && data ? (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300"
        >
          刷新失败：{error}（当前展示的是上次成功获取的数据）
        </div>
      ) : null}

      {isLoading ? (
        <PostSkeleton />
      ) : error && !data ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-red-300 bg-red-50 px-6 py-16 text-center dark:border-red-500/40 dark:bg-red-500/10">
          <p className="text-base font-medium text-red-700 dark:text-red-300">
            数据加载失败：{error}
          </p>
          <button
            type="button"
            onClick={() => void handleRetry()}
            className="inline-flex h-9 items-center rounded-full bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500"
          >
            重新尝试
          </button>
        </div>
      ) : data ? (
        <ul
          className={`grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 ${
            isRefreshing ? "pointer-events-none opacity-50" : "opacity-100"
          }`}
        >
          {data.posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col gap-3 rounded-2xl border border-black/[.08] bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/[.12] dark:bg-zinc-900"
            >
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-base font-semibold leading-snug text-zinc-950 dark:text-zinc-50">
                {post.title}
              </h3>
              <p className="flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
                <span>{post.author}</span>
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                  · {post.views.toLocaleString("zh-CN")} 次阅读
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function PostSkeleton() {
  return (
    <ul
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      aria-label="数据加载中"
      aria-busy="true"
    >
      {Array.from({ length: 4 }, (_, i) => (
        <li
          key={i}
          className="flex animate-pulse flex-col gap-3 rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.12] dark:bg-zinc-900"
        >
          <div className="flex gap-1.5">
            <div className="h-5 w-14 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>
          <div className="h-5 w-4/5 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-1 flex justify-between">
            <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-28 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </li>
      ))}
    </ul>
  );
}
