import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { cardPop, fadeUp, staggerContainer, staggerItem } from "../../motion/variants";
import { SERVICES } from "../../content/services";
import { Link } from "../../router";

export default function Services() {
  return (
    <AnimatedSection id="teenused" className="section" variant={fadeUp}>
      <div className="container">
        <p className="eyebrow center">Teenused</p>
        <h2>Aitame maa- ja metsaomanikke igas olukorras</h2>
        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {SERVICES.map((service) => (
            <motion.div key={service.id} variants={staggerItem} {...cardPop}>
              <Link to={service.href} className="service-card">
                <span className="icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <span className="card-link">Loe lähemalt →</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
