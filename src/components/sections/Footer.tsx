import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../../motion/variants";
import PhoneIcon from "../icons/PhoneIcon";
import { Link } from "../../router";
import { BUSINESS, addressLine } from "../../content/business";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <motion.div
          className="footer-top"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div className="footer-col" variants={staggerItem}>
            <h4>Teenused</h4>
            <Link to="/metsakinnistute-ost/">Metsakinnistute ost</Link>
            <Link to="/raieoiguse-ost/">Raieõiguse ost</Link>
            <Link to="/pollumaa-ost/">Põllumaa ost</Link>
            <Link to="/metsamajandamine/">Metsamajandamine</Link>
          </motion.div>

          <motion.div className="footer-col" variants={staggerItem}>
            <h4>Info</h4>
            <Link to="/hinnakujundus/">Hinnakujundus ja protsess</Link>
            <Link to="/viljandimaa/">Viljandimaa ja teised maakonnad</Link>
            <Link to="/kontakt/">Kontakt</Link>
            <Link to="/kontakt/#hinnaparing">Küsi pakkumist</Link>
          </motion.div>

          <motion.div variants={staggerItem} className="footer-brand-wrap">
            <Link to="/" className="footer-brand" aria-label="Fellin Forest – avaleht">
              <img src="/images/logo3-white.png" alt="Fellin Forest" width="240" height="108" />
            </Link>
          </motion.div>

          <motion.div className="footer-col footer-col--right" variants={staggerItem}>
            <h4>Kontakt</h4>
            <span className="footer-name">{BUSINESS.contactPerson}</span>
            <a href={`tel:${BUSINESS.phone}`} className="footer-call">
              <PhoneIcon />
              {BUSINESS.phoneDisplay}
            </a>
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          </motion.div>

          <motion.div className="footer-col footer-col--right" variants={staggerItem}>
            <h4>Ettevõte</h4>
            <span>{BUSINESS.legalName}</span>
            <span>Registrikood {BUSINESS.regCode}</span>
            <address className="footer-address">{addressLine}</address>
          </motion.div>
        </motion.div>

        <div className="footer-bottom">
          <span className="footer-brand-word">FELLIN FOREST</span>
          <p className="footer-copy-text">
            © {new Date().getFullYear()} {BUSINESS.legalName} · Registrikood {BUSINESS.regCode} ·
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
