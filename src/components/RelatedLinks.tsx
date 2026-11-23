import { motion } from "framer-motion";
import { useReveal } from "../motion/reveal";
import AnimatedSection from "./AnimatedSection";
import { Link } from "../router";
import { cardPop, fadeUp, staggerContainer, staggerItem } from "../motion/variants";

export interface RelatedLink {
  to: string;
  title: string;
  desc: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
}

export default function RelatedLinks({ title = "Loe ka", links }: RelatedLinksProps) {
  const gridReveal = useReveal<HTMLDivElement>(0.15);

  return (
    <AnimatedSection className="section section-tint" variant={fadeUp}>
      <div className="container">
        <p className="eyebrow center">Seotud teemad</p>
        <h2>{title}</h2>
        <motion.div
          className="related-grid"
          {...gridReveal}
          variants={staggerContainer}
        >
          {links.map((link) => (
            <motion.div key={link.to} variants={staggerItem} {...cardPop}>
              <Link to={link.to} className="related-card">
                <h3>{link.title}</h3>
                <p>{link.desc}</p>
                <span className="card-link">Loe lähemalt →</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
