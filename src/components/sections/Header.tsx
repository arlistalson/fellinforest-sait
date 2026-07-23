import { motion, type Variants } from "framer-motion";
import Button from "../Button";

const underlineVariants: Variants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

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
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#" className="logo">
          <img src="/images/logo3.png" alt="Fellin Forest" className="logo-full" />
        </a>
        <nav>
          <NavLink href="#teenused">Teenused</NavLink>
          <NavLink href="#raieoigus">Raieõigus</NavLink>
          <NavLink href="#protsess">Kuidas käib</NavLink>
          <NavLink href="#kontakt">Kontakt</NavLink>
          <Button href="#hinnaparing" className="nav-cta">Küsi pakkumist</Button>
        </nav>
      </div>
    </header>
  );
}
