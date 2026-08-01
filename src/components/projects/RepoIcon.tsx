export function RepoIcon({
  className = "text-base shrink-0 text-muted-foreground",
}: {
  className?: string;
}) {
  return <i className={`nf nf-oct-repo ${className}`} aria-hidden="true" />;
}
