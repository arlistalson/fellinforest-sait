import { motion } from "framer-motion";
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
  return (
    <AnimatedSection id="raieoigus" className="section" variant={fadeIn}>
      <div className="container split">
        <motion.div
          className="photo-collage"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideRight}
        >
          <div className="photo photo-a" style={{ backgroundImage: "url('/images/mets-1.webp')" }} />
          <div className="photo photo-b" style={{ backgroundImage: "url('/images/mets-2.webp')" }} />
        </motion.div>
        <motion.div
          className="split-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {POINTS.map((point) => (
              <motion.li key={point} variants={staggerItem}>{point}</motion.li>
            ))}
          </motion.ul>
          <Button href="#hinnaparing" className="btn btn-solid">Küsi raieõigusele pakkumist</Button>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
