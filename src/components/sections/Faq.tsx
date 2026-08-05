import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { fadeUp, staggerContainer, staggerItem } from "../../motion/variants";
import Button from "../Button";
import PhoneIcon from "../icons/PhoneIcon";
import type { QA } from "../../content/faq";
import { BUSINESS } from "../../content/business";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FaqProps {
  items: QA[];
  eyebrow?: string;
  title?: string;
}

/**
 * Vastused on alati DOM-is olemas (ainult kõrgus on animeeritud), nii et
 * eelrenderdatud HTML sisaldab kogu KKK teksti ka siis, kui JS ei tööta.
 *
 * Küsimuse tekst ei ole tahtlikult <button>-i sees, vaid selle kõrval: teksti
 * eraldajad (trafilatura jt, mida AI-otsingud kasutavad) viskavad <button>-i
 * sisu ära ja siis jääb vastus küsimuseta. Nupp katab CSS-iga kogu rea, nii et
 * klõps ja klaviatuur töötavad endiselt üle terve pealkirja.
 */
export default function Faq({
  items,
  eyebrow = "Korduma kippuvad küsimused",
  title = "Mida metsaomanikud kõige rohkem küsivad",
}: FaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <AnimatedSection id="kkk" className="section" variant={fadeUp}>
      <div className="container">
        <p className="eyebrow center">{eyebrow}</p>
        <h2>{title}</h2>

        <motion.div
          className="faq-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                className={`faq-item${isOpen ? " open" : ""}`}
                key={item.q}
                variants={staggerItem}
              >
                <h3 className="faq-q-wrap">
                  <span className="faq-q">
                    <span className="faq-q-text" id={`kkk-q-${i}`}>
                      {item.q}
                    </span>
                    <span className="faq-plus" aria-hidden="true" />
                    <button
                      type="button"
                      className="faq-toggle"
                      aria-expanded={isOpen}
                      aria-controls={`kkk-${i}`}
                      aria-labelledby={`kkk-q-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                    />
                  </span>
                </h3>
                <motion.div
                  id={`kkk-${i}`}
                  className="faq-a"
                  initial={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.38, ease: EASE }}
                >
                  <div className="faq-a-inner">
                    {item.a.map((paragraph) => (
                      <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="faq-cta">
          <p>Ei leidnud vastust? Küsi julgelt – vastame ka lihtsalt nõu andes.</p>
          <div className="hero-actions">
            <Button href="/kontakt/#hinnaparing" className="btn btn-solid">
              Küsi pakkumist
            </Button>
            <Button href={`tel:${BUSINESS.phone}`} className="btn btn-ghost" icon={<PhoneIcon />}>
              Helista: {BUSINESS.phoneShort}
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
