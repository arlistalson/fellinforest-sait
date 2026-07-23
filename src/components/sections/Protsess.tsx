import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { cardPop, fadeUp, staggerContainer, staggerItem } from "../../motion/variants";

const STEPS = [
  { num: 1, title: "Saada päring", desc: "Täida vorm või helista. Piisab katastritunnusest – kõik muu selgitame välja ise." },
  { num: 2, title: "Hindame metsa", desc: "Analüüsime takseerandmeid ja vajadusel külastame kinnistut. Hindamine on alati tasuta." },
  { num: 3, title: "Teeme pakkumise", desc: "Saad konkreetse hinnapakkumise 24 tunni jooksul. Pakkumine ei kohusta sind millekski." },
  { num: 4, title: "Tehing notaris", desc: "Kui hind sobib, vormistame tehingu notaris. Raha laekub sulle kohe tehingu sõlmimisel." },
];

export default function Protsess() {
  return (
    <AnimatedSection id="protsess" className="section section-tint" variant={fadeUp}>
      <div className="container">
        <p className="eyebrow center">Protsess</p>
        <h2>Kuidas müük käib?</h2>
        <motion.div
          className="steps"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {STEPS.map((step) => (
            <motion.div className="step" key={step.num} variants={staggerItem} {...cardPop}>
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
