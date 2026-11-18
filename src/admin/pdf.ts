import { jsPDF } from "jspdf";
import type { Parcel, Row } from "./data";

export type OfferType = "raie" | "kinnistu";

export type Offer = {
  tyyp: OfferType;
  nr: string;
  saaja: string;
  pakkuja: string;
  kontakt: string;
  sissejuhatus: string;
  pealkiri: string;
  hind: string; // raiepakkumise koguhind
  hinnad: Record<string, string>; // kinnistu ostupakkumine: hind katastritunnuse kaupa
  tingimused: string;
  jalus: string; // "vasak | keskmine | parem"
  parcels: Parcel[];
  maps: Record<string, string>;
  rows: Row[];
};

const GREEN: [number, number, number] = [29, 92, 63];
const M = 18; // äärised mm
const PAGE_W = 210;
const PAGE_H = 297;
const BOTTOM = PAGE_H - 24; // jaluse kohal

const ha = (m2: number | null) => (m2 ? `${(m2 / 10000).toFixed(2)} ha` : "-");
export const num = (s: string) => Number(s.replace(",", ".")) || 0;
const fmt = (n: number, d: number) => String(Math.round(n * 10 ** d) / 10 ** d);
// "120000" → "120 000 EUR" (tavaline tühik – WinAnsi fondis on see kindlalt olemas)
export const eur = (n: number) => `${fmt(n, 2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} EUR`;

// Vaiketekstid on ainsuses; paketi (mitu kinnistut) puhul pannakse need PDF-is mitmusesse.
// Töötab ka salvestatud/muudetud tekstidel, kui fraas on alles – muul juhul jääb tekst puutumata.
const PLURAL: [string, string][] = [
  ["kirjeldatud kinnistu ", "kirjeldatud kinnistute "],
  ["hõlmab kinnistut koos sellel kasvava", "hõlmab kinnistuid koos neil kasvava"],
  ["KINNISTU OSTUPAKKUMINE", "KINNISTUTE OSTUPAKKUMINE"],
];
export const pluralize = (text: string, count: number) =>
  count > 1 ? PLURAL.reduce((t, [one, many]) => t.split(one).join(many), text) : text;

export function buildPdf(input: Offer, logo: string, logoRatio: number): jsPDF {
  const n = input.parcels.length;
  const o: Offer = {
    ...input,
    sissejuhatus: pluralize(input.sissejuhatus, n),
    pealkiri: pluralize(input.pealkiri, n),
    tingimused: pluralize(input.tingimused, n),
  };
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFont("helvetica", "normal");
  let y = 0;

  const ensure = (h: number) => {
    if (y + h > BOTTOM) {
      doc.addPage();
      y = M + 4;
    }
  };
  const para = (text: string, size = 11, width = PAGE_W - 2 * M) => {
    doc.setFont("helvetica", "normal").setFontSize(size);
    for (const line of doc.splitTextToSize(text, width) as string[]) {
      ensure(5);
      doc.text(line, M, y);
      y += size * 0.45;
    }
  };

  // Päis
  const logoW = 48;
  doc.addImage(logo, "PNG", M, 10, logoW, logoW / logoRatio);
  doc.setFont("helvetica", "bold").setFontSize(11);
  doc.text(`Pakkumise nr: ${o.nr}`, PAGE_W - M, 18, { align: "right" });

  // Saaja / Pakkuja
  const col2 = 115;
  y = 50;
  doc.setFontSize(14).text("Saaja:", M, y).text("Pakkuja:", col2, y);
  doc.setFont("helvetica", "normal").setFontSize(11);
  const block = (text: string, x: number, top: number, w: number) => {
    const lines = doc.splitTextToSize(text, w) as string[];
    doc.text(lines, x, top);
    return top + lines.length * 5;
  };
  y = Math.max(block(o.saaja, M, y + 6, col2 - M - 5), block(o.pakkuja, col2, y + 6, PAGE_W - M - col2)) + 6;

  // Pakkumise objekt / kontakt
  doc.setFont("helvetica", "bold").setFontSize(14).text("Pakkumise objekt:", M, y);
  doc.setFont("helvetica", "normal").setFontSize(11);
  y = Math.max(
    block(o.parcels.map((p) => p.tunnus).join(", "), M, y + 6, col2 - M - 5),
    block(o.kontakt, col2, y + 6, PAGE_W - M - col2),
  ) + 6;

  para(o.sissejuhatus);
  y += 8;

  // Kinnistud
  ensure(12);
  doc.setFont("helvetica", "bold").setFontSize(14).text(o.pealkiri, PAGE_W / 2, y, { align: "center" });
  y += 8;

  const imgX = 92;
  const imgW = PAGE_W - M - imgX;
  const imgH = imgW * 0.75;
  for (const p of o.parcels) {
    const facts: [string, string][] = [
      ["Maakond:", p.mk_nimi],
      ["Omavalitsus:", p.ov_nimi],
      ["Asustusüksus:", p.ay_nimi],
      ["Tunnus:", p.tunnus],
      ["Lähiaadress:", p.l_aadress ?? "-"],
      ["Pindala:", ha(p.pindala)],
      ["Haritav maa:", ha(p.haritav)],
      ["Rohumaa:", ha(p.rohumaa)],
      ["Metsamaa:", ha(p.mets)],
      ["Õuemaa:", ha(p.ouemaa)],
      ["Muu maa:", ha(p.muumaa)],
    ];
    if (p.kinnistu) facts.splice(4, 0, ["Kinnistu nr:", p.kinnistu]);
    // Ühe kinnistu puhul piisab all olevast ostuhinnast – kinnistu juures näidatakse hinda ainult paketis
    const price = o.tyyp === "kinnistu" && o.parcels.length > 1 ? num(o.hinnad[p.tunnus] ?? "") : 0;
    if (price) facts.push(["Pakutav hind:", eur(price)]);
    const blockH = Math.max(imgH, 12 + facts.length * 5.2);
    ensure(blockH + 4);
    const top = y;
    doc.setFont("helvetica", "bold").setFontSize(13).text("Kinnistu kirjeldus:", M, top + 5);
    facts.forEach(([k, v], i) => {
      const ly = top + 12 + i * 5.2;
      doc.setFont("helvetica", "bold").setFontSize(10.5).text(k, M, ly);
      doc.setFont("helvetica", k === "Pakutav hind:" ? "bold" : "normal").text(doc.splitTextToSize(v, imgX - M - 34)[0], M + 30, ly);
    });
    if (o.maps[p.tunnus]) doc.addImage(o.maps[p.tunnus], "JPEG", imgX, top, imgW, imgH);
    y = top + blockH + 6;
  }

  if (o.tyyp === "kinnistu") {
    const total = o.parcels.reduce((a, p) => a + num(o.hinnad[p.tunnus] ?? ""), 0);
    if (total) {
      ensure(14);
      const label = o.parcels.length > 1 ? "Pakutav ostuhind kokku" : "Pakutav ostuhind";
      doc.setFont("helvetica", "bold").setFontSize(13).text(`${label}: ${eur(total)}`, M, y + 4);
      y += 16;
    }
  } else {
    // Raietabel
    const cols = [M + 2, M + 38, M + 54, M + 74, M + 100, M + 148];
    const heads = ["Katastritunnus", "Eraldis", "Raieliik", "Pindala (ha)", "Hinnanguline maht (tm)", "Hind"];
    const head = () => {
      doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(60);
      heads.forEach((h, i) => doc.text(h, cols[i], y));
      doc.setTextColor(0);
      y += 3;
    };
    ensure(20);
    head();
    doc.setDrawColor(0).setLineWidth(0.6);
    doc.line(M, y, PAGE_W - M, y);
    let prevTunnus = "";
    for (const r of o.rows) {
      if (y + 7 > BOTTOM) {
        doc.line(M, y, PAGE_W - M, y);
        doc.addPage();
        y = M + 4;
        head();
        doc.line(M, y, PAGE_W - M, y);
        prevTunnus = "";
      }
      doc.setFontSize(10.5);
      if (r.tunnus !== prevTunnus) doc.text(r.tunnus, cols[0], y + 5);
      prevTunnus = r.tunnus;
      [r.eraldis, r.raieliik, r.pindala, r.maht].forEach((v, i) => doc.text(v, cols[i + 1], y + 5));
      y += 7;
      doc.setLineWidth(0.15).line(cols[1] - 2, y, PAGE_W - M, y).setLineWidth(0.6);
  }
  doc.line(M, y, PAGE_W - M, y);

  const totalHa = o.rows.reduce((a, r) => a + num(r.pindala), 0);
  const totalTm = o.rows.reduce((a, r) => a + num(r.maht), 0);
  y += 6;
  doc.setFont("helvetica", "bold").setFontSize(11);
  doc.text("Kokku", cols[0], y);
  doc.text(`${fmt(totalHa, 2)} ha`, cols[3], y);
  doc.text(`${fmt(totalTm, 0)} tm`, cols[4], y);
  if (o.hind.trim()) doc.text(`${o.hind.trim()} EUR`, cols[5], y);
  y += 12;
  }

  if (o.tingimused.trim()) para(o.tingimused);

  // Jalus igale lehele
  const parts = o.jalus.split("|").map((s) => s.trim());
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...GREEN).setLineWidth(0.3).line(M, PAGE_H - 16, PAGE_W - M, PAGE_H - 16);
    doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(...GREEN);
    if (parts[0]) doc.text(parts[0], M, PAGE_H - 11);
    if (parts[1]) doc.text(parts[1], PAGE_W / 2, PAGE_H - 11, { align: "center" });
    if (parts[2]) doc.text(parts[2], PAGE_W - M, PAGE_H - 11, { align: "right" });
    doc.setTextColor(0);
  }
  return doc;
}
