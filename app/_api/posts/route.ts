import { getPosts, type PostsResponse } from "../../lib/posts";

// 注意：本目录以 "_" 开头，是 Next.js 的「私有文件夹」。
// 不会被路由系统收集，因此 output: "export" 静态构建时会跳过它。
// 需要恢复为真实 API 时( output: "standalone" )，把目录名 _api 改回 api 即可（并改用支持 Node 服务的 output）。
// Route Handler 默认不缓存，每次请求都会执行，保证前端拉到最新服务端数据
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const posts = await getPosts();

  const body: PostsResponse = {
    posts,
    total: posts.length,
    fetchedAt: new Date().toISOString(),
  };

  return Response.json(body);
}