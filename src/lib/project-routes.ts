export const LEGACY_PROJECT_PATHS = [
  "/36-days-of-type",
  "/custom-type",
  "/demure",
  "/illustrations",
  "/pondicherry-botanical-garden",
  "/stack-results",
  "/wellim",
] as const;

export function isProjectPath(pathname: string) {
  return (
    pathname.startsWith("/projects/") ||
    LEGACY_PROJECT_PATHS.some((path) => path === pathname)
  );
}
