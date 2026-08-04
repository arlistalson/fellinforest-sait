import { useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { cardPop, fadeUp, staggerContainer, staggerItem } from "../../motion/variants";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Service {
  id: string;
  title: string;
  desc: string;
  icon: ReactNode;
  body: string[];
  listTitle: string;
  list: string[];
  cta: { href: string; label: string };
}

const SERVICES: Service[] = [
  {
    id: "metsakinnistu",
    title: "Metsakinnistute ost",
    desc: "Ostame metsakinnistuid igas seisukorras – ka läbiraiutud, hüpoteegiga või kaasomandis kinnistuid. Aus hind ja kiire tehing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 6 10h3l-4 6h4l-3 5h12l-3-5h4l-4-6h3L12 2z" />
        <path d="M12 21v-3" />
      </svg>
    ),
    body: [
      "Ostame metsakinnistuid üle Eesti – nii mõnehektarilisi tükke kui ka suuri, sadade hektarite suuruseid kinnistuid. Hinna arvutame metsa tegeliku seisu järgi: vaatame takseerandmeid, puuliike, vanust, tagavara ja raieküpsust ning arvestame ka kinnistu asukoha, ligipääsu ja pinnavormidega.",
      "Ostame ka neid kinnistuid, mille müük tavapärasel teel on keeruline või aeganõudev – läbiraiutud maad, noorendikud, hüpoteegiga koormatud ja kaasomandis olevad kinnistud. Ka siis, kui varasem müügikatse on luhtunud, tasub meiega rääkida.",
      "Sina ei pea midagi ette valmistama. Päringu tegemiseks piisab katastritunnusest – metsaregistri ja kinnistusraamatu andmed, kitsenduste kontrolli ja notariga suhtluse võtame enda peale. Hindamine ja konsultatsioon on tasuta ega kohusta sind millekski.",
    ],
    listTitle: "Ostame muu hulgas:",
    list: [
      "raieküps ja keskealine mets",
      "läbiraiutud kinnistud ja raiesmikud",
      "noorendikud ja hooldamata võsa",
      "hüpoteegi või servituudiga koormatud maa",
      "kaasomandi osad ja pärandvara",
    ],
    cta: { href: "#hinnaparing", label: "Küsi kinnistule pakkumist →" },
  },
  {
    id: "raieoigus",
    title: "Raieõiguse ost",
    desc: "Soovid metsa raiuda, aga maad alles hoida? Ostame raieõigust – sina jääd maaomanikuks ja saad raha kätte enne raie algust.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 5 8 11m0 0-4.5 4.5a2.1 2.1 0 0 0 3 3L11 14m-3-3 3 3m3-9 3 3m-9 3 8.5-8.5a2.1 2.1 0 0 1 3 3L15 12" />
      </svg>
    ),
    body: [
      "Raieõiguse müügil müüd ainult õiguse kokkulepitud alal ja kokkulepitud ajal metsa raiuda – maa ise jääb sinu nimele. See sobib omanikule, kes tahab metsast tulu saada, kuid ei soovi kinnistust loobuda: pärast raiet saad istutada uue metsapõlve, maad ise kasutada või kinnistu hiljem müüa.",
      "Leping vormistatakse notaris ja sinna kirjutatakse selgelt sisse raieala, raieliik, tähtaeg ja hind. Raie toimub Keskkonnaametis registreeritud metsateatise alusel ja metsaseaduse nõuete järgi – vajalikud teatised ja kooskõlastused ajame korda meie.",
      "Raha laekub enne raie algust, soovi korral lepime kokku ka osamaksed. Pärast tööde lõppu korrastame raiesmiku: koristame raiejäätmed ja tasandame kokkuveoteed, nii et ala jääb uuendamiseks valmis. Soovi korral aitame ka istutamise ja hilisema hooldusega.",
    ],
    listTitle: "Kuidas see käib:",
    list: [
      "vaatame üle takseerandmed ja raievõimalused",
      "lepime kokku raieala, raieliigi ja tähtaja",
      "notariaalne leping – raha enne raie algust",
      "raie metsateatise ja metsaseaduse järgi",
      "raiesmik korrastatakse pärast töid",
      "soovi korral istutame uue metsa",
    ],
    cta: { href: "#raieoigus", label: "Loe raieõigusest lähemalt →" },
  },
  {
    id: "metsamajandamine",
    title: "Metsamajandamine",
    desc: "Metsa uuendamine, hooldusraied ja metsamajandamiskavad – hoolitseme, et sinu mets kasvaks väärtuslikuna ka järgmistele põlvedele.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-7m0 0c0-3 2-5 5-5 0 3-2 5-5 5Zm0 0c0-4-2.5-6.5-6-6.5 0 4 2.5 6.5 6 6.5ZM12 8a4 4 0 0 0 4-4 4 4 0 0 0-8 0 4 4 0 0 0 4 4Z" />
      </svg>
    ),
    body: [
      "Kui müük ei ole plaanis, aitame metsa väärtust hoopis kasvatada. Kõik algab metsamajandamiskavast, mis annab kümneks aastaks selge plaani – millises eraldises mida ja millal teha. Kava alusel on lihtne otsuseid teha ja toetusi taotleda.",
      "Teeme hooldusraied õigel ajal: valgustusraie noorendikus ja harvendusraie keskealises metsas annavad allesjäävatele puudele valgust ja kasvuruumi. Õigeaegne hooldus tõstab tulevase uuendusraie väärtust märgatavalt ja hoiab metsa tervena.",
      "Uuendame raiealad: valmistame maapinna ette, tellime kvaliteetsed taimed ja istutame, hiljem hooldame kultuuri – rohime, teeme ulukikahjustuste tõrjet ja käime seisu üle vaatamas. Aitame ka metsateatiste esitamise ja metsanduslike toetuste taotlemisega.",
    ],
    listTitle: "Mida teeme:",
    list: [
      "metsamajandamiskava koostamine ja uuendamine",
      "valgustus- ja harvendusraie",
      "maapinna ettevalmistus ja istutus",
      "kultuuride hooldus ja ulukitõrje",
      "metsateatiste esitamine",
      "abi toetuste taotlemisel",
    ],
    cta: { href: "#hinnaparing", label: "Küsi metsamajandamise kohta →" },
  },
  {
    id: "pollumaa",
    title: "Põllumaa ost",
    desc: "Ostame ka põllumaid – nii haritavat maad kui ka kasutusest väljas olevaid maatükke. Küsi pakkumist ja saad ausa turuhinna.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V8m0 14c0-4-2.5-6-6-6 0 4 2.5 6 6 6Zm0 0c0-4 2.5-6 6-6 0 4-2.5 6-6 6ZM12 8c-3 0-5-2-5-6 4 0 5 2 5 6Zm0 0c3 0 5-2 5-6-4 0-5 2-5 6Z" />
      </svg>
    ),
    body: [
      "Ostame haritavat põllumaad, rohumaid ja kasutusest väljas olevaid maatükke üle Eesti. Hinda mõjutavad eelkõige mullaviljakus ehk boniteet, maatüki suurus ja kuju, kuivendussüsteemi seisukord, ligipääs teelt ning see, kas maa on hetkel kasutuses.",
      "Ostame ka maad, millel on kehtiv rendileping – leping jääb kehtima ja rentnik saab tööd rahulikult jätkata. Samuti sobib meile maatulundusmaa, kus põllu kõrval on ka metsaosa.",
      "Nagu metsakinnistu puhul, piisab päringu tegemiseks katastritunnusest. Vaatame andmed üle, kontrollime kitsendused ja teeme konkreetse pakkumise 24 tunni jooksul. Notaritasud ja riigilõivud jäävad meie kanda.",
    ],
    listTitle: "Ostame muu hulgas:",
    list: [
      "haritav põllumaa ja rohumaa",
      "rendile antud maa – leping jääb kehtima",
      "võsastunud ja sööti jäänud maa",
      "maatulundusmaa koos metsaosaga",
      "kaasomandis olevad maatükid",
    ],
    cta: { href: "#hinnaparing", label: "Küsi põllumaale pakkumist →" },
  },
];

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null);

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
          {SERVICES.map((service) => {
            const open = openId === service.id;

            // Terve kaart on klikitav, v.a. avatud osa (seal on lingid ja loetav tekst).
            const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
              if ((e.target as HTMLElement).closest(".service-detail")) return;
              if (window.getSelection()?.toString()) return;
              setOpenId(open ? null : service.id);
            };

            return (
              <motion.div
                className={`service-card${open ? " open" : ""}`}
                key={service.id}
                variants={staggerItem}
                onClick={handleCardClick}
                {...(open ? {} : cardPop)}
              >
                <div className="icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>

                {/* Klikk jõuab kaardini bubbling'uga – nupp on siin klaviatuuri ja
                    ekraanilugeja pärast. */}
                <button
                  type="button"
                  className="card-toggle"
                  aria-expanded={open}
                  aria-controls={`teenus-${service.id}`}
                >
                  {open ? "Peida" : "Loe lähemalt"}
                  <span className="card-toggle-chev"><Chevron /></span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`teenus-${service.id}`}
                      className="service-detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: EASE }}
                    >
                      <div className="service-detail-inner">
                        {service.body.map((paragraph) => (
                          <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                        ))}
                        <h4>{service.listTitle}</h4>
                        <ul className="arrow-list tight">
                          {service.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <a href={service.cta.href} className="card-link">
                          {service.cta.label}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
