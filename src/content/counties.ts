export interface County {
  slug: string;
  name: string;
  /** Omastav vorm, nt "Viljandimaal" */
  inCounty: string;
  note: string;
}

/** Koduamaakond, mida rõhutame eraldi. */
export const HOME_COUNTY = "Viljandimaa";

export const COUNTIES: County[] = [
  {
    slug: "viljandimaa",
    name: "Viljandimaa",
    inCounty: "Viljandimaal",
    note: "Meie kodumaakond. Ostame nii Sakala kõrgustiku viljakamaid kuusikuid ja männikuid kui ka Võrtsjärve-äärseid madalamaid ja märgemaid alasid, kus kokkuvedu sõltub rohkem aastaajast.",
  },
  {
    slug: "tartumaa",
    name: "Tartumaa",
    inCounty: "Tartumaal",
    note: "Viljandimaa naabermaakond, kuhu jõuame kiiresti. Ostame nii Tartu lähedasi väiksemaid kinnistuid kui ka suuremaid metsamassiive maakonna servaaladel.",
  },
  {
    slug: "parnumaa",
    name: "Pärnumaa",
    inCounty: "Pärnumaal",
    note: "Suure metsasusega maakond, kus on palju männikuid ja soostunud alasid. Meil on kogemust ka kuivendussüsteemide ja piiranguvöönditega kinnistutega.",
  },
  {
    slug: "jarvamaa",
    name: "Järvamaa",
    inCounty: "Järvamaal",
    note: "Hea ligipääsu ja tugeva teedevõrguga maakond – see mõjutab raiekulusid ja seega ka pakkumise hinda soodsalt.",
  },
  {
    slug: "jogevamaa",
    name: "Jõgevamaa",
    inCounty: "Jõgevamaal",
    note: "Ostame nii metsakinnistuid kui ka põllumaad, sealhulgas rendile antud maad, mille puhul kehtiv rendileping jääb kehtima.",
  },
  {
    slug: "valgamaa",
    name: "Valgamaa",
    inCounty: "Valgamaal",
    note: "Künklik maastik ja vahelduv puistu – hindame iga eraldise eraldi, sest keskmine hektarihind ütleb siin tegeliku väärtuse kohta vähe.",
  },
  {
    slug: "polvamaa",
    name: "Põlvamaa",
    inCounty: "Põlvamaal",
    note: "Palju väiksemaid ja kaasomandis kinnistuid. Ostame ka mõttelisi osi ja aitame kaasomanike vahelise kokkuleppe vormistamisel.",
  },
  {
    slug: "vorumaa",
    name: "Võrumaa",
    inCounty: "Võrumaal",
    note: "Kaugem maakond, kuid pakkumise teeme sama kiiresti – takseerandmed ja kaardimaterjal vaatame läbi kontorist ning kohapeale sõidame kokkuleppel.",
  },
  {
    slug: "raplamaa",
    name: "Raplamaa",
    inCounty: "Raplamaal",
    note: "Tallinna ja Pärnu vahel asuv maakond, kus metsakinnistute käive on elav. Tasub võrrelda mitut pakkumist – teeme oma numbri lahti, et saaksid võrrelda.",
  },
  {
    slug: "harjumaa",
    name: "Harjumaa",
    inCounty: "Harjumaal",
    note: "Tallinna lähedus tõstab maa väärtust, kuid samas on siin rohkem kitsendusi ja kaitsealasid. Kontrollime need enne pakkumist alati üle.",
  },
  {
    slug: "laane-virumaa",
    name: "Lääne-Virumaa",
    inCounty: "Lääne-Virumaal",
    note: "Viljakad mullad ja head kuusikud. Ostame nii raieküpset metsa kui ka noorendikke, mille müük tavapärasel teel on keerulisem.",
  },
  {
    slug: "ida-virumaa",
    name: "Ida-Virumaa",
    inCounty: "Ida-Virumaal",
    note: "Ostame kinnistuid ka kaevandusalade lähistel. Kui maal on kaevandamisega seotud kitsendusi, selgitame nende mõju hinnale ausalt välja.",
  },
  {
    slug: "laanemaa",
    name: "Läänemaa",
    inCounty: "Läänemaal",
    note: "Rannikulähedastel aladel on sageli piiranguvööndeid ja vääriselupaiku. Vaatame kitsendused läbi enne, kui hinna välja ütleme.",
  },
  {
    slug: "saaremaa",
    name: "Saaremaa",
    inCounty: "Saaremaal",
    note: "Saartel mõjutavad hinda logistika ja praamiühendus. Ostame ka saartel – nii metsa, raieõigust kui ka põllumaad.",
  },
  {
    slug: "hiiumaa",
    name: "Hiiumaa",
    inCounty: "Hiiumaal",
    note: "Väiksem turg ja vähem ostjaid, mistõttu tasub pakkumisi kindlasti võrrelda. Teeme oma pakkumise ka Hiiumaa kinnistutele.",
  },
];
