import PageHero from "../components/PageHero";
import TextSection, { ArrowList, InfoGrid } from "../components/TextSection";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/CtaBand";
import RelatedLinks from "../components/RelatedLinks";
import { FAQ_METSAMAJANDAMINE } from "../content/faq";

export default function Metsamajandamine() {
  return (
    <>
      <PageHero
        crumb="Metsamajandamine"
        eyebrow="Metsamajandamine"
        title="Hoiame ja kasvatame sinu metsa väärtust"
        lead="Kui müük ei ole plaanis, aitame metsa väärtust hoopis kasvatada – metsamajandamiskava, hooldusraied, uuendamine ja abi toetuste taotlemisel."
      />

      <TextSection eyebrow="Plaan" title="Kõik algab metsamajandamiskavast">
        <p>
          Metsamajandamiskava annab kümneks aastaks selge plaani – millises eraldises mida ja millal
          teha. Kava alusel on lihtne otsuseid teha, raieid planeerida ja toetusi taotleda. Ilma
          kavata majandamine tähendab tavaliselt seda, et hooldustööd jäävad hiljaks ja mets kaotab
          väärtust.
        </p>
        <p>
          Vaatame koos kava üle ja seame prioriteedid: mis on kiireloomuline, mis võib oodata ja
          kust tuleb lähiaastatel tulu. Kui kava on vananenud või puudub, aitame selle koostada.
        </p>
      </TextSection>

      <TextSection tint eyebrow="Tööd" title="Mida me metsas teeme">
        <InfoGrid
          cards={[
            {
              title: "Valgustusraie",
              desc: "Noorendikus antakse parematele puudele valgust ja kasvuruumi. Õigel ajal tehtud valgustusraie määrab suuresti tulevase puistu kvaliteedi.",
            },
            {
              title: "Harvendusraie",
              desc: "Keskealises metsas, kui puud hakkavad üksteist kitsendama. Tõstab tulevase uuendusraie väärtust ja hoiab metsa tervena.",
            },
            {
              title: "Maapinna ettevalmistus",
              desc: "Raiesmiku ettevalmistus istutamiseks, et taimed saaksid parema stardi ja juurduksid kiiremini.",
            },
            {
              title: "Istutamine",
              desc: "Tellime kvaliteetsed taimed ja istutame kasvukohale sobiva puuliigiga, arvestades mulla ja niiskusrežiimiga.",
            },
            {
              title: "Kultuuri hooldus",
              desc: "Rohime, teeme ulukikahjustuste tõrjet ja käime kultuuri seisu üle vaatamas, kuni mets on omal jalal.",
            },
            {
              title: "Metsateatised ja toetused",
              desc: "Esitame metsateatised ja aitame metsanduslike toetuste taotlemisel – meetmed ja tähtajad vaatame igal aastal üle.",
            },
          ]}
        />
      </TextSection>

      <TextSection eyebrow="Miks see loeb" title="Õigeaegne hooldus on raha">
        <p>
          Hooldusraied ei ole kulu, vaid investeering. Kui valgustus- ja harvendusraie tehakse
          õigel ajal, kasvab allesjäävate puude juurdekasv kiiremini ja lõppraie annab märgatavalt
          suurema tulu. Hilinenud hooldust ei saa hiljem tagantjärele tasa teha – seda aega mets
          tagasi ei anna.
        </p>
        <ArrowList
          items={[
            "metsamajandamiskava koostamine ja uuendamine",
            "valgustus- ja harvendusraie",
            "maapinna ettevalmistus ja istutus",
            "kultuuride hooldus ja ulukitõrje",
            "metsateatiste esitamine",
            "abi toetuste taotlemisel",
          ]}
        />
      </TextSection>

      <Faq
        items={FAQ_METSAMAJANDAMINE}
        eyebrow="Metsamajandamine"
        title="Korduma kippuvad küsimused metsamajandamise kohta"
      />

      <CtaBand
        title="Küsi metsamajandamise kohta nõu"
        text="Räägime läbi, mis sinu metsas järgmisena teha tasub. Konsultatsioon on tasuta."
      />

      <RelatedLinks
        links={[
          {
            to: "/raieoiguse-ost/",
            title: "Raieõiguse ost",
            desc: "Kui soovid raiest tulu saada, aga maad alles hoida.",
          },
          {
            to: "/metsakinnistute-ost/",
            title: "Metsakinnistute ost",
            desc: "Kui otsustad siiski müüa – ostame igas seisukorras kinnistuid.",
          },
          {
            to: "/kontakt/",
            title: "Kontakt",
            desc: "Helista ja arutame sinu metsa võimalused läbi.",
          },
        ]}
      />
    </>
  );
}
