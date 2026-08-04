import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { fadeUp, staggerContainer, staggerItem } from "../../motion/variants";
import Button from "../Button";
import PhoneIcon from "../icons/PhoneIcon";

const EASE = [0.22, 1, 0.36, 1] as const;

interface QA {
  q: string;
  a: string[];
}

const FAQ: QA[] = [
  {
    q: "Milliseid dokumente on metsa müügiks vaja?",
    a: [
      "Päringu tegemiseks piisab katastritunnusest – kõik muu vaatame ise välja. Metsaregistri andmed, kinnistusraamatu väljavõtte ja kitsenduste kontrolli teeme sinu eest ära.",
      "Tehinguks läheb vaja kehtivat isikut tõendavat dokumenti ja abielus olles abikaasa nõusolekut, kui kinnistu on ühisvara. Kui kinnistu on päritud, peab pärimine olema vormistatud ja omanik kinnistusraamatusse kantud – vajadusel selgitame, kuidas seda korda ajada.",
    ],
  },
  {
    q: "Kuidas metsakinnistu hind kujuneb?",
    a: [
      "Peamine on puistu tegelik seis: puuliigid, vanus, boniteet, tagavara tihumeetrites ja see, kui suur osa metsast on raieküps. Sama suured kinnistud võivad seetõttu hinnalt mitmekordselt erineda.",
      "Lisaks arvestame kitsendusi (kaitseala, piiranguvöönd, vääriselupaik, servituudid), ligipääsu ja teede seisukorda, pinnavorme ja märgalasid ning kinnistu asukohta. Hindamine on tasuta ja saad alati teada, millest hind koosneb.",
    ],
  },
  {
    q: "Kas saan müüa kinnistut, millel on hüpoteek?",
    a: [
      "Jah. Hüpoteek ei takista müüki – see kustutatakse tehingu käigus. Ostuhinnast tasutakse esmalt pangale laenujääk ja ülejäänud summa laekub sulle.",
      "Kogu asjaajamise pangaga ja notariga korraldame meie, sina pead ainult tehingul kohal olema.",
    ],
  },
  {
    q: "Kas metsa müügilt tuleb tulumaksu maksta?",
    a: [
      "Füüsilise isiku puhul maksustatakse üldjuhul kasu ehk müügihinna ja soetusmaksumuse ning müügiga seotud kulude vahe. Metsamaterjali ja raieõiguse võõrandamisest saadud tulust saab teatud tingimustel maha arvata kuni 5000 eurot aastas.",
      "Palju sõltub sellest, kuidas maa on omandatud (ost, pärimine, erastamine, tagastamine). Kuna maksureeglid muutuvad, tasub oma olukord üle kontrollida Maksu- ja Tolliameti lehel või maksunõustajaga – meie oskame öelda, millega tavaliselt arvestatakse, kuid maksunõustamist me ei paku.",
    ],
  },
  {
    q: "Kas kaasomandis oleva metsa saab müüa?",
    a: [
      "Terve kinnistu müügiks on vaja kõigi kaasomanike nõusolekut. Oma mõttelise osa võib müüa ka üksi, kuid teistel kaasomanikel on ostueesõigus.",
      "Ostame ka mõttelisi osi ja meil on kogemust olukordadest, kus kaasomanikke on palju või nad elavad eri paigus. Aitame läbirääkimistel ja vormistamisel.",
    ],
  },
  {
    q: "Mis vahe on kinnistu ja raieõiguse müügil?",
    a: [
      "Kinnistu müügil läheb maa koos metsaga uuele omanikule ja saad kogu väärtuse korraga kätte. Raieõiguse müügil müüd ainult õiguse kokkulepitud alal raiuda – maa jääb sinu nimele ja pärast raiet saad seda edasi majandada.",
      "Kui sa pole kindel, kumb sinu jaoks kasulikum on, arvutame mõlemad variandid läbi ja näitame numbrid kõrvuti.",
    ],
  },
  {
    q: "Kui kaua tehing aega võtab?",
    a: [
      "Hinnapakkumise saad 24 tunni jooksul. Notariaalse tehinguni jõutakse tavaliselt 1–3 nädalaga, sõltuvalt sellest, kui kiiresti dokumendid korras on ja millal notaril aeg on. Kiirel juhul oleme tehingu vormistanud ka mõne päevaga.",
      "Raha laekub tehingu sõlmimisel – hüpoteegiga kinnistu puhul pärast seda, kui pangaga on arveldatud.",
    ],
  },
  {
    q: "Kes maksab notaritasud?",
    a: [
      "Notaritasu ja riigilõivu tasume meie. Sulle jääb kokkulepitud ostuhind – varjatud kulusid ega vahendustasusid ei ole.",
    ],
  },
  {
    q: "Kas hindamine maksab midagi ja kas see kohustab mind?",
    a: [
      "Hindamine ja konsultatsioon on täiesti tasuta ega kohusta sind millekski. Saad konkreetse numbri, mille põhjal otsustada – ka siis, kui otsustad mitte müüa või pakkumisi võrrelda.",
    ],
  },
  {
    q: "Kas ostate ka väikeseid või läbiraiutud kinnistuid?",
    a: [
      "Jah. Ostame nii alla hektari suuruseid tükke kui ka juba läbiraiutud maad, noorendikke ja võsastunud kinnistuid. Just neid on tavapärasel teel kõige keerulisem müüa, seetõttu tasub meiega kindlasti rääkida.",
    ],
  },
  {
    q: "Mis metsast pärast müüki saab?",
    a: [
      "Majandame metsa vastutustundlikult ja seaduse järgi: raiume ainult metsateatise alusel, korrastame raiealad ja uuendame need uue metsapõlvega. Meie eesmärk ei ole tühjaks raiutud maa, vaid mets, mis kasvab edasi.",
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
  })),
};

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <AnimatedSection id="kkk" className="section" variant={fadeUp}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container">
        <p className="eyebrow center">Korduma kippuvad küsimused</p>
        <h2>Mida metsaomanikud kõige rohkem küsivad</h2>

        <motion.div
          className="faq-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                className={`faq-item${isOpen ? " open" : ""}`}
                key={item.q}
                variants={staggerItem}
              >
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`kkk-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-plus" aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`kkk-${i}`}
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: EASE }}
                    >
                      <div className="faq-a-inner">
                        {item.a.map((paragraph) => (
                          <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="faq-cta">
          <p>Ei leidnud vastust? Küsi julgelt – vastame ka lihtsalt nõu andes.</p>
          <div className="hero-actions">
            <Button href="#hinnaparing" className="btn btn-solid">Küsi pakkumist</Button>
            <Button href="tel:+37258065274" className="btn btn-ghost" icon={<PhoneIcon />}>
              Helista: 5806 5274
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
