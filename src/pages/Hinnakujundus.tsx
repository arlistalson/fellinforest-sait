import PageHero from "../components/PageHero";
import TextSection, { InfoGrid } from "../components/TextSection";
import ProcessSteps from "../components/ProcessSteps";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/CtaBand";
import RelatedLinks from "../components/RelatedLinks";
import { FAQ_HINNAKUJUNDUS } from "../content/faq";
import { Link } from "../router";

export default function Hinnakujundus() {
  return (
    <>
      <PageHero
        crumb="Hinnakujundus ja protsess"
        eyebrow="Hinnakujundus ja protsess"
        title="Kuidas metsa hind kujuneb ja kuidas tehing käib"
        lead="Me ei avalda „hektarihinda“, sest see eksitab. Selle asemel selgitame siin ausalt, millistest osadest pakkumine koosneb ja mis juhtub päringu saatmisest kuni raha laekumiseni."
      />

      <TextSection eyebrow="Hind" title="Miks ei ole ühte hektarihinda?">
        <p>
          Kaks ühesuurust metsakinnistut võivad väärtuselt mitmekordselt erineda. Ühel kasvab
          80-aastane kuusik heal boniteedil ja kruusatee viib otse kinnistuni; teisel on 15-aastane
          noorendik märjal pinnasel, kuhu pääseb ainult külmunud maa ajal. Keskmine hektarihind
          ütleks nende kohta mõlema puhul vale numbri.
        </p>
        <p>
          Seepärast arvutame iga kinnistu eraldi läbi ja näitame, millest number koosneb. Nii saad
          meie pakkumist teiste omadega sisuliselt võrrelda, mitte lihtsalt suuremat summat valida.
        </p>
      </TextSection>

      <TextSection tint eyebrow="Hinna komponendid" title="Millest pakkumine koosneb">
        <InfoGrid
          cards={[
            {
              title: "Raieküpse puistu tagavara",
              desc: "Tihumeetrid puuliikide kaupa ja nende jagunemine sortimentideks (palk, paberipuu, küttepuu). Siit tuleb eeldatav raietulu ehk hinna suurim osa.",
            },
            {
              title: "Puuliigid ja kvaliteet",
              desc: "Männi- ja kuusepalk on väärtuslikum kui lehtpuu küttepuu. Loeb ka tüvede sirgus, oksalisus ja tervis – mädanik või kahjustused vähendavad saagist.",
            },
            {
              title: "Noorendikud ja uuendamata alad",
              desc: "Nendest kohest tulu ei tule, kuid neil on selge pikaajaline väärtus. Arvestame kasvupotentsiaali ja lahutame uuendamise kulu.",
            },
            {
              title: "Raie- ja transpordikulu",
              desc: "Kokkuveo kaugus, teede kandvus ja kaugus kokkuostukohast. Halb ligipääs võib raiekulu oluliselt tõsta ja seega pakkumist vähendada.",
            },
            {
              title: "Kitsendused",
              desc: "Kaitseala, piiranguvöönd, vääriselupaik, servituut või kalda ehituskeeluvöönd võivad raiet piirata või välistada. Kontrollime need alati enne pakkumist.",
            },
            {
              title: "Maa enda väärtus",
              desc: "Ka pärast raiet on maal väärtus – asukoht, mullaviljakus ja piirkonna maahinna tase. Seda me pakkumisest ära ei jäta.",
            },
          ]}
        />
      </TextSection>

      <TextSection eyebrow="Protsess" title="Kuidas tehing samm-sammult käib">
        <p>
          Enamik metsaomanikke müüb metsa elu jooksul üks kord. Seepärast selgitame iga sammu
          lahti – et sa tead ette, mis juhtub ja mida sinult oodatakse.
        </p>
        <ProcessSteps
          steps={[
            {
              title: "1. Saada päring – piisab katastritunnusest",
              body: [
                "Täida vorm või helista. Ainus, mida meil päriselt vaja on, on katastritunnus. Kui see pole käepärast, piisab kinnistu asukohast ja otsime tunnuse ise üles.",
                "Kasulik on kohe öelda, kas kaalud kinnistu või raieõiguse müüki ja kui kiire sul on – nii saame kohe õige variandi läbi arvutada.",
              ],
            },
            {
              title: "2. Vaatame andmed läbi",
              body: [
                "Võtame metsaregistrist takseerandmed, kinnistusraamatust omandi ja koormatised ning kontrollime kitsendused: kaitsealad, piiranguvööndid, vääriselupaigad, servituudid.",
                "Sina ei pea selleks midagi tellima ega maksma. Kui takseerandmed on vanad või puuduvad, hindame puistut kaardimaterjali ja ortofotode põhjal ning vajadusel käime kohapeal.",
              ],
            },
            {
              title: "3. Vajadusel külastame kinnistut",
              body: [
                "Suuremate või keerulisemate kinnistute puhul käime ise kohapeal: vaatame üle tegeliku puistu seisu, ligipääsu ja pinnase. Sina ei pea kaasa tulema, kuid oled alati oodatud.",
                "Kohapealne ülevaatus on tasuta ja seda tehes ei teki sul mingit kohustust.",
              ],
            },
            {
              title: "4. Teeme konkreetse pakkumise 24 tunni jooksul",
              body: [
                "Saad kirjaliku pakkumise koos selgitusega, millest number koosneb – tagavara, sortimendid, kitsenduste mõju ja logistika. Pakkumine kehtib tavaliselt kaks nädalat.",
                "Pakkumine ei kohusta sind millekski. Soovitame seda alati teiste pakkumistega võrrelda – hea ostja ei pea sind kiirustama.",
              ],
            },
            {
              title: "5. Lepime tingimused kokku",
              body: [
                "Kui hind sobib, lepime kokku tehingu aja ja tingimused. Kui sul on infot, mida meie andmetest ei näinud – värskem takseerimine, tehtud hooldusraie, uus juurdepääsutee – arvutame pakkumise üle.",
                "Raieõiguse puhul fikseerime siin ka raieala, raieliigi ja tähtaja.",
              ],
            },
            {
              title: "6. Valmistame dokumendid ette",
              body: [
                "Broneerime notariaja, tellime väljavõtted ja valmistame lepingu projekti ette. Kui kinnistul on hüpoteek, lepime pangaga kokku laenujäägi tasumise ja hüpoteegi kustutamise.",
                "Kui kinnistu on ühisvara, on vaja abikaasa nõusolekut; kui tegemist on pärandvaraga, peab pärimine olema vormistatud. Ütleme ette, mis on veel puudu ja kuidas seda korda ajada.",
              ],
            },
            {
              title: "7. Tehing notaris",
              body: [
                "Notar loeb lepingu ette ja selgitab tingimused. Sinult on vaja kehtivat isikut tõendavat dokumenti. Notaritasu ja riigilõivu tasume meie.",
                "Notariaalse tehinguni jõuab tavaliselt 1–3 nädalaga alates kokkuleppest, sõltuvalt dokumentide korrasolekust ja notari vabadest aegadest.",
              ],
            },
            {
              title: "8. Raha laekub",
              body: [
                "Kinnistu müügil laekub raha tehingu sõlmimisel; hüpoteegiga kinnistu puhul pärast seda, kui pangaga on arveldatud ja laenujääk tasutud.",
                "Raieõiguse müügil laekub raha enne raie algust, soovi korral kokkulepitud osamaksetena.",
              ],
            },
          ]}
        />
      </TextSection>

      <TextSection tint eyebrow="Kulud" title="Mis sulle maksma läheb?">
        <p>
          <strong>Mitte midagi.</strong> Hindamine ja konsultatsioon on tasuta, notaritasu ja
          riigilõivu tasume meie, vahendustasu me ei võta. Sulle jääb kokkulepitud ostuhind.
        </p>
        <p>
          Ainus, millega tasub eraldi arvestada, on tulumaks. Füüsilise isiku puhul maksustatakse
          üldjuhul kasu ehk müügihinna ning soetusmaksumuse ja müügiga seotud kulude vahe.
          Metsamaterjali ja raieõiguse võõrandamisest saadud tulust saab teatud tingimustel maha
          arvata kuni 5000 eurot aastas. Kuna maksureeglid muutuvad ja palju sõltub sellest, kuidas
          maa on omandatud, tasub oma olukord üle kontrollida Maksu- ja Tolliameti lehel või
          maksunõustajaga – maksunõustamist me ise ei paku.
        </p>
      </TextSection>

      <Faq
        items={FAQ_HINNAKUJUNDUS}
        eyebrow="Hind ja protsess"
        title="Korduma kippuvad küsimused hinna kohta"
      />

      <CtaBand
        title="Küsi oma kinnistule konkreetne number"
        text="Üldise hinnakirja asemel saad pakkumise, mille iga rida on lahti seletatud."
      />

      <RelatedLinks
        links={[
          {
            to: "/metsakinnistute-ost/",
            title: "Metsakinnistute ost",
            desc: "Mida me ostame ja mis seisus kinnistud meile sobivad.",
          },
          {
            to: "/raieoiguse-ost/",
            title: "Raieõiguse ost",
            desc: "Alternatiiv kinnistu müügile – maa jääb sinu nimele.",
          },
          {
            to: "/viljandimaa/",
            title: "Viljandimaa ja teised maakonnad",
            desc: "Kuidas asukoht hinda mõjutab ja kus me ostame.",
          },
        ]}
      />

      <TextSection eyebrow="Järgmine samm" title="Kõik algab ühest katastritunnusest">
        <p>
          Saada see meile <Link to="/kontakt/#hinnaparing">hinnapäringu vormiga</Link> või helista –
          ülejäänu on meie töö.
        </p>
      </TextSection>
    </>
  );
}
