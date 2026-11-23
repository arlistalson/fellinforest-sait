import { Link } from "../router";

interface BreadcrumbsProps {
  current: string;
  /** Vahepealne tase, nt artikli puhul "Artiklid" */
  parent?: { to: string; label: string };
}

export default function Breadcrumbs({ current, parent }: BreadcrumbsProps) {
  return (
    <nav className="crumbs" aria-label="Asukoht lehel">
      <Link to="/">Avaleht</Link>
      <span aria-hidden="true">/</span>
      {parent && (
        <>
          <Link to={parent.to}>{parent.label}</Link>
          <span aria-hidden="true">/</span>
        </>
      )}
      <span className="crumbs-current">{current}</span>
    </nav>
  );
}
