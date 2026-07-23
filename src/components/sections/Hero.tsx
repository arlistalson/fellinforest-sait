import { motion } from "framer-motion";
import { fadeUp } from "../../motion/variants";
import Button from "../Button";
import PhoneIcon from "../icons/PhoneIcon";

export default function Hero() {
  return (
    <section className="hero-wrap">
      <div className="container">
        <motion.div
          className="hero-card"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className="eyebrow">Metsa ost ja majandamine</p>
          <h1>Müü oma mets õiglase hinnaga</h1>
          <p className="lead">
            Ostame metsakinnistuid ja raieõigust üle Eesti. Saada päring ja teeme sulle tasuta
            hinnapakkumise 24 tunni jooksul.
          </p>
          <div className="hero-actions">
            <Button href="#hinnaparing" className="btn btn-solid">Küsi tasuta pakkumist</Button>
            <Button href="tel:+37258065274" className="btn btn-glass" icon={<PhoneIcon />}>
              Helista: 5806 5274
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
