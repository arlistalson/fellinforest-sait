import PageHero from "../components/PageHero";
import TextSection, { ArrowList, InfoGrid } from "../components/TextSection";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/CtaBand";
import RelatedLinks from "../components/RelatedLinks";
import { FAQ_RAIEOIGUS } from "../content/faq";
import { Link } from "../router";

export default function Raieoigus() {
  return (
    <>
      <PageHero
        crumb="Raieõiguse ost"
        eyebrow="Raieõiguse ost"
        title="Müü raieõigus – maa jääb sinu omandisse"
        lead="Raieõiguse müügil müüd ainult õiguse kokkulepitud alal ja ajal metsa raiuda. Kinnistu jääb sinu nimele, raha laekub enne raie algust ja pärast töid jääb korrastatud raiesmik."
      />

      <TextSection eyebrow="Mis see on" title="Mida raieõiguse müük tähendab?">
        <p>
          Raieõiguse müügil annad ostjale õiguse raiuda metsa kokkulepitud alal, kokkulepitud
          raieliigiga ja kokkulepitud tähtaja jooksul. <strong>Maa ise jääb sinu omandisse.</strong>{" "}
          See sobib metsaomanikule, kes tahab metsast tulu saada, kuid ei soovi kinnistust loobuda:
          pärast raiet saad istutada uue metsapõlve, maad ise kasutada või kinnistu hiljem müüa.
        </p>
        <p>
          Erinevus kinnistu müügist on põhimõtteline. Kinnistu müügil saad kogu vara väärtuse
          korraga kätte, aga maa läheb uuele omanikule. Raieõiguse müügil saad raietulu, säilitad
          maaomandi ja võtad endale kohustuse metsa uuendada. Kui sa pole kindel, kumb sinu jaoks
          kasulikum on, arvutame mõlemad variandid läbi ja näitame numbrid kõrvuti – seda teeme
          tasuta ja see ei kohusta sind millekski.
        </p>
        <ArrowList
          items={[
            "Maa jääb sinu omandisse",
            "Raha laekub enne raie algust",
            "Raie toimub metsateatise ja metsaseaduse järgi",
            "Peale raiet korrastatud raiesmik",
            "Soovi korral aitame uue metsa istutamisega",
          ]}
        />
      </TextSection>

      <TextSection tint eyebrow="Protsess" title="Kuidas raieõiguse müük käib?">
        <InfoGrid
          cards={[
            {
              title: "1. Vaatame raievõimalused üle",
              desc: "Kontrollime takseerandmed ja kitsendused ning ütleme, millistes eraldistes ja millist raieliiki on lubatud ja mõistlik teha.",
            },
            {
              title: "2. Lepime kokku tingimused",
              desc: "Fikseerime raieala, raieliigi, tähtaja ja hinna. Kõik see kirjutatakse lepingusse sisse, nii et hilisemaid vaidlusi ei teki.",
            },
            {
              title: "3. Notariaalne leping",
              desc: "Leping vormistatakse notaris ja notaritasu tasume meie. Raha laekub sulle enne raie algust, soovi korral osamaksetena.",
            },
            {
              title: "4. Metsateatis ja raie",
              desc: "Esitame Keskkonnaametile metsateatise ja korraldame raie metsaseaduse nõuete järgi. Sina ei pea ametitega suhtlema.",
            },
            {
              title: "5. Raiesmiku korrastamine",
              desc: "Pärast tööde lõppu koristame raiejäätmed ja tasandame kokkuveoteed, nii et ala jääb uuendamiseks valmis.",
            },
            {
              title: "6. Uuendamine (soovi korral)",
              desc: "Aitame maapinna ettevalmistuse, istutamise ja kultuuri hooldusega, et uus metsapõlv saaks kohe õige alguse.",
            },
          ]}
        />
      </TextSection>

      <TextSection eyebrow="Hind" title="Millest raieõiguse hind sõltub?">
        <p>
          Raieõiguse hinna aluseks on eeldatav raietulu: raiutav tagavara tihumeetrites, puuliikide
          ja sortimentide jaotus ning kehtivad puiduhinnad. Sellest lahutatakse raie-, kokkuveo- ja
          transpordikulud, mis sõltuvad ligipääsust, pinnase kandvusest ja kaugusest.
        </p>
        <p>
          Näitame pakkumises need osad eraldi välja, et sa näeksid, kust number tuleb. Sama
          arvutuskäigu oleme lahti kirjutanud{" "}
          <Link to="/hinnakujundus/">hinnakujunduse lehel</Link>.
        </p>
      </TextSection>

      <Faq
        items={FAQ_RAIEOIGUS}
        eyebrow="Raieõiguse müük"
        title="Korduma kippuvad küsimused raieõiguse kohta"
      />

      <CtaBand
        title="Küsi raieõigusele tasuta pakkumine"
        text="Saada katastritunnus ja ütle, millises mahus raiet kaalud. Teeme pakkumise 24 tunni jooksul."
      />

      <RelatedLinks
        links={[
          {
            to: "/metsakinnistute-ost/",
            title: "Metsakinnistute ost",
            desc: "Kui soovid kogu vara korraga rahaks teha, ostame ka terve kinnistu.",
          },
          {
            to: "/metsamajandamine/",
            title: "Metsamajandamine",
            desc: "Uuendamine, hooldusraied ja metsamajandamiskava pärast raiet.",
          },
          {
            to: "/hinnakujundus/",
            title: "Hinnakujundus ja protsess",
            desc: "Kuidas hinnani jõuame ja mida sa saad enne otsustamist küsida.",
          },
        ]}
      />
    </>
  );
}
