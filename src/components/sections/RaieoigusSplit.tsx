import { motion } from "framer-motion";
import { useReveal } from "../../motion/reveal";
import AnimatedSection from "../AnimatedSection";
import { fadeIn, slideLeft, slideRight, staggerContainer, staggerItem } from "../../motion/variants";
import Button from "../Button";

const POINTS = [
  "Maa jääb sinu omandisse",
  "Raha laekub enne raie algust",
  "Raie toimub metsateatise ja seaduse järgi",
  "Peale raiet korrastatud raiesmik",
  "Soovi korral aitame uue metsa istutamisega",
];

export default function RaieoigusSplit() {
  const photosReveal = useReveal<HTMLDivElement>(0.2);
  const textReveal = useReveal<HTMLDivElement>(0.2);
  const pointsReveal = useReveal<HTMLUListElement>(0.2);

  return (
    <AnimatedSection id="raieoigus" className="section" variant={fadeIn}>
      <div className="container split">
        <motion.div
          className="photo-collage"
          {...photosReveal}
          variants={slideRight}
        >
          <div className="photo photo-a" style={{ backgroundImage: "url('/images/mets-1.webp')" }} />
          <div className="photo photo-b" style={{ backgroundImage: "url('/images/mets-2.webp')" }} />
        </motion.div>
        <motion.div
          className="split-text"
          {...textReveal}
          variants={slideLeft}
        >
          <p className="eyebrow">Raieõigus</p>
          <h2 className="left">Mis on raieõiguse müük?</h2>
          <p>
            Raieõiguse müük tähendab, et müüd ainult õiguse metsa raiuda –{" "}
            <strong>maa jääb sinu omandisse</strong>. See sobib metsaomanikule, kes soovib metsast
            tulu saada, kuid ei taha kinnistust loobuda.
          </p>
          <p>
            Pärast raiet saad maa edasi majandada: istutada uue metsapõlve, kasutada maad ise või
            müüa see hiljem.
          </p>
          <motion.ul
            className="arrow-list"
            {...pointsReveal}
            variants={staggerContainer}
          >
            {POINTS.map((point) => (
              <motion.li key={point} variants={staggerItem}>{point}</motion.li>
            ))}
          </motion.ul>
          <div className="hero-actions">
            <Button href="/raieoiguse-ost/" className="btn btn-solid">
              Loe raieõiguse müügist
            </Button>
            <Button href="#hinnaparing" className="btn btn-ghost">
              Küsi raieõigusele pakkumist
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
