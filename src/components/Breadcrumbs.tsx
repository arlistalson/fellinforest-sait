import { Link } from "../router";

export default function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav className="crumbs" aria-label="Asukoht lehel">
      <Link to="/">Avaleht</Link>
      <span aria-hidden="true">/</span>
      <span className="crumbs-current">{current}</span>
    </nav>
  );
}
