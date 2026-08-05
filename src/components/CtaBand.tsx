import AnimatedSection from "./AnimatedSection";
import Button from "./Button";
import PhoneIcon from "./icons/PhoneIcon";
import { fadeUp } from "../motion/variants";
import { BUSINESS } from "../content/business";

interface CtaBandProps {
  title?: string;
  text?: string;
}

export default function CtaBand({
  title = "Küsi oma maale tasuta hinnapakkumine",
  text = "Saada katastritunnus ja teeme konkreetse pakkumise 24 tunni jooksul. Hindamine on tasuta ega kohusta sind millekski.",
}: CtaBandProps) {
  return (
    <AnimatedSection className="section cta-band" variant={fadeUp}>
      <div className="container cta-band-inner">
        <div>
          <h2 className="left">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="hero-actions">
          <Button href="/kontakt/#hinnaparing" className="btn btn-solid">
            Küsi pakkumist
          </Button>
          <Button href={`tel:${BUSINESS.phone}`} className="btn btn-glass" icon={<PhoneIcon />}>
            {BUSINESS.phoneDisplay}
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
