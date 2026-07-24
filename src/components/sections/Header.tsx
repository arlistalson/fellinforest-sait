import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Button from "../Button";

const underlineVariants: Variants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

const NAV_LINKS = [
  { href: "#teenused", label: "Teenused" },
  { href: "#raieoigus", label: "Raieõigus" },
  { href: "#protsess", label: "Kuidas käib" },
  { href: "#kontakt", label: "Kontakt" },
];

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <motion.a
      href={href}
      initial="rest"
      whileHover="hover"
      style={{ position: "relative", display: "inline-block", paddingBottom: 2 }}
    >
      {children}
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
    </motion.a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Mobile CTA — left */}
        <a
          href="#hinnaparing"
          className="nav-cta-mobile"
          onClick={() => setOpen(false)}
        >
          Küsi pakkumist
        </a>

        <a href="#" className="logo">
          <img src="/images/logo3.png" alt="Fellin Forest" className="logo-full" />
        </a>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
          <Button href="#hinnaparing" className="nav-cta">
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
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
