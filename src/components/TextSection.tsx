import type { ReactNode } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { fadeUp, staggerContainer, staggerItem } from "../motion/variants";

interface TextSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  tint?: boolean;
  /** Pealkiri keskele (vaikimisi vasakule, sest sisulehtedel loeb loetavus) */
  centered?: boolean;
}

export default function TextSection({
  id,
  eyebrow,
  title,
  children,
  tint,
  centered,
}: TextSectionProps) {
  return (
    <AnimatedSection id={id} className={`section${tint ? " section-tint" : ""}`} variant={fadeUp}>
      <div className="container">
        {eyebrow && <p className={`eyebrow${centered ? " center" : ""}`}>{eyebrow}</p>}
        <h2 className={centered ? "" : "left"}>{title}</h2>
        <div className="prose">{children}</div>
      </div>
    </AnimatedSection>
  );
}

export function ArrowList({ items }: { items: string[] }) {
  return (
    <motion.ul
      className="arrow-list"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      {items.map((item) => (
        <motion.li key={item} variants={staggerItem}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

export interface InfoCard {
  title: string;
  desc: string;
}

export function InfoGrid({ cards }: { cards: InfoCard[] }) {
  return (
    <motion.div
      // Neli kaarti näeb 2×2 paremini välja kui 3+1
      className={`info-grid${cards.length === 4 ? " info-grid--two" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      {cards.map((card) => (
        <motion.div className="info-card" key={card.title} variants={staggerItem}>
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
