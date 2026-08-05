import PageHero from "../components/PageHero";
import TextSection, { ArrowList, InfoGrid } from "../components/TextSection";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/CtaBand";
import RelatedLinks from "../components/RelatedLinks";
import { FAQ_POLLUMAA } from "../content/faq";

export default function Pollumaa() {
  return (
    <>
      <PageHero
        crumb="Põllumaa ost"
        eyebrow="Põllumaa ost"
        title="Ostame põllumaad ja rohumaid üle Eesti"
        lead="Ostame nii haritavat põllumaad kui ka kasutusest väljas olevaid maatükke – ka siis, kui maa on rendile antud. Päringuks piisab katastritunnusest ja pakkumise teeme 24 tunni jooksul."
      />

      <TextSection eyebrow="Mida me ostame" title="Haritav maa, rohumaa ja sööti jäänud tükid">
        <p>
          Ostame haritavat põllumaad, rohumaid ja kasutusest väljas olevaid maatükke üle Eesti.
          Hinda mõjutavad eelkõige mullaviljakus ehk boniteet, maatüki suurus ja kuju,
          kuivendussüsteemi seisukord, ligipääs teelt ning see, kas maa on hetkel kasutuses.
        </p>
        <p>
          Ostame ka maad, millel on kehtiv rendileping – leping jääb kehtima ja rentnik saab tööd
          rahulikult jätkata. Samuti sobib meile maatulundusmaa, kus põllu kõrval on ka metsaosa:
          sel juhul hindame põllu- ja metsaosa eraldi ning liidame need üheks pakkumiseks.
        </p>
        <h3>Ostame muu hulgas:</h3>
        <ArrowList
          items={[
            "haritav põllumaa ja rohumaa",
            "rendile antud maa – leping jääb kehtima",
            "võsastunud ja sööti jäänud maa",
            "maatulundusmaa koos metsaosaga",
            "kaasomandis olevad maatükid",
            "üksikud väiksemad põllutükid",
          ]}
        />
      </TextSection>

      <TextSection tint eyebrow="Hind" title="Millest põllumaa hind kujuneb?">
        <InfoGrid
          cards={[
            {
              title: "Mullaviljakus (boniteet)",
              desc: "Kõige olulisem tegur. Viljakam muld annab suurema saagi ja seega ka kõrgema maa väärtuse.",
            },
            {
              title: "Tüki suurus ja kuju",
              desc: "Suur ühtlane põld on masinatega odavam harida kui kitsas või kiiluline tükk – see kajastub hinnas.",
            },
            {
              title: "Kuivendus ja maaparandus",
              desc: "Korras kuivendussüsteem tõstab väärtust. Kui süsteem on amortiseerunud, arvestame korrastamise kuluga.",
            },
            {
              title: "Ligipääs teelt",
              desc: "Otsene juurdepääs avalikult teelt on selge pluss. Kui ligipääs käib naabri maalt, vaatame servituudi olemasolu.",
            },
            {
              title: "Kasutus ja rendileping",
              desc: "Kasutuses olev maa on väärtuslikum kui aastaid sööti seisnud. Kehtiv rendileping ei takista müüki.",
            },
            {
              title: "Asukoht",
              desc: "Piirkonna maahinna tase ja kaugus töötlemiskohtadest mõjutavad lõplikku numbrit.",
            },
          ]}
        />
      </TextSection>

      <TextSection eyebrow="Asjaajamine" title="Meie teeme paberitöö ära">
        <p>
          Nagu metsakinnistu puhul, piisab päringu tegemiseks katastritunnusest. Vaatame andmed üle,
          kontrollime kitsendused ja võimaliku ostueesõiguse ning teeme konkreetse pakkumise 24
          tunni jooksul. Notaritasud ja riigilõivud jäävad meie kanda.
        </p>
        <p>
          Kui maal on kehtiv rendileping, anna päringus teada selle tähtaeg ja tingimused – nii
          saame need kohe pakkumisse arvestada ja hiljem üllatusi ei teki.
        </p>
      </TextSection>

      <Faq
        items={FAQ_POLLUMAA}
        eyebrow="Põllumaa müük"
        title="Korduma kippuvad küsimused põllumaa müügi kohta"
      />

      <CtaBand
        title="Küsi oma põllumaale pakkumine"
        text="Saada katastritunnus ja teeme ausa turuhinnal põhineva pakkumise 24 tunni jooksul."
      />

      <RelatedLinks
        links={[
          {
            to: "/metsakinnistute-ost/",
            title: "Metsakinnistute ost",
            desc: "Kui maatükil on ka metsaosa, hindame selle eraldi ja ostame koos.",
          },
          {
            to: "/hinnakujundus/",
            title: "Hinnakujundus ja protsess",
            desc: "Kuidas pakkumine sünnib ja kuidas tehing samm-sammult käib.",
          },
          {
            to: "/kontakt/",
            title: "Kontakt",
            desc: "Helista või saada päring – vastame 24 tunni jooksul.",
          },
        ]}
      />
    </>
  );
}
