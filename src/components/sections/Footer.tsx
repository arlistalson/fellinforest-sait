import { motion } from "framer-motion";
import { cardPop, staggerContainer, staggerItem } from "../../motion/variants";

export default function Footer() {
  return (
    <footer id="kontakt" className="site-footer">
      <div className="container">
        <div className="footer-top">
          <h2>Eelistad rääkida inimesega?</h2>
          <p className="footer-lead">
            Helista ja arutame sinu metsa võimalused läbi – konsultatsioon on alati tasuta.
          </p>
          <motion.div
            className="team-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="team-card" variants={staggerItem} {...cardPop}>
              <div className="team-avatar">
                <img src="/images/logo.png" alt="Fellin Forest" />
              </div>
              <h3>Enrico Orobko</h3>
              <p className="team-role">Metsa ost ja pakkumised</p>
              <p><a href="tel:+37258065274">+372 5806 5274</a></p>
              <p><a href="mailto:enrico@fellinforest.ee">enrico@fellinforest.ee</a></p>
            </motion.div>
          </motion.div>
        </div>
        <div className="footer-inner">
          <div>
            <div className="logo footer-logo">
              <img
                src="/images/logo.png"
                alt="Fellin Forest logo"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span>Fellin<em>Forest</em></span>
            </div>
            <p>Ostame metsakinnistuid ja raieõigust üle Eesti.</p>
          </div>
          <div>
            <h4>Kontakt</h4>
            <p><a href="tel:+37258065274">+372 5806 5274</a></p>
            <p><a href="mailto:enrico@fellinforest.ee">enrico@fellinforest.ee</a></p>
          </div>
          <div>
            <h4>Teenused</h4>
            <p><a href="#teenused">Metsakinnistute ost</a></p>
            <p><a href="#raieoigus">Raieõiguse ost</a></p>
            <p><a href="#teenused">Põllumaa ost</a></p>
            <p><a href="#teenused">Metsamajandamine</a></p>
          </div>
        </div>
        <div className="footer-copy">
          <p>&copy; {new Date().getFullYear()} Fellin Forest. Kõik õigused kaitstud.</p>
        </div>
      </div>
    </footer>
  );
}
