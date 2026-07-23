import { motion } from "framer-motion";
import { cardPop, staggerContainer, staggerItem } from "../../motion/variants";

const STATS = [
  { num: "24h", label: "vastame igale päringule", tint: true },
  { num: "0 €", label: "hindamine ja konsultatsioon on tasuta", tint: false },
  { num: "100%", label: "notaritasud meie kanda", tint: true },
  { num: "Üle Eesti", label: "ostame metsa igas maakonnas", tint: false },
];

export default function StatsBand() {
  return (
    <section className="stats-band">
      <motion.div
        className="container stats-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.num}
            className={`stat${stat.tint ? " tint" : ""}`}
            variants={staggerItem}
            {...cardPop}
          >
            <div className="stat-num">{stat.num}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
