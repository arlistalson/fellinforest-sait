import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { cardPop, fadeUp, staggerContainer, staggerItem } from "../../motion/variants";
import { Link } from "../../router";

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
        <p className="section-lead center-lead">
          Müük käib neljas sammus: saadad päringu katastritunnusega, meie hindame metsa tasuta,
          seejärel saad konkreetse pakkumise 24 tunni jooksul ja sobiva hinna korral vormistame tehingu
          notaris. Notaritasud jäävad meie kanda ja raha laekub tehingu sõlmimisel.
        </p>
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
        <p className="section-lead center-lead">
          <Link to="/hinnakujundus/" className="card-link">
            Vaata täpsemalt, millest hind koosneb ja kuidas protsess samm-sammult käib →
          </Link>
        </p>
      </div>
    </AnimatedSection>
  );
}
