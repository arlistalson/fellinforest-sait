/**
 * Artiklite andmed – üks allikas nii marsruutidele (SEO, sitemap) kui ka
 * /artiklid/ loetelule, et kuupäevad ja pealkirjad ei läheks lahku.
 */
export interface ArticleMeta {
  path: string;
  /** Lehe H1 ja kaardi pealkiri */
  headline: string;
  /** Lühike kokkuvõte loetelu kaardil */
  excerpt: string;
  /** ISO kuupäev, nt "2026-11-23" */
  published: string;
  modified: string;
}

export const ARTICLE_EUDR: ArticleMeta = {
  path: "/artiklid/eudr-raadamismaarus-metsaomanikule/",
  headline: "Raadamismäärus (EUDR): mida peab metsaomanik puidu müümisel teadma",
  excerpt:
    "Metsa majandamise reeglid jäävad samaks, kuid puidu müümisel tuleb tõendada selle päritolu. Palgi, paberipuidu, küttepuidu ja hakke puhul kehtib nõue 30. detsembrist 2026 – ka eraisikule.",
  published: "2026-11-23",
  modified: "2026-11-23",
};

/** Uuemad eespool. */
export const ARTICLES: ArticleMeta[] = [ARTICLE_EUDR];

/** "2026-11-23" → "23.11.2026" */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
}
