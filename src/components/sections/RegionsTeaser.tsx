import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { fadeUp } from "../../motion/variants";
import { COUNTIES } from "../../content/counties";
import { Link } from "../../router";
import { addressLine } from "../../content/business";

export default function RegionsTeaser() {
  return (
    <AnimatedSection id="piirkonnad" className="section" variant={fadeUp}>
      <div className="container">
        <p className="eyebrow center">Piirkonnad</p>
        <h2>Ostame metsa üle Eesti – kodu on meil Viljandis</h2>
        <p className="section-lead">
          Fellin Forest OÜ kontor asub Viljandis ({addressLine}), seega Viljandimaa ja
          naabermaakondade metsad on meile kõige tuttavamad. Tehinguid teeme aga kõigis 15
          maakonnas, sealhulgas Saaremaal ja Hiiumaal.
        </p>
        <motion.ul
          className="county-chips"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          {COUNTIES.map((county) => (
            <li key={county.slug}>
              <Link to={`/viljandimaa/#${county.slug}`}>{county.name}</Link>
            </li>
          ))}
        </motion.ul>
        <p className="section-lead">
          <Link to="/viljandimaa/" className="card-link">
            Vaata, kuidas ost maakonniti käib →
          </Link>
        </p>
      </div>
    </AnimatedSection>
  );
}
