import { motion } from "framer-motion";
import { fadeUp } from "../motion/variants";
import Breadcrumbs from "./Breadcrumbs";
import Button from "./Button";
import PhoneIcon from "./icons/PhoneIcon";
import { BUSINESS } from "../content/business";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead: string;
  crumb: string;
}

export default function PageHero({ eyebrow, title, lead, crumb }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs current={crumb} />
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
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
