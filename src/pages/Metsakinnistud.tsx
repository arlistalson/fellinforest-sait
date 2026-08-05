import PageHero from "../components/PageHero";
import TextSection, { ArrowList, InfoGrid } from "../components/TextSection";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/CtaBand";
import RelatedLinks from "../components/RelatedLinks";
import { FAQ_METSAKINNISTU } from "../content/faq";
import { Link } from "../router";

export default function Metsakinnistud() {
  return (
    <>
      <PageHero
        crumb="Metsakinnistute ost"
        eyebrow="Metsakinnistute ost"
        title="Ostame metsakinnistuid üle Eesti"
        lead="Ostame nii raieküpset metsa kui ka läbiraiutud, hüpoteegiga või kaasomandis kinnistuid. Päringuks piisab katastritunnusest – ülejäänu selgitame ise välja ja teeme pakkumise 24 tunni jooksul."
      />

      <TextSection eyebrow="Mida me ostame" title="Igas seisukorras metsakinnistud">
        <p>
          Ostame metsakinnistuid üle Eesti – nii mõnehektarilisi tükke kui ka suuri, sadade
          hektarite suuruseid kinnistuid. Hinna arvutame metsa tegeliku seisu järgi: vaatame
          takseerandmeid, puuliike, vanust, tagavara ja raieküpsust ning arvestame ka kinnistu
          asukoha, ligipääsu ja pinnavormidega.
        </p>
        <p>
          Ostame ka neid kinnistuid, mille müük tavapärasel teel on keeruline või aeganõudev –
          läbiraiutud maad, noorendikud, hüpoteegiga koormatud ja kaasomandis olevad kinnistud. Ka
          siis, kui varasem müügikatse on luhtunud, tasub meiega rääkida: meie ostame metsa
          pikaajalise majandamise eesmärgil, mitte kiireks edasimüügiks, ja seetõttu sobivad meile
          ka need kinnistud, kus kohest raietulu ei ole.
        </p>
        <h3>Ostame muu hulgas:</h3>
        <ArrowList
          items={[
            "raieküps ja keskealine mets",
            "läbiraiutud kinnistud ja raiesmikud",
            "noorendikud ja hooldamata võsa",
            "hüpoteegi või servituudiga koormatud maa",
            "kaasomandi osad ja pärandvara",
            "maatulundusmaa, kus metsa kõrval on ka põllumaad",
          ]}
        />
      </TextSection>

      <TextSection
        tint
        eyebrow="Sinu jaoks"
        title="Sina ei pea midagi ette valmistama"
      >
        <p>
          Päringu tegemiseks piisab katastritunnusest. Metsaregistri ja kinnistusraamatu andmed,
          kitsenduste kontrolli ja notariga suhtluse võtame enda peale. Hindamine ja
          konsultatsioon on tasuta ega kohusta sind millekski.
        </p>
        <InfoGrid
          cards={[
            {
              title: "Dokumendid ajame korda meie",
              desc: "Väljavõtted, kitsenduste kontroll, notariaeg ja lepingu projekt – kõik see on meie töö. Sina tuled tehingule ja allkirjastad.",
            },
            {
              title: "Notaritasud jäävad meie kanda",
              desc: "Notaritasu ja riigilõivu maksame meie. Sulle jääb kokkulepitud ostuhind, ilma vahendustasude ja varjatud kuludeta.",
            },
            {
              title: "Hüpoteek ei ole takistus",
              desc: "Laenujääk tasutakse ostuhinnast pangale ja vahe laekub sulle. Suhtluse pangaga korraldame meie.",
            },
            {
              title: "Kaasomand ja pärandvara",
              desc: "Ostame ka mõttelisi osi. Kui kaasomanikke on palju või pärimine on pooleli, aitame kokkuleppe ja vormistamisega.",
            },
          ]}
        />
      </TextSection>

      <TextSection eyebrow="Hind" title="Millest metsakinnistu hind sõltub?">
        <p>
          Kõige rohkem loeb puistu tegelik seis: puuliigid, vanus, boniteet, tagavara tihumeetrites
          ja see, kui suur osa metsast on raieküps. Sama suured kinnistud võivad seetõttu
          väärtuselt mitmekordselt erineda – just seepärast me hektarihinna „hinnakirja“ ei avalda.
        </p>
        <p>
          Lisaks arvestame kitsendusi (kaitseala, piiranguvöönd, vääriselupaik, servituudid),
          ligipääsu ja teede seisukorda, pinnavorme ja märgalasid ning kinnistu asukohta.{" "}
          <Link to="/hinnakujundus/">Hinnakujunduse lehel</Link> selgitame samm-sammult, kuidas
          numbrini jõuame ja mida sa saad enne otsustamist küsida.
        </p>
      </TextSection>

      <Faq
        items={FAQ_METSAKINNISTU}
        eyebrow="Metsakinnistu müük"
        title="Korduma kippuvad küsimused kinnistu müügi kohta"
      />

      <CtaBand
        title="Küsi oma metsakinnistule pakkumine"
        text="Saada katastritunnus ja saad konkreetse hinna 24 tunni jooksul. Tasuta ja ei kohusta millekski."
      />

      <RelatedLinks
        links={[
          {
            to: "/raieoiguse-ost/",
            title: "Raieõiguse ost",
            desc: "Ei taha maad käest anda? Müü ainult raieõigus – maa jääb sinu nimele.",
          },
          {
            to: "/hinnakujundus/",
            title: "Hinnakujundus ja protsess",
            desc: "Millest pakkumise hind koosneb ja kuidas tehing samm-sammult käib.",
          },
          {
            to: "/viljandimaa/",
            title: "Viljandimaa ja teised maakonnad",
            desc: "Kus me ostame ja kui kiiresti kinnistuni jõuame.",
          },
        ]}
      />
    </>
  );
}
