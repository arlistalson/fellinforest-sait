import PageHero from "../../components/PageHero";
import TextSection, { ArrowList, InfoGrid } from "../../components/TextSection";
import CtaBand from "../../components/CtaBand";
import RelatedLinks from "../../components/RelatedLinks";
import { ARTICLE_EUDR, formatDate } from "../../content/articles";
import { Link } from "../../router";

/*
 * Faktid kontrollitud 23.11.2026 seisuga:
 * - Kliimaministeeriumi EUDR-i leht (uuendatud 20.11.2026)
 * - Kliimaministeeriumi ja Keskkonnaameti esitlus metsasektorile 31.08.2026
 * - Euroopa Komisjoni EUDR-i leht; määrused (EL) 2023/1115 ja 2025/2650
 * Kui tähtajad või metsaregistri lahendus muutuvad, uuenda ka `modified`
 * failis src/content/articles.ts.
 */

const SOURCES = [
  {
    href: "https://kliimaministeerium.ee/elurikkus-keskkonnakaitse/metsandus/el-raadamisvabade-toodete-maarus-eudr",
    label: "Kliimaministeerium: EL raadamisvabade toodete määrus (EUDR)",
  },
  {
    href: "https://kliimaministeerium.ee/sites/default/files/documents/2026-08/KLIM_KeA%20esitlus_sektor_31.08.26.pdf",
    label: "Kliimaministeeriumi ja Keskkonnaameti esitlus metsasektorile, 31.08.2026 (PDF)",
  },
  {
    href: "https://environment.ec.europa.eu/topics/forests/deforestation/regulation-deforestation-free-products_en",
    label: "Euroopa Komisjon: EU Deforestation Regulation (inglise keeles)",
  },
];

interface DeadlineRow {
  who: string;
  products: string;
  date: string;
}

const DEADLINES: DeadlineRow[] = [
  {
    who: "Suur või keskmise suurusega ettevõte",
    products: "Kõik määruse alla kuuluvad tooted",
    date: "30.12.2026",
  },
  {
    who: "Eraisik, mikro- või väikeettevõte",
    products:
      "Senise EL-i puidumääruse (EUTR) lisas olnud tooted: palk, paberipuit, küttepuit, hakkepuit, saepuru, graanulid ja briketid, saematerjal, spoon, puitplaadid jm",
    date: "30.12.2026",
  },
  {
    who: "Eraisik, mikro- või väikeettevõte",
    products: "Tooted, mida EUTR-i lisas ei olnud",
    date: "üldjuhul 30.06.2027",
  },
];

function DeadlineTable() {
  return (
    <div className="compare-wrap">
      <table className="compare-table deadline-table">
        <caption>Millal EUDR-i nõuded puidule kehtima hakkavad</caption>
        <thead>
          <tr>
            <th scope="col">Kes müüb</th>
            <th scope="col">Mida müüb</th>
            <th scope="col">Nõue kehtib alates</th>
          </tr>
        </thead>
        <tbody>
          {DEADLINES.map((row) => (
            <tr key={`${row.who}-${row.date}`}>
              <th scope="row">{row.who}</th>
              <td data-label="Mida müüb">{row.products}</td>
              <td className="nowrap" data-label="Nõue kehtib alates">
                <strong>{row.date}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function EudrRaadamismaarus() {
  const updated =
    ARTICLE_EUDR.modified !== ARTICLE_EUDR.published
      ? ` · Uuendatud ${formatDate(ARTICLE_EUDR.modified)}`
      : "";

  return (
    <>
      <PageHero
        crumb="Raadamismäärus (EUDR)"
        parent={{ to: "/artiklid/", label: "Artiklid" }}
        eyebrow="Artikkel · EUDR"
        title={ARTICLE_EUDR.headline}
        meta={`Avaldatud ${formatDate(ARTICLE_EUDR.published)}${updated} · Allikad: Kliimaministeerium, Keskkonnaamet, Euroopa Komisjon`}
        lead="Euroopa Liidu raadamisvabade toodete määrus ei muuda seda, kuidas Eestis metsa majandatakse. Muutub see, et puidu müümisel tuleb tõendada selle päritolu. Kohustus on sellel, kes puidu esimesena turule toob – ja palgi, paberipuidu, küttepuidu ning hakke puhul kehtib see juba 30. detsembrist 2026, ka eraisikust metsaomanikule."
      />

      <TextSection eyebrow="Lühidalt" title="EUDR kolme lausega">
        <InfoGrid
          cards={[
            {
              title: "Deklaratsioon enne müüki",
              desc: "Kes puidu esimesena turule toob, esitab enne seda deklaratsiooni, mis kinnitab puidu päritolu, seaduslikkust ja raadamisvabadust.",
            },
            {
              title: "Tähtaeg 30.12.2026",
              desc: "Palgi, paberipuidu, küttepuidu ja hakke puhul kehtib see tähtaeg ka eraisikule ning mikro- ja väikeettevõttele.",
            },
            {
              title: "Andmed on metsaregistris",
              desc: "Suur osa vajalikust infost on metsaregistris olemas. Sinna tuleb EUDR-i töölaud, mis täidab deklaratsiooni registri andmetega ette.",
            },
          ]}
        />
      </TextSection>

      <TextSection tint eyebrow="Taust" title="Mis on raadamismäärus ja miks see tuli?">
        <p>
          Metsade raadamine põllumaa saamiseks on ülemaailmne probleem. Selle pidurdamiseks võttis
          Euroopa Liit vastu raadamisvabade toodete määruse (EUDR, määrus (EL) 2023/1115). Määrus
          puudutab seitset saadust – puitu, veiseid, soja, kohvi, kakaod, õlipalmi ja kautšukit –
          ning neist valmistatud tooteid.
        </p>
        <p>Puitu ja puittooteid tohib EL-i turule tuua või sealt välja viia ainult siis, kui:</p>
        <ArrowList
          items={[
            "puit pärineb maalt, mida ei ole raadatud pärast 31. detsembrit 2020;",
            "raie ei ole pärast 31. detsembrit 2020 põhjustanud metsa degradeerumist;",
            "puit on toodetud kooskõlas päritoluriigi seadustega;",
            "selle kohta on täidetud hoolsuskohustus ja esitatud deklaratsioon.",
          ]}
        />
        <p>
          Metsa degradeerumine tähendab määruse mõttes põlismetsa või looduslikult uueneva metsa
          muutmist istandikuks või muuks puittaimestikuga maaks või põlismetsa muutmist istutatud
          metsaks. Euroopa Komisjon on liigitanud kõik EL-i liikmesriigid, sealhulgas Eesti,
          väikese riskiga riikideks. Metsa majandamise reeglid seetõttu ei muutu – lisandub
          eelkõige kohustus puidu päritolu tõendada.
        </p>
      </TextSection>

      <TextSection eyebrow="Vastutus" title="Kes deklaratsiooni esitab: raiuja või raieõiguse ostja?">
        <p>
          Deklaratsiooni esitab see, kes laseb puidu <strong>esimest korda EL-i turule</strong> või
          ekspordib selle liidust välja. Kohustus ei teki metsateatise esitamisest ega raie
          tegemisest endast – deklaratsioon peab olema esitatud enne, kui puit esimest korda
          müüki läheb.
        </p>
        <ArrowList
          items={[
            "Kui raiud oma metsa ise ja müüd puidu kokkuostjale või tööstusele, oled üldjuhul ise esmane turuletooja.",
            "Kui müüd raieõiguse ning metsa raiub ja puidu müüb raieõiguse ostja, on esmane turuletooja tema.",
          ]}
        />
        <p>
          Seepärast tasub rollid läbi mõelda juba raieõigust müües, raietöid tellides või
          müügilepingut sõlmides. Pane lepingusse kirja, kes EUDR-i toimingud teeb ja kes annab
          ostjale deklaratsiooni viitenumbri. Nii ei teki hiljem olukorda, kus kumbki ei tea, kelle
          kohustus jäi täitmata. Kui kaalud raieõiguse müüki, küsi seda iga ostja käest enne
          lepingu sõlmimist – ka meie käest.
        </p>
      </TextSection>

      <TextSection tint eyebrow="Tähtajad" title="Millal nõuded kehtima hakkavad?">
        <p>
          Suurtele ja keskmise suurusega ettevõtjatele kehtib EUDR alates 30. detsembrist 2026.
          Eraisikutele ning mikro- ja väikeettevõtjatele kehtib üldjuhul hilisem tähtaeg,
          30. juuni 2027. Puidu puhul on aga oluline erand: hilisem tähtaeg{" "}
          <strong>ei kehti toodetele, mis kuulusid senise EL-i puidumääruse (EUTR) alla</strong>.
          Nende hulka kuulub suurem osa metsamaterjalist.
        </p>
        <DeadlineTable />
        <p>
          Kui müüd palki, paberipuitu, küttepuitu või haket, hakkab nõue sulle seega kehtima
          30. detsembril 2026 – isegi kui oled eraisik või mikroettevõtja. Kahtluse korral leiab
          õige tähtaja toote CN-koodi järgi.
        </p>
        <p>
          Enne seda, kui nõuded sinule ja sinu tootele kehtima hakkavad, ei ole deklaratsiooni vaja
          esitada. Kliimaministeerium palub ka ostjatel mitte nõuda tarnijalt deklaratsiooni enne,
          kui kohustus on tekkinud.
        </p>
      </TextSection>

      <TextSection eyebrow="Nõuded" title="Mida esmane turuletooja peab tõendama?">
        <p>Enne puidu turule laskmist peab esmane turuletooja suutma näidata, et:</p>
        <ArrowList
          items={[
            "puidu päritolukoht on teada ja kaardil koordinaatidega tuvastatav;",
            "vajalik teave, sealhulgas deklaratsiooni number, on kogutud ja seda säilitatakse vähemalt viis aastat;",
            "andmed käivad just selle materjali kohta, mis turule läheb;",
            "deklaratsioon on esitatud enne puidu esmakordset turule toomist;",
            "puit ei pärine metsamaalt, mis on raadatud pärast 31. detsembrit 2020;",
            "raie ei ole põhjustanud metsa degradeerumist.",
          ]}
        />
      </TextSection>

      <TextSection tint eyebrow="Lihtsustused" title="Väikese riskiga riigis on kord lihtsam">
        <p>
          Kuna Eesti on väikese riskiga riik, saab Eestis varutud puidu puhul kasutada{" "}
          <strong>lihtsustatud hoolsuskohustust</strong>. Teave puidu päritolu, koguse ja
          seaduslikkuse kohta tuleb ikka koguda ja säilitada, kuid riskihindamist ja riskide
          maandamist üldjuhul tegema ei pea. Tingimus on, et puit ei ole tarneahelas segunenud
          teadmata või suurema riskiga päritolu puiduga. Kui ilmneb märke võimalikust
          mittevastavusest, tuleb riski siiski täiendavalt hinnata.
        </p>
        <h3>Väike metsaomanik: ühekordne lihtsustatud deklaratsioon</h3>
        <p>
          Eraisikust metsaomanik või mikro- ja väikeettevõtja, kes müüb oma maalt ise varutud
          puitu, loetakse <strong>mikro- või väike-esmatootjaks</strong>. Tema ei pea esitama
          deklaratsiooni iga müügi kohta, vaid esitab ühe korra lihtsustatud deklaratsiooni.
          Selle eest saab ta tunnuskoodi, mille annab edasi oma otsestele ostjatele.
        </p>
        <p>
          Oluline: <strong>ühekordset lihtsustatud deklaratsiooni ei saa esitada metsaregistri
          kaudu</strong> – see esitatakse otse Euroopa Komisjoni EUDR-i infosüsteemis.
          Metsaregistri töölaual saab esitada tavalise hoolsuskohustuse deklaratsiooni. Lihtsam
          kord ei vabasta nõuete täitmisest: puidu päritolu peab ikka teada olema ning puit peab
          olema raadamisvaba ja seaduslikult varutud.
        </p>
      </TextSection>

      <TextSection eyebrow="Metsaregister" title="Metsaregistrisse tuleb EUDR-i töölaud">
        <p>
          Et Eestis varutud puidu andmeid ei peaks mitmesse süsteemi käsitsi sisestama, arendatakse
          metsaregistrisse EUDR-i töölauda. Maaomanik, esmane turuletooja või tema volitatud
          esindaja saab seal koostada metsaregistri andmetega eeltäidetud deklaratsiooni ja
          saata selle EL-i infosüsteemi. Imporditud puidu puhul kasutatakse EL-i infosüsteemi
          otse.
        </p>
        <p>Deklaratsiooni saab töölaual alustada kolmest lähtekohast:</p>
        <ArrowList
          items={[
            "menetletud metsateatisest;",
            "metsakaitseekspertiisist;",
            "erandina ise joonistatud alast – ainult enda kinnistul ja siis, kui raieks metsateatist vaja ei olnud.",
          ]}
        />
        <p>
          Metsateatisest alustades täidab register osa andmeid ise ette, näiteks tööala, asukoha,
          puuliigid ja ligikaudsed kogused. Sina vaatad need üle, parandad või täiendad vajaduse
          korral ja kinnitad, et materjal vastab nõuetele. Vastutus andmete õigsuse eest jääb
          alati deklaratsiooni esitajale.
        </p>
        <p>
          Deklaratsioon ei teki automaatselt siis, kui metsateatis saab lubava otsuse. Selle
          algatab kasutaja ise, kui puidu müük on päriselt plaanis – riik ei tea ette, kas ja millal
          raie tehakse ning kui palju puitu turule jõuab. Metsaregistri kaudu peab iga puidu turule
          laskmine olema deklaratsiooniga kaetud, kuid ühele deklaratsioonile saab panna mitu
          raieala, kui raieaeg on teada.
        </p>
        <p>
          Kliimaministeeriumi andmetel peaks töölaua testkeskkond valmima 2026. aasta lõpuks.
          Kui plaanid kasutada otse EL-i infosüsteemi (näiteks lihtsustatud deklaratsiooni
          jaoks), soovitab ministeerium juba enne tähtaega luua EU Login konto ja registreeruda
          EUDR-i infosüsteemi tootmiskeskkonnas, mis on juba avatud.
        </p>
      </TextSection>

      <TextSection tint eyebrow="Ettevalmistus" title="Kolm sammu metsaomanikule">
        <InfoGrid
          cards={[
            {
              title: "1. Selgita välja, kes on esmane turuletooja",
              desc: "Kas sina ise või raieõiguse ostja, näiteks metsaühistu või metsaettevõte? Pane see lepingusse kirja.",
            },
            {
              title: "2. Kontrolli andmeid",
              desc: "Deklaratsiooniks on vaja päritolu, seaduslikkuse ja koguse andmeid. Suur osa neist on metsaregistris juba olemas.",
            },
            {
              title: "3. Esita deklaratsioon enne müüki",
              desc: "Enne puidu turule viimist peab deklaratsioon olema esitatud ja selle tunnus olemas. Väike-esmatootja võib kasutada ühekordset lihtsustatud deklaratsiooni.",
            },
          ]}
        />
      </TextSection>

      <TextSection eyebrow="Järelevalve" title="Kes kontrollib ja kuidas?">
        <p>
          EUDR-i rakendamist Eestis juhib Kliimaministeerium. Koostamisel on rakendusseadus, mis
          loob järelevalve raamistiku – määrus ise kehtib otse. Pädev asutus on Keskkonnaamet, kes
          teeb järelevalvet puidu ja puittoodete üle ning koondab Eesti aruandluse Euroopa
          Komisjonile. Maksu- ja Tolliamet kontrollib impordi ja ekspordi juures deklaratsiooni
          viite olemasolu.
        </p>
        <p>
          Kontrollid on riskipõhised ja tehakse ette teatamata – kas raiekohal või ettevõtja
          juures. Väikese riskiga päritoluriigi puhul kontrollitakse vähemalt 1% ettevõtjatest.
          Kodumaise puidu puhul vaadatakse eelkõige, kas hoolsuskohustus on täidetud, kas
          materjal on raadamisvaba ning kas turuletoojal oli õigus metsa majandada ja puitu müüa.
          Kogu dokumentatsioon tuleb säilitada vähemalt viis aastat.
        </p>
      </TextSection>

      <TextSection tint eyebrow="Allikad" title="Kust leida lisainfot?">
        <p>
          Sisulistes ja järelevalvega seotud küsimustes saab pöörduda Keskkonnaameti poole.
          Kliimaministeeriumi EUDR-i lehel on määruse tekst ja Euroopa Komisjoni juhendmaterjalid
          eesti keeles.
        </p>
        <ul className="source-list">
          {SOURCES.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="article-disclaimer">
          Artikkel on üldine selgitus seisuga {formatDate(ARTICLE_EUDR.modified)} ega asenda
          õigusnõu. Nõuded ja tähtajad võivad muutuda – kontrolli enne puidu müüki viimast infot
          Kliimaministeeriumi lehelt. Rohkem selgitusi leiad{" "}
          <Link to="/artiklid/">artiklite lehelt</Link>.
        </p>
      </TextSection>

      <CtaBand
        title="Kaalud metsa või raieõiguse müüki?"
        text="Saada katastritunnus ja saad tasuta pakkumise 24 tunni jooksul. Pakkumine ei kohusta sind millekski."
      />

      <RelatedLinks
        links={[
          {
            to: "/raieoiguse-ost/",
            title: "Raieõiguse müük",
            desc: "Saa metsast tulu nii, et maa jääb sinu nimele.",
          },
          {
            to: "/metsa-muuk/",
            title: "Metsa müük: juhend",
            desc: "Kinnistu või raieõigus, hind ja pakkumiste võrdlemine.",
          },
          {
            to: "/artiklid/",
            title: "Kõik artiklid",
            desc: "Selgitused ja juhendid metsaomanikule.",
          },
        ]}
      />
    </>
  );
}
