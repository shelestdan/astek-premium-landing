const GITHUB_PAGES_BASE_PATH = "/astek-premium-landing";

const basePath =
  process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages" ? GITHUB_PAGES_BASE_PATH : "";

export function assetPath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  return `${basePath}${path}`;
}
