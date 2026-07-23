import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../../motion/variants";
import PhoneIcon from "../icons/PhoneIcon";

export default function Footer() {
  return (
    <footer id="kontakt" className="site-footer">
      <div className="container">
        <motion.div
          className="footer-top"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div className="footer-col" variants={staggerItem}>
            <h4>Menüü</h4>
            <a href="#teenused">Teenused</a>
            <a href="#raieoigus">Raieõigus</a>
            <a href="#protsess">Kuidas käib</a>
            <a href="#hinnaparing">Küsi pakkumist</a>
          </motion.div>

          <motion.div className="footer-col" variants={staggerItem}>
            <h4>Teenused</h4>
            <a href="#teenused">Metsakinnistute ost</a>
            <a href="#raieoigus">Raieõiguse ost</a>
            <a href="#teenused">Põllumaa ost</a>
            <a href="#teenused">Metsamajandamine</a>
          </motion.div>

          <motion.a
            href="#"
            className="footer-brand"
            aria-label="Fellin Forest"
            variants={staggerItem}
          >
            <img src="/images/logo3.png" alt="Fellin Forest" />
          </motion.a>

          <motion.div className="footer-col footer-col--right" variants={staggerItem}>
            <h4>Kontakt</h4>
            <span className="footer-name">Enrico Orobko</span>
            <a href="tel:+37258065274" className="footer-call">
              <PhoneIcon />
              +372 5806 5274
            </a>
            <a href="mailto:enrico@fellinforest.ee">enrico@fellinforest.ee</a>
          </motion.div>

          <motion.div className="footer-col footer-col--right" variants={staggerItem}>
            <h4>Ettevõte</h4>
            <span>Fellin Forest OÜ</span>
            <span>Registrikood 17117278</span>
            <span>Lossi tn 15, 71003 Viljandi</span>
          </motion.div>
        </motion.div>

        <div className="footer-bottom">
          <span className="footer-brand-word">FELLIN FOREST</span>
          <p className="footer-copy-text">
            © {new Date().getFullYear()} Fellin Forest OÜ · Registrikood 17117278 ·
            {" "}Veebilehe tegi{" "}
            <a
              href="https://talson.ee"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit"
            >
              talson.ee
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
