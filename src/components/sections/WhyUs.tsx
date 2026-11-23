import { motion } from "framer-motion";
import { useReveal } from "../../motion/reveal";
import AnimatedSection from "../AnimatedSection";
import { fadeIn, slideLeft, slideRight, staggerContainer, staggerItem } from "../../motion/variants";
import Button from "../Button";
import PhoneIcon from "../icons/PhoneIcon";

const PROMISES = [
  { title: "Aus turuhind", desc: "Pakkumine põhineb metsa tegelikul väärtusel – takseerandmetel ja turuhindadel, mitte kõhutundel." },
  { title: "Läbipaistev protsess", desc: "Selgitame iga sammu lihtsas keeles. Sina tead alati, mis toimub ja miks." },
  { title: "Kiire ja mugav", desc: "Vastame 24 tunniga, tehingu vormistame notaris ja kõik tasud jäävad meie kanda." },
];

export default function WhyUs() {
  const textReveal = useReveal<HTMLDivElement>(0.2);
  const promisesReveal = useReveal<HTMLDivElement>(0.2);
  const photoReveal = useReveal<HTMLDivElement>(0.2);

  return (
    <AnimatedSection className="section" variant={fadeIn}>
      <div className="container split">
        <motion.div
          className="split-text"
          {...textReveal}
          variants={slideRight}
        >
          <p className="eyebrow">Miks Fellin Forest?</p>
          <h2 className="left">Meie lubadused sulle</h2>
          <motion.div
            {...promisesReveal}
            variants={staggerContainer}
          >
            {PROMISES.map((promise) => (
              <motion.div className="promise" key={promise.title} variants={staggerItem}>
                <h3>{promise.title}</h3>
                <p>{promise.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="hero-actions">
            <Button href="#hinnaparing" className="btn btn-solid">Küsi pakkumist</Button>
            <Button href="tel:+37253402340" className="btn btn-ghost" icon={<PhoneIcon />}>
              Helista meile
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="photo photo-big"
          style={{ backgroundImage: "url('/images/mets-3.webp')" }}
          {...photoReveal}
          variants={slideLeft}
        />
      </div>
    </AnimatedSection>
  );
}
