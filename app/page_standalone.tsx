import Link from "next/link";
import PostList from "./components/post-list";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <nav className="mb-10 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          AllStack Demo
        </span>
        <Link
          href="/about"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium text-zinc-700 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-300 dark:hover:bg-white/[.1]"
        >
          关于页面
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </nav>
      <PostList />
    </main>
  );
}
