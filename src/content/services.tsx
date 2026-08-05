import type { ReactNode } from "react";

export interface Service {
  id: string;
  title: string;
  /** Lühikirjeldus teenusekaardil */
  desc: string;
  href: string;
  icon: ReactNode;
}

export const SERVICES: Service[] = [
  {
    id: "metsakinnistu",
    title: "Metsakinnistute ost",
    desc: "Ostame metsakinnistuid igas seisukorras – ka läbiraiutud, hüpoteegiga või kaasomandis kinnistuid. Aus hind ja kiire tehing.",
    href: "/metsakinnistute-ost/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 6 10h3l-4 6h4l-3 5h12l-3-5h4l-4-6h3L12 2z" />
        <path d="M12 21v-3" />
      </svg>
    ),
  },
  {
    id: "raieoigus",
    title: "Raieõiguse ost",
    desc: "Soovid metsa raiuda, aga maad alles hoida? Ostame raieõigust – sina jääd maaomanikuks ja saad raha kätte enne raie algust.",
    href: "/raieoiguse-ost/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 5 8 11m0 0-4.5 4.5a2.1 2.1 0 0 0 3 3L11 14m-3-3 3 3m3-9 3 3m-9 3 8.5-8.5a2.1 2.1 0 0 1 3 3L15 12" />
      </svg>
    ),
  },
  {
    id: "pollumaa",
    title: "Põllumaa ost",
    desc: "Ostame ka põllumaid – nii haritavat maad kui ka kasutusest väljas olevaid maatükke. Küsi pakkumist ja saad ausa turuhinna.",
    href: "/pollumaa-ost/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V8m0 14c0-4-2.5-6-6-6 0 4 2.5 6 6 6Zm0 0c0-4 2.5-6 6-6 0 4-2.5 6-6 6ZM12 8c-3 0-5-2-5-6 4 0 5 2 5 6Zm0 0c3 0 5-2 5-6-4 0-5 2-5 6Z" />
      </svg>
    ),
  },
  {
    id: "metsamajandamine",
    title: "Metsamajandamine",
    desc: "Metsa uuendamine, hooldusraied ja metsamajandamiskavad – hoolitseme, et sinu mets kasvaks väärtuslikuna ka järgmistele põlvedele.",
    href: "/metsamajandamine/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-7m0 0c0-3 2-5 5-5 0 3-2 5-5 5Zm0 0c0-4-2.5-6.5-6-6.5 0 4 2.5 6.5 6 6.5ZM12 8a4 4 0 0 0 4-4 4 4 0 0 0-8 0 4 4 0 0 0 4 4Z" />
      </svg>
    ),
  },
];
