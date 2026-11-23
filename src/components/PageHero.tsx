import { motion } from "framer-motion";
import { fadeUp } from "../motion/variants";
import { useReveal } from "../motion/reveal";
import Breadcrumbs from "./Breadcrumbs";
import Button from "./Button";
import PhoneIcon from "./icons/PhoneIcon";
import { BUSINESS } from "../content/business";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead: string;
  crumb: string;
  /** Vahepealne teekonna tase, nt artikli puhul "Artiklid" */
  parent?: { to: string; label: string };
  /** Väike rida pealkirja all, nt avaldamise kuupäev */
  meta?: string;
}

export default function PageHero({ eyebrow, title, lead, crumb, parent, meta }: PageHeroProps) {
  const reveal = useReveal(0);

  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs current={crumb} parent={parent} />
        <motion.div {...reveal} variants={fadeUp}>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {meta && <p className="page-hero-meta">{meta}</p>}
          <p className="page-hero-lead">{lead}</p>
          <div className="hero-actions">
            <Button href="/kontakt/#hinnaparing" className="btn btn-solid">
              Küsi tasuta pakkumist
            </Button>
            <Button href={`tel:${BUSINESS.phone}`} className="btn btn-ghost" icon={<PhoneIcon />}>
              Helista: {BUSINESS.phoneShort}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
