import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Button from "../Button";
import { Link, useRouter } from "../../router";

const underlineVariants: Variants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

const NAV_LINKS = [
  { to: "/metsakinnistute-ost/", label: "Metsakinnistud" },
  { to: "/raieoiguse-ost/", label: "Raieõigus" },
  { to: "/pollumaa-ost/", label: "Põllumaa" },
  { to: "/hinnakujundus/", label: "Hinnakujundus" },
  { to: "/kontakt/", label: "Kontakt" },
];

function NavLink({ to, children, current }: { to: string; children: string; current: boolean }) {
  return (
    <motion.span initial="rest" whileHover="hover" style={{ position: "relative", display: "inline-block" }}>
      <Link
        to={to}
        aria-current={current ? "page" : undefined}
        style={{ position: "relative", display: "inline-block", paddingBottom: 2 }}
      >
        {children}
      </Link>
      <motion.span
        variants={underlineVariants}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          borderRadius: 2,
          background: "currentColor",
          transformOrigin: "left",
        }}
      />
    </motion.span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { path } = useRouter();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lehe vahetumisel sulgeme mobiilimenüü.
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo" aria-label="Fellin Forest – avaleht">
          <img src="/images/logo3.png" alt="Fellin Forest" className="logo-full" width="240" height="72" />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop" aria-label="Peamenüü">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} current={path === l.to}>
              {l.label}
            </NavLink>
          ))}
          <Button href="/kontakt/#hinnaparing" className="nav-cta">
            Küsi pakkumist
          </Button>
        </nav>

        {/* Mobile hamburger — right */}
        <button
          type="button"
          className={`nav-toggle${open ? " open" : ""}`}
          aria-label={open ? "Sulge menüü" : "Ava menüü"}
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Mobile dropdown */}
        <div id="mobileMenu" className={`mobile-menu${open ? " open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/metsamajandamine/" onClick={() => setOpen(false)}>
            Metsamajandamine
          </Link>
          <Link to="/viljandimaa/" onClick={() => setOpen(false)}>
            Piirkonnad
          </Link>
          <Link to="/kontakt/#hinnaparing" className="nav-cta-mobile" onClick={() => setOpen(false)}>
            Küsi pakkumist
          </Link>
        </div>
      </div>
    </header>
  );
}
