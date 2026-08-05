import type { ComponentType } from "react";
import type { PageMeta } from "./seo";
import { normalizePath } from "./router";
import {
  FAQ_GENERAL,
  FAQ_HINNAKUJUNDUS,
  FAQ_KONTAKT,
  FAQ_MAAKONNAD,
  FAQ_METSAKINNISTU,
  FAQ_METSAMAJANDAMINE,
  FAQ_POLLUMAA,
  FAQ_RAIEOIGUS,
} from "./content/faq";
import Home from "./pages/Home";
import Metsakinnistud from "./pages/Metsakinnistud";
import Raieoigus from "./pages/Raieoigus";
import Pollumaa from "./pages/Pollumaa";
import Metsamajandamine from "./pages/Metsamajandamine";
import Hinnakujundus from "./pages/Hinnakujundus";
import Kontakt from "./pages/Kontakt";
import Piirkonnad from "./pages/Piirkonnad";
import NotFound from "./pages/NotFound";

export interface Route extends PageMeta {
  component: ComponentType;
  /** Lehe lähtefail – prerender arvutab selle importide git-ajaloost sitemap'i lastmod'i. */
  source: string;
}

export const ROUTES: Route[] = [
  {
    path: "/",
    component: Home,
    source: "src/pages/Home.tsx",
    breadcrumb: "Avaleht",
    title: "Ostame metsakinnistuid ja raieõigust – Fellin Forest",
    description:
      "Ostame metsakinnistuid, raieõigust ja põllumaad üle Eesti. Tasuta hindamine, konkreetne pakkumine 24 tunni jooksul, notaritasud meie kanda.",
    faq: FAQ_GENERAL,
    priority: "1.0",
    changefreq: "monthly",
  },
  {
    path: "/metsakinnistute-ost/",
    component: Metsakinnistud,
    source: "src/pages/Metsakinnistud.tsx",
    breadcrumb: "Metsakinnistute ost",
    title: "Metsakinnistute ost – müü mets õiglase hinnaga | Fellin Forest",
    description:
      "Ostame metsakinnistuid üle Eesti – ka läbiraiutud, hüpoteegiga ja kaasomandis kinnistuid. Päringuks piisab katastritunnusest, pakkumine 24 tunniga.",
    faq: FAQ_METSAKINNISTU,
    service: {
      name: "Metsakinnistute ost",
      type: "Metsakinnistu ost",
      description:
        "Metsakinnistute ost üle Eesti igas seisukorras: raieküps mets, noorendikud, läbiraiutud maa, hüpoteegiga ja kaasomandis kinnistud. Tasuta hindamine ja notaritasud ostja kanda.",
    },
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/raieoiguse-ost/",
    component: Raieoigus,
    source: "src/pages/Raieoigus.tsx",
    breadcrumb: "Raieõiguse ost",
    title: "Raieõiguse ost – müü raieõigus, maa jääb sulle | Fellin Forest",
    description:
      "Ostame raieõigust üle Eesti. Maa jääb sinu omandisse, raha laekub enne raie algust ja pärast töid jääb korrastatud raiesmik. Küsi tasuta pakkumist.",
    faq: FAQ_RAIEOIGUS,
    service: {
      name: "Raieõiguse ost",
      type: "Raieõiguse ost",
      description:
        "Raieõiguse ost notariaalse lepinguga: raieala, raieliik ja tähtaeg lepitakse kokku, raha laekub enne raie algust ning maa jääb omaniku nimele.",
    },
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/pollumaa-ost/",
    component: Pollumaa,
    source: "src/pages/Pollumaa.tsx",
    breadcrumb: "Põllumaa ost",
    title: "Põllumaa ost – ostame haritavat maad ja rohumaid | Fellin Forest",
    description:
      "Ostame põllumaad, rohumaid ja sööti jäänud maatükke üle Eesti. Ka rendile antud maa – leping jääb kehtima. Tasuta hindamine, pakkumine 24 tunniga.",
    faq: FAQ_POLLUMAA,
    service: {
      name: "Põllumaa ost",
      type: "Põllumaa ost",
      description:
        "Põllumaa, rohumaa ja maatulundusmaa ost üle Eesti, sealhulgas rendile antud ja kasutusest väljas olev maa.",
    },
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/metsamajandamine/",
    component: Metsamajandamine,
    source: "src/pages/Metsamajandamine.tsx",
    breadcrumb: "Metsamajandamine",
    title: "Metsamajandamine – hooldusraied, uuendamine, kava | Fellin Forest",
    description:
      "Metsamajandamiskava, valgustus- ja harvendusraie, maapinna ettevalmistus, istutus ja kultuuri hooldus. Aitame ka metsateatiste ja toetustega.",
    faq: FAQ_METSAMAJANDAMINE,
    service: {
      name: "Metsamajandamine",
      type: "Metsamajandamine",
      description:
        "Metsamajandamisteenused eraomanikele: majandamiskava, hooldusraied, uuendamine ja istutus, kultuuri hooldus, metsateatised ja toetuste taotlemine.",
    },
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/hinnakujundus/",
    component: Hinnakujundus,
    source: "src/pages/Hinnakujundus.tsx",
    breadcrumb: "Hinnakujundus ja protsess",
    title: "Metsa hind ja müügiprotsess – kuidas hind kujuneb | Fellin Forest",
    description:
      "Millest metsakinnistu hind koosneb ja kuidas tehing samm-sammult käib – päringust notarini. Tasuta hindamine, notaritasud meie kanda.",
    faq: FAQ_HINNAKUJUNDUS,
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/viljandimaa/",
    component: Piirkonnad,
    source: "src/pages/Piirkonnad.tsx",
    breadcrumb: "Viljandimaa ja teised maakonnad",
    title: "Metsa ost Viljandimaal ja üle Eesti | Fellin Forest",
    description:
      "Fellin Forest OÜ kontor on Viljandis, Lossi tn 15. Ostame metsakinnistuid, raieõigust ja põllumaad kõigis 15 maakonnas – ka Saaremaal ja Hiiumaal.",
    faq: FAQ_MAAKONNAD,
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/kontakt/",
    component: Kontakt,
    source: "src/pages/Kontakt.tsx",
    breadcrumb: "Kontakt",
    title: "Kontakt – Fellin Forest OÜ, Lossi tn 15, Viljandi",
    description:
      "Helista +372 5806 5274 või kirjuta enrico@fellinforest.ee. Fellin Forest OÜ, Lossi tn 15, 71003 Viljandi. Vastame igale päringule 24 tunni jooksul.",
    faq: FAQ_KONTAKT,
    priority: "0.9",
    changefreq: "yearly",
  },
];

export const NOT_FOUND: Route = {
  path: "/404/",
  component: NotFound,
  source: "src/pages/NotFound.tsx",
  breadcrumb: "Lehte ei leitud",
  title: "Lehte ei leitud – Fellin Forest",
  description: "Sellist lehte ei ole. Vaata teenuseid või võta meiega ühendust.",
  noindex: true,
};

export function matchRoute(url: string): Route {
  const path = normalizePath(url);
  return ROUTES.find((route) => route.path === path) ?? NOT_FOUND;
}
