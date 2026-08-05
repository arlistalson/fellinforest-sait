import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import TextSection from "../components/TextSection";
import AnimatedSection from "../components/AnimatedSection";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/CtaBand";
import RelatedLinks from "../components/RelatedLinks";
import { fadeUp } from "../motion/variants";
import { COUNTIES } from "../content/counties";
import { FAQ_MAAKONNAD } from "../content/faq";
import { BUSINESS, addressLine } from "../content/business";
import { Link } from "../router";

const [viljandimaa, ...others] = COUNTIES;

export default function Piirkonnad() {
  return (
    <>
      <PageHero
        crumb="Viljandimaa ja teised maakonnad"
        eyebrow="Piirkonnad"
        title="Metsa ost Viljandimaal ja mujal Eestis"
        lead={`Fellin Forest OÜ kontor asub Viljandis (${addressLine}). Viljandimaa metsad tunneme kõige paremini, kuid ostame metsakinnistuid, raieõigust ja põllumaad kõigis 15 maakonnas – ka saartel.`}
      />

      <TextSection eyebrow="Kodumaakond" title="Miks Viljandimaa meile eriti korda läheb">
        <p>
          Oleme Viljandi ettevõte ja meie kontor on {BUSINESS.street}. See ei ole ainult aadress –
          see tähendab, et Viljandimaa metsad, teedevõrk ja kohalikud kokkuostuhinnad on meile
          igapäevased. Siinsele kinnistule jõuame vaatama tavaliselt juba paari päevaga ja tunneme
          piirkonna eripärasid: kus on pehme pinnas, kus tuleb raiet ajastada külmunud maa järgi ja
          millised teed suuremat masinat kannavad.
        </p>
        <p>
          {viljandimaa.note} Sama kiiresti tegutseme naabermaakondades – Tartumaal, Pärnumaal,
          Järvamaal, Jõgevamaal ja Valgamaal.
        </p>
      </TextSection>

      <AnimatedSection id="maakonnad" className="section section-tint" variant={fadeUp}>
        <div className="container">
          <p className="eyebrow center">Teised maakonnad</p>
          <h2>Ostame kõigis Eesti maakondades</h2>
          <p className="section-lead">
            Enamiku pakkumistest teeme takseer- ja kaardiandmete põhjal, seega ei sõltu vastamise
            kiirus sellest, kui kaugel kinnistu asub. Asukoht mõjutab hinda eelkõige logistika
            kaudu: kaugus kokkuostukohast, teede seisukord ja saartel praamikulu.
          </p>
          {/* 15 kaarti – ükshaaval sisse animeerimine muudaks alumised liiga kaua nähtamatuks */}
          <motion.div
            className="county-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.02 }}
            variants={fadeUp}
          >
            {[viljandimaa, ...others].map((county) => (
              <article className="county-card" key={county.slug} id={county.slug}>
                <h3>Metsa ost {county.inCounty}</h3>
                <p>{county.note}</p>
              </article>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      <TextSection eyebrow="Kohalolek" title="Kaugem kinnistu ei tähenda halvemat pakkumist">
        <p>
          Küsimus, mille metsaomanikud kõige sagedamini esitavad, on see, kas kaugemal asuva
          kinnistu eest saab vähem. Otseselt asukoha eest me hinda ei vähenda – mõju tuleb
          logistikast. Kui kokkuvedu on pikk või teed nõrgad, kasvab raiekulu ja see kajastub
          pakkumises. Suurema kinnistu puhul jaguneb see kulu suuremale mahule ja mõju hektari
          kohta on väiksem.
        </p>
        <p>
          Näitame pakkumises alati ära, milline osa hinnast tuleb puistust ja milline logistikast –
          nii saad aru, kas number on aus. Täpsemalt selgitame seda{" "}
          <Link to="/hinnakujundus/">hinnakujunduse lehel</Link>.
        </p>
      </TextSection>

      <Faq
        items={FAQ_MAAKONNAD}
        eyebrow="Piirkonnad"
        title="Korduma kippuvad küsimused piirkondade kohta"
      />

      <CtaBand
        title="Küsi pakkumist – ükskõik millises maakonnas"
        text="Saada katastritunnus ja teeme pakkumise 24 tunni jooksul, olenemata sellest, kus kinnistu asub."
      />

      <RelatedLinks
        links={[
          {
            to: "/metsakinnistute-ost/",
            title: "Metsakinnistute ost",
            desc: "Mida me ostame ja mis seisus kinnistud meile sobivad.",
          },
          {
            to: "/pollumaa-ost/",
            title: "Põllumaa ost",
            desc: "Ostame ka haritavat maad ja rohumaid üle Eesti.",
          },
          {
            to: "/kontakt/",
            title: "Kontakt",
            desc: "Kontor Viljandis, Lossi tn 15. Helista või saada päring.",
          },
        ]}
      />
    </>
  );
}
