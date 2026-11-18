// Avalikud Maa- ja Ruumiameti / Keskkonnaagentuuri teenused – kõik lubavad CORS-i, serverit pole vaja.
const OWS = "https://gsavalik.envir.ee/geoserver/ows";
const ORTHO = "https://kaart.maaamet.ee/wms/fotokaart";
const CADASTRE_WMS = "https://gsavalik.envir.ee/geoserver/kataster/wms";

export type Parcel = {
  tunnus: string;
  mk_nimi: string;
  ov_nimi: string;
  ay_nimi: string;
  l_aadress: string | null;
  pindala: number | null; // m²
  haritav: number | null;
  rohumaa: number | null;
  mets: number | null;
  ouemaa: number | null;
  muumaa: number | null;
  kinnistu: string | null;
  rings: number[][][]; // EPSG:3301 [E, N]
};

export type Row = {
  id: number;
  tunnus: string;
  eraldis: string;
  raieliik: string;
  pindala: string;
  maht: string;
  info: string; // ainult adminile, PDF-i ei lähe
};

type Feature<T> = { properties: T; geometry: { type: string; coordinates: any } | null };

type Stand = {
  katastri_nr: string;
  eraldise_nr: number;
  pindala: number | null;
  invent_kp: string | null;
  peapuuliik_kood: string | null;
  keskm_vanus: number | null;
  korgus: number | null;
};

type Notice = {
  katastri_nr: string;
  eraldise_nr: number;
  pindala: number | null;
  too_kood: string | null;
};

async function wfs<T>(typeName: string, cql: string, props: string): Promise<Feature<T>[]> {
  const q = new URLSearchParams({
    service: "WFS",
    version: "2.0.0",
    request: "GetFeature",
    typeNames: typeName,
    outputFormat: "application/json",
    srsName: "EPSG:3301",
    propertyName: props,
    cql_filter: cql,
  });
  const res = await fetch(`${OWS}?${q}`);
  if (!res.ok) throw new Error(`${typeName}: HTTP ${res.status}`);
  return (await res.json()).features;
}

const TUNNUS = /^\d{5}:\d{3}:\d{4}$/;
const KINNISTU = /^\d{3,9}$/;

/** "31701:003:0123, 2854337" → katastritunnused ja kinnistu numbrid. Muu sisend visatakse tagasi (kaitseb ka CQL-i). */
export function parseInput(input: string): { tunnused: string[]; kinnistud: string[]; bad: string[] } {
  const tokens = input.split(/[\s,;]+/).filter(Boolean);
  return {
    tunnused: tokens.filter((t) => TUNNUS.test(t)),
    kinnistud: tokens.filter((t) => KINNISTU.test(t)),
    bad: tokens.filter((t) => !TUNNUS.test(t) && !KINNISTU.test(t)),
  };
}

const list = (xs: string[]) => xs.map((x) => `'${x}'`).join(",");

export async function fetchParcels(tunnused: string[], kinnistud: string[]): Promise<Parcel[]> {
  const cql = [
    tunnused.length && `tunnus IN (${list(tunnused)})`,
    kinnistud.length && `kinnistu IN (${list(kinnistud)})`,
  ]
    .filter(Boolean)
    .join(" OR ");
  const feats = await wfs<Omit<Parcel, "rings">>(
    "kataster:ky_kehtiv",
    cql,
    "tunnus,mk_nimi,ov_nimi,ay_nimi,l_aadress,pindala,haritav,rohumaa,mets,ouemaa,muumaa,kinnistu,geom",
  );
  return feats.map((f) => ({
    ...f.properties,
    rings: !f.geometry
      ? []
      : f.geometry.type === "MultiPolygon"
        ? f.geometry.coordinates.flat()
        : f.geometry.coordinates,
  }));
}

/** Read: kehtivad metsateatised kui on, muidu kõik eraldised. Maht jääb tühjaks – admin sisestab ise. */
export async function fetchRows(tunnused: string[]): Promise<Row[]> {
  const cql = `katastri_nr IN (${list(tunnused)})`;
  const [standFeats, noticeFeats] = await Promise.all([
    wfs<Stand>(
      "metsaregister:eraldis",
      cql,
      "katastri_nr,eraldise_nr,pindala,invent_kp,peapuuliik_kood,keskm_vanus,korgus",
    ),
    wfs<Notice>("metsaregister:teatis", cql, "katastri_nr,eraldise_nr,pindala,too_kood"),
  ]);

  // Registris võib sama eraldise nr olla nii vanast kui uuest inventuurist – jäta uusim.
  const stands = new Map<string, Stand>();
  for (const { properties: s } of standFeats) {
    const key = `${s.katastri_nr}/${s.eraldise_nr}`;
    const prev = stands.get(key);
    if (!prev || (s.invent_kp ?? "") > (prev.invent_kp ?? "")) stands.set(key, s);
  }

  let id = 0;
  const rows: Row[] = [];
  for (const t of tunnused) {
    const notices = noticeFeats.map((f) => f.properties).filter((n) => n.katastri_nr === t);
    const src: { nr: number; pindala: number | null; raieliik: string }[] = notices.length
      ? notices.map((n) => ({ nr: n.eraldise_nr, pindala: n.pindala, raieliik: n.too_kood ?? "" }))
      : [...stands.values()]
          .filter((s) => s.katastri_nr === t)
          .map((s) => ({ nr: s.eraldise_nr, pindala: s.pindala, raieliik: "" }));

    src.sort((a, b) => a.nr - b.nr);
    for (const r of src) {
      const s = stands.get(`${t}/${r.nr}`);
      rows.push({
        id: ++id,
        tunnus: t,
        eraldis: String(r.nr),
        raieliik: r.raieliik,
        pindala: r.pindala == null ? "" : String(r.pindala),
        maht: "", // maht sisestatakse alati käsitsi
        info: s
          ? [s.peapuuliik_kood, s.keskm_vanus && `${s.keskm_vanus}a`, s.korgus && `${s.korgus}m`].filter(Boolean).join(" ")
          : "",
      });
    }
  }
  return rows;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Kaardipilti ei saanud laadida`));
    img.src = src;
  });
}

export const MAP_W = 1000;
export const MAP_H = 750;

/** Ortofoto + katastripiirid + punane kinnistu kontuur → JPEG data-URL. */
export async function renderMap(p: Parcel): Promise<string> {
  const pts = p.rings.flat();
  const xs = pts.map((c) => c[0]);
  const ys = pts.map((c) => c[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  // 1.8× kinnistu ulatus, vähemalt 500 m, kuvasuhe 4:3
  let w = Math.max((Math.max(...xs) - Math.min(...xs)) * 1.8, 500);
  let h = Math.max((Math.max(...ys) - Math.min(...ys)) * 1.8, 500 * (MAP_H / MAP_W));
  if (w / h > MAP_W / MAP_H) h = (w * MAP_H) / MAP_W;
  else w = (h * MAP_W) / MAP_H;
  const [minx, miny, maxx, maxy] = [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2];

  // WMS 1.3.0 + EPSG:3301 → telgede järjekord N,E
  const wms = (base: string, layers: string, format: string) =>
    `${base}?${new URLSearchParams({
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      LAYERS: layers,
      STYLES: "",
      CRS: "EPSG:3301",
      BBOX: `${miny},${minx},${maxy},${maxx}`,
      WIDTH: String(MAP_W),
      HEIGHT: String(MAP_H),
      FORMAT: format,
      TRANSPARENT: "true",
    })}`;

  const [ortho, cad] = await Promise.all([
    loadImage(wms(ORTHO, "EESTIFOTO", "image/jpeg")),
    loadImage(wms(CADASTRE_WMS, "kataster:ky_kehtiv", "image/png")),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = MAP_W;
  canvas.height = MAP_H;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(ortho, 0, 0);
  ctx.drawImage(cad, 0, 0);

  const px = (c: number[]) => [((c[0] - minx) / w) * MAP_W, ((maxy - c[1]) / h) * MAP_H] as const;
  ctx.strokeStyle = "#ff1a1a";
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  for (const ring of p.rings) {
    ctx.beginPath();
    ring.forEach((c, i) => (i ? ctx.lineTo(...px(c)) : ctx.moveTo(...px(c))));
    ctx.closePath();
    ctx.stroke();
  }

  ctx.font = "bold 22px Helvetica, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#fff";
  ctx.strokeText(p.tunnus, MAP_W / 2, MAP_H / 2);
  ctx.fillText(p.tunnus, MAP_W / 2, MAP_H / 2);
  ctx.font = "14px Helvetica, Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.lineWidth = 3;
  ctx.strokeText("© Maa- ja Ruumiamet", 10, MAP_H - 10);
  ctx.fillText("© Maa- ja Ruumiamet", 10, MAP_H - 10);

  return canvas.toDataURL("image/jpeg", 0.85);
}
