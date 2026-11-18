import PageHero from "../components/PageHero";
import TextSection, { ArrowList, InfoGrid } from "../components/TextSection";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/CtaBand";
import RelatedLinks from "../components/RelatedLinks";
import { FAQ_METSA_MUUK } from "../content/faq";
import { Link } from "../router";

interface ComparisonRow {
  aspect: string;
  property: string;
  cuttingRight: string;
}

const COMPARISON: ComparisonRow[] = [
  { aspect: "Mida müüd", property: "Kogu kinnistu koos maa ja metsaga", cuttingRight: "Ainult õiguse kokkulepitud alal metsa raiuda" },
  { aspect: "Maa omand", property: "Läheb ostjale", cuttingRight: "Jääb sinu nimele" },
  { aspect: "Mida saad", property: "Kogu vara väärtuse korraga", cuttingRight: "Raietulu, maa jääb alles" },
  { aspect: "Millal raha laekub", property: "Tehingu sõlmimisel notaris", cuttingRight: "Enne raie algust, soovi korral osamaksetena" },
  { aspect: "Kohustused pärast tehingut", property: "Ei ole", cuttingRight: "Raiesmik tuleb uuendada (aitame sellega)" },
  { aspect: "Sobib, kui", property: "Tahad vara rahaks teha ja metsa enam ei majanda", cuttingRight: "Tahad tulu, aga maa on päritud, kodu kõrval või investeering" },
];

function ComparisonTable() {
  return (
    <div className="compare-wrap">
      <table className="compare-table">
        <caption>Metsakinnistu müük või raieõiguse müük</caption>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Võrdlus</span></th>
            <th scope="col">Kinnistu müük</th>
            <th scope="col">Raieõiguse müük</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.aspect}>
              <th scope="row">{row.aspect}</th>
              <td>{row.property}</td>
              <td>{row.cuttingRight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MetsaMuuk() {
  return (
    <>
      <PageHero
        crumb="Metsa müük"
        eyebrow="Metsa müük"
        title="Metsa müük – kuidas müüa metsa õiglase hinnaga"
        lead="Enamik metsaomanikke müüb metsa elu jooksul ühe korra. Siin selgitame, kas müüa kinnistu või raieõigus, millest hind sõltub, kuidas ostjate pakkumisi võrrelda ja kuidas müük samm-sammult käib."
      />

      <TextSection eyebrow="Kaks võimalust" title="Kas müüa metsakinnistu või raieõigus?">
        <p>
          Metsa müümiseks on kaks põhilist viisi. <strong>Metsakinnistu müügil</strong> müüd kogu
          kinnistu koos maa ja kasvava metsaga ning saad vara väärtuse korraga kätte.{" "}
          <strong>Raieõiguse müügil</strong> müüd ainult õiguse raiuda metsa kokkulepitud alal,
          kokkulepitud raieliigiga ja kokkulepitud aja jooksul – maa jääb sinu omandisse.
        </p>
        <p>
          Kumb on kasulikum, sõltub sinu eesmärgist. Kui metsa enam majandada ei plaani või tahad
          pärandvara jagada, on kinnistu müük tavaliselt lihtsam. Kui maa on sulle oluline, sobib
          paremini raieõiguse müük. Kahtluse korral arvutame mõlemad variandid tasuta läbi ja
          näitame numbrid kõrvuti.
        </p>
        <ComparisonTable />
        <p>
          Loe lähemalt: <Link to="/metsakinnistute-ost/">metsakinnistu müük</Link> ja{" "}
          <Link to="/raieoiguse-ost/">raieõiguse müük</Link>.
        </p>
      </TextSection>

      <TextSection tint eyebrow="Hind" title="Millest metsa hind sõltub?">
        <p>
          Metsa hind ei ole hektari kohta üks kindel number. Kaks ühesuurust kinnistut võivad
          väärtuselt mitmekordselt erineda, sest hinna määrab eelkõige puistu tegelik seis. Kõige
          rohkem mõjutavad hinda järgmised asjad:
        </p>
        <InfoGrid
          cards={[
            {
              title: "Puuliigid ja vanus",
              desc: "Raieküps männi- ja kuusepuistu on väärtuslikum kui noorendik või lehtpuu küttepuu. Loeb ka puude kvaliteet ja tervis.",
            },
            {
              title: "Tagavara tihumeetrites",
              desc: "Mida rohkem on raieküpset puitu, seda suurem on eeldatav raietulu – see on hinna suurim osa.",
            },
            {
              title: "Ligipääs ja pinnas",
              desc: "Hea tee kinnistuni ja kandev pinnas teevad raie odavamaks. Märg pinnas ja kauge kokkuvedu vähendavad hinda.",
            },
            {
              title: "Kitsendused",
              desc: "Kaitseala, piiranguvöönd, vääriselupaik või servituut võivad raiet piirata. Kontrollime need enne pakkumist üle.",
            },
          ]}
        />
        <p>
          Kogu arvutuskäigu oleme lahti kirjutanud{" "}
          <Link to="/hinnakujundus/">hinnakujunduse lehel</Link>.
        </p>
      </TextSection>

      <TextSection eyebrow="Ausad nõuanded" title="Kuidas metsa ostjate pakkumisi võrrelda">
        <p>
          Pakkumisi tasub küsida mitmelt ostjalt. Ainult suurimat summat vaadates võid aga jääda
          ilma rahast, mis kulub tasudele või jääb saamata hiljem. Enne otsustamist küsi iga
          pakkumise kohta need küsimused:
        </p>
        <ArrowList
          items={[
            "Kas summa on lõplik või lahutatakse sellest hiljem notaritasu, vahendustasu või muid kulusid?",
            "Millal ja mitmes osas raha laekub – tehingul, enne raiet või alles pärast raiet?",
            "Raieõiguse puhul: milline ala, milline raieliik ja milline tähtaeg lepingusse kirja läheb?",
            "Mis seisu jääb raiesmik pärast töid ja kes vastutab metsa uuendamise eest?",
            "Kas pakkumine on kirjalik ja kas on lahti seletatud, kust number tuleb?",
            "Kui kaua pakkumine kehtib ja kas ostja käis kinnistut vaatamas või hindas ainult kaardi pealt?",
          ]}
        />
        <p>
          Meie pakkumises on kõik see kirjas: notaritasu ja riigilõivu maksame meie, vahendustasu
          me ei võta ja iga rida on lahti seletatud. Sulle jääb kokkulepitud ostuhind.
        </p>
      </TextSection>

      <TextSection tint eyebrow="Protsess" title="Metsa müük samm-sammult">
        <InfoGrid
          cards={[
            {
              title: "1. Saada katastritunnus",
              desc: "Täida hinnapäringu vorm või helista. Kui tunnust pole käepärast, piisab kinnistu asukohast.",
            },
            {
              title: "2. Vaatame andmed läbi",
              desc: "Metsaregistri takseerandmed, kinnistusraamat ja kitsendused. Sina ei pea midagi tellima ega maksma.",
            },
            {
              title: "3. Saad pakkumise 24 tunniga",
              desc: "Kirjalik pakkumine koos selgitusega. Tavaliselt kehtib see kaks nädalat ega kohusta sind millekski.",
            },
            {
              title: "4. Tehing notaris",
              desc: "Dokumendid valmistame ette meie, notaritasu maksame meie. Tehinguni jõuab tavaliselt 1–3 nädalaga.",
            },
          ]}
        />
        <p>
          Täpsem kirjeldus iga sammu kohta on{" "}
          <Link to="/hinnakujundus/">protsessi lehel</Link>.
        </p>
      </TextSection>

      <TextSection eyebrow="Iga olukord" title="Millist metsa saab müüa?">
        <p>
          Müüa saab ka metsa, mille müük tundub keeruline. Meie ostame metsa pikaajalise
          majandamise eesmärgil, mitte kiireks edasimüügiks, seega sobivad meile ka kinnistud, kus
          kohest raietulu ei ole.
        </p>
        <ArrowList
          items={[
            "Raieküps ja keskealine mets",
            "Läbiraiutud kinnistud, raiesmikud ja noorendikud",
            "Hüpoteegiga kinnistud – laenujääk tasutakse ostuhinnast pangale",
            "Kaasomandis kinnistud ja mõttelised osad",
            "Päritud mets, kui pärimine on vormistatud",
            "Mets kõigis 15 maakonnas, ka Saaremaal ja Hiiumaal",
          ]}
        />
      </TextSection>

      <TextSection tint eyebrow="Maksud" title="Metsa müük ja tulumaks">
        <p>
          Maksud sõltuvad sellest, kas müüd raieõiguse või kogu kinnistu.
        </p>
        <h3>Raieõiguse müük</h3>
        <p>
          Raieõiguse ja oma kinnistult raiutud metsamaterjali müügitulust saab füüsiline isik maha
          arvata kuni 5000 eurot aastas. Summa kehtib inimese kohta – kaasomanikud saavad selle
          kumbki eraldi – ja kasutamata osa järgmisesse aastasse üle ei kandu.
        </p>
        <h3>Metsakinnistu müük</h3>
        <p>
          Kinnistu müügil maksustatakse kasu ehk müügihinna ja soetusmaksumuse vahe, millest
          lahutatakse müügiga otseselt seotud kulud. Eelnimetatud 5000 euro soodustus kinnistu müügi
          puhul ei kehti. Omandireformiga tagastatud maa esmakordne müük on aga maksuvaba.
        </p>
        <p>
          Kuna maksureeglid muutuvad, kontrolli oma olukord üle{" "}
          <a href="https://emta.ee/eraklient/maksud-ja-tasumine/maksustatavad-tulud/kasvava-metsa-raieoigus-ja-metsamaterjal" target="_blank" rel="noopener noreferrer">
            Maksu- ja Tolliameti lehel
          </a>{" "}
          või maksunõustajaga. Maksunõustamist me ise ei paku.
        </p>
      </TextSection>

      <Faq
        items={FAQ_METSA_MUUK}
        eyebrow="Metsa müük"
        title="Korduma kippuvad küsimused metsa müügi kohta"
      />

      <CtaBand
        title="Müü mets – küsi tasuta pakkumine"
        text="Saada katastritunnus ja saad konkreetse hinna 24 tunni jooksul. Hindamine on tasuta ega kohusta sind millekski."
      />

      <RelatedLinks
        links={[
          {
            to: "/metsakinnistute-ost/",
            title: "Metsakinnistu müük",
            desc: "Müü kogu kinnistu korraga – ka läbiraiutud, hüpoteegiga või kaasomandis.",
          },
          {
            to: "/raieoiguse-ost/",
            title: "Raieõiguse müük",
            desc: "Saa metsast tulu nii, et maa jääb sinu nimele.",
          },
          {
            to: "/hinnakujundus/",
            title: "Metsa hind ja protsess",
            desc: "Millest pakkumine koosneb ja kuidas tehing samm-sammult käib.",
          },
        ]}
      />
    </>
  );
}
