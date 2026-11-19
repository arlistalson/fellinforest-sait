import { useEffect, useRef, useState, type FormEvent } from "react";
import type { jsPDF } from "jspdf";
import { fetchParcels, fetchRows, parseInput, renderMap, type Parcel, type Row } from "./data";
import { buildPdf, eur, num, type OfferType } from "./pdf";

// Repo on avalik → paroolidest on siin ainult PBKDF2 räsi (räsitakse "kasutaja:parool", sool UTF-8 stringina).
// shortcut: kontroll on brauseris (staatiline sait); kaitseb tööriista, mitte andmeid – need on niikuinii avalikud.
// Kui lisandub serveripoolne meilisaatmine, peab sama kontroll toimuma serveris.
// Uus konto: node -e 'c=require("crypto");s=c.randomBytes(16).toString("hex");console.log(s,c.pbkdf2Sync("nimi:parool",s,600000,32,"sha256").toString("hex"))'
const ACCOUNTS: Record<string, { salt: string; hash: string; kontakt: string; jalus: string }> = {
  generiks: {
    salt: "7e2e9aca325c99926744d8b07bc0e655",
    hash: "abc0942cb531596d425ad17328fded067910655581d0ec927bc9bac2f3e05265",
    kontakt: "Enrico Orobko, enrico@fellinforest.ee\nTelefon: +372 5340 2340",
    jalus: "Fellin Forest OÜ | Tel. +372 5340 2340 | enrico@fellinforest.ee",
  },
  kristina: {
    salt: "3eb46780395e47f683b36246fae2d8ca",
    hash: "4794a8c04255a3fd705a7f88fd7d7d7e64e5fed8483e3f3121648461fe46aa4d",
    kontakt: "Kristina Aasma, kristina@fellinforest.ee\nTelefon: +372 5561 9360",
    jalus: "Fellin Forest OÜ | Tel. +372 5561 9360 | kristina@fellinforest.ee",
  },
};
const AUTH_KEY = "ff-admin";

async function checkLogin(user: string, pass: string): Promise<boolean> {
  const acc = ACCOUNTS[user];
  if (!acc) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(`${user}:${pass}`), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: enc.encode(acc.salt), iterations: 600000 },
    key,
    256,
  );
  const hex = [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex === acc.hash;
}

const store = {
  get: (k: string) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k: string, v: string | null) => {
    try {
      v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v);
    } catch {
      /* privaatne aken – lihtsalt ei mäleta */
    }
  },
};

const TYPE_TEXT: Record<OfferType, { label: string; sissejuhatus: string; pealkiri: string; tingimused: string }> = {
  raie: {
    label: "Raieõiguse pakkumine",
    sissejuhatus:
      "Edastame Teile meie ettevõtte poolt koostatud hinnapakkumise allpool kirjeldatud kinnistu raiele. Teiepoolsed küsimused ja ettepanekud on igati oodatud.",
    pealkiri: "KAVANDATAV RAIE",
    tingimused:
      "Hinnapakkumise koostamisel arvestasime eelkõige Eestis kehtivaid metsaseadusi ning ekspertide poolt koostatud metsamajanduskava.\nRaiete realiseerimise käigus säilitatakse seemne- ja säilikpuud vastavalt seadusele (5 tm/ha) ja/või Müüjaga eelnevalt kokkulepitud tingimustele. Tööde käigus tekkinud oksad eemaldatakse langilt ja realiseeritakse hakkepuiduks ja/või kasutatakse pehmema langi korral veoteede tugevdamiseks.\nKokkulepitud ostusumma makstakse ettemaksuna ja pärast lepingu sõlmimist. Leping loetakse kehtivaks alles siis, kui ostuhind on Müüjale 100% tasutud. Pakkumise lisana kaasas kasvava metsa raieõiguse võõrandamise lepingu blankett.",
  },
  kinnistu: {
    label: "Kinnistu ostupakkumine",
    sissejuhatus:
      "Edastame Teile meie ettevõtte poolt koostatud ostupakkumise allpool kirjeldatud kinnistu omandamiseks. Teiepoolsed küsimused ja ettepanekud on igati oodatud.",
    pealkiri: "KINNISTU OSTUPAKKUMINE",
    tingimused:
      "Pakkumine hõlmab kinnistut koos sellel kasvava metsaga.\nOstu-müügileping sõlmitakse notariaalselt. Notari- ja riigilõivud tasub Ostja.\nOstuhind tasutakse Müüjale notariaalses lepingus kokkulepitud tingimustel.",
  },
};

const templateFor = (user: string, tyyp: OfferType) => ({
  pakkuja: "Fellin Forest OÜ\nReg. kood 17117278",
  kontakt: ACCOUNTS[user].kontakt,
  sissejuhatus: TYPE_TEXT[tyyp].sissejuhatus,
  pealkiri: TYPE_TEXT[tyyp].pealkiri,
  tingimused: TYPE_TEXT[tyyp].tingimused,
  jalus: ACCOUNTS[user].jalus,
});
type Template = ReturnType<typeof templateFor>;
const templateKey = (user: string, tyyp: OfferType) => `ff-admin-template:${user}:${tyyp}`;

function loadTemplate(user: string, tyyp: OfferType): Template {
  try {
    return { ...templateFor(user, tyyp), ...JSON.parse(store.get(templateKey(user, tyyp)) ?? "{}") };
  } catch {
    return templateFor(user, tyyp);
  }
}

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}${String(d.getHours()).padStart(2, "0")}`;
};

function Login({ onOk }: { onOk: (user: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const user = String(f.get("user")).trim().toLowerCase();
    setBusy(true);
    setErr("");
    const ok = await checkLogin(user, String(f.get("pass")));
    setBusy(false);
    if (!ok) return setErr("Vale kasutajanimi või parool");
    store.set(AUTH_KEY, user);
    onOk(user);
  }
  return (
    <form className="adm-login" onSubmit={submit}>
      <img src="/images/logo3.png" alt="Fellin Forest" />
      <label>
        Kasutajanimi
        <input name="user" autoComplete="username" required autoFocus />
      </label>
      <label>
        Parool
        <input name="pass" type="password" autoComplete="current-password" required />
      </label>
      {err && <p className="adm-error" role="alert">{err}</p>}
      <button className="btn btn-solid" disabled={busy}>{busy ? "Kontrollin…" : "Logi sisse"}</button>
    </form>
  );
}

export default function AdminApp() {
  const [user, setUser] = useState(() => {
    const u = store.get(AUTH_KEY);
    return u && ACCOUNTS[u] ? u : null;
  });
  if (!user) return <Login onOk={setUser} />;
  return (
    <Generator
      user={user}
      onLogout={() => {
        store.set(AUTH_KEY, null);
        setUser(null);
      }}
    />
  );
}

function Generator({ user, onLogout }: { user: string; onLogout: () => void }) {
  const [tyyp, setTyyp] = useState<OfferType>("raie");
  const [query, setQuery] = useState("");
  const [addQuery, setAddQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorAt, setErrorAt] = useState<"search" | "add">("search");
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [maps, setMaps] = useState<Record<string, string>>({});
  const [rows, setRows] = useState<Row[]>([]);
  const [tpl, setTpl] = useState<Template>(() => loadTemplate(user, "raie"));
  const [nr, setNr] = useState(today);
  const [saaja, setSaaja] = useState("");
  const [hind, setHind] = useState("");
  const [hinnad, setHinnad] = useState<Record<string, string>>({});
  const [paketihind, setPaketihind] = useState("");
  const [email, setEmail] = useState({ to: "", subject: "", body: "" });
  const [pdfUrl, setPdfUrl] = useState("");
  const [logo, setLogo] = useState<{ src: string; ratio: number } | null>(null);
  const docRef = useRef<jsPDF | null>(null);

  useEffect(() => {
    fetch("/images/logo3.png")
      .then((r) => r.blob())
      .then((b) => {
        const fr = new FileReader();
        fr.onload = () => {
          const img = new Image();
          img.onload = () => setLogo({ src: String(fr.result), ratio: img.width / img.height });
          img.src = String(fr.result);
        };
        fr.readAsDataURL(b);
      });
  }, []);

  useEffect(() => store.set(templateKey(user, tyyp), JSON.stringify(tpl)), [user, tyyp, tpl]);

  const changeType = (t: OfferType) => {
    setTyyp(t);
    setTpl(loadTemplate(user, t));
  };

  useEffect(() => {
    const objekt = `kinnistu${parcels.length > 1 ? "te" : ""} ${parcels.map((p) => p.tunnus).join(", ")}`;
    setEmail((e) => ({
      ...e,
      subject:
        tyyp === "raie"
          ? "Raieõiguse hinnapakkumine – Fellin Forest"
          : `Kinnistu${parcels.length > 1 ? "te" : ""} ostupakkumine – Fellin Forest`,
      body: `Tere${saaja ? ` ${saaja.split("\n")[0]}` : ""}!\n\nSaadan manuses ${tyyp === "raie" ? `hinnapakkumise ${objekt} raieks` : `ostupakkumise ${objekt} kohta`}.\nKüsimuste korral võtke julgelt ühendust.\n\nLugupidamisega\n${tpl.kontakt}`,
    }));
  }, [tyyp, saaja, parcels, tpl.kontakt]);

  // Eelvaade uueneb iga muudatuse järel (väikese viitega, et trükkimine ei hakiks)
  useEffect(() => {
    if (!logo || !parcels.length) return;
    const t = setTimeout(() => {
      const doc = buildPdf({ ...tpl, tyyp, nr, saaja, hind, hinnad, paketihind, parcels, maps, rows }, logo.src, logo.ratio);
      docRef.current = doc;
      const url = URL.createObjectURL(doc.output("blob"));
      setPdfUrl((old) => {
        if (old) URL.revokeObjectURL(old);
        return url;
      });
    }, 400);
    return () => clearTimeout(t);
  }, [logo, tpl, tyyp, nr, saaja, hind, hinnad, paketihind, parcels, maps, rows]);

  /** Toob kinnistud. append=true lisab olemasolevale pakkumisele (pakett), muidu alustab uut. */
  async function load(input: string, append: boolean): Promise<boolean> {
    const { tunnused, kinnistud, bad } = parseInput(input);
    setErrorAt(append ? "add" : "search");
    if (bad.length) {
      setError(`Ei tunne ära: ${bad.join(", ")} (katastritunnus nt 31701:003:0123 või kinnistu nr)`);
      return false;
    }
    if (!tunnused.length && !kinnistud.length) {
      setError("Sisesta katastritunnus või kinnistu number");
      return false;
    }
    setLoading(true);
    setError("");
    try {
      const found = await fetchParcels(tunnused, kinnistud);
      const missing = tunnused.filter((t) => !found.some((p) => p.tunnus === t));
      if (!found.length) throw new Error("Ühtegi katastriüksust ei leitud");
      const ps = append ? found.filter((p) => !parcels.some((x) => x.tunnus === p.tunnus)) : found;
      if (!ps.length) throw new Error("Need kinnistud on juba pakkumises");
      const [fetched, mapList] = await Promise.all([
        fetchRows(ps.map((p) => p.tunnus)),
        Promise.all(ps.map((p) => renderMap(p).catch(() => ""))),
      ]);
      const newMaps = Object.fromEntries(ps.map((p, i) => [p.tunnus, mapList[i]]));
      if (append) {
        // fetchRows nummerdab alati 1-st – nihuta id-d, et need ei kattuks olemasolevatega
        const base = rows.reduce((a, r) => Math.max(a, r.id), 0);
        setParcels((old) => [...old, ...ps]);
        setRows((old) => [...old, ...fetched.map((r, i) => ({ ...r, id: base + i + 1 }))]);
        setMaps((old) => ({ ...old, ...newMaps }));
      } else {
        setParcels(ps);
        setRows(fetched);
        setMaps(newMaps);
      }
      const warn = [
        missing.length && `Ei leitud: ${missing.join(", ")}`,
        mapList.some((m) => !m) && "Mõne kaardipildi laadimine ebaõnnestus",
      ].filter(Boolean);
      if (warn.length) setError(warn.join(". "));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Päring ebaõnnestus");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function search(e: FormEvent) {
    e.preventDefault();
    await load(query, false);
  }

  async function addParcels(e: FormEvent) {
    e.preventDefault();
    if (await load(addQuery, true)) setAddQuery("");
  }

  const removeParcel = (t: string) => {
    setParcels((ps) => ps.filter((p) => p.tunnus !== t));
    setRows((rs) => rs.filter((r) => r.tunnus !== t));
  };
  const setRow = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const fileName = `${tyyp === "raie" ? "Raiepakkumine" : `Kinnistu${parcels.length > 1 ? "te" : ""} ostupakkumine`} ${nr}.pdf`;

  function download() {
    docRef.current?.save(fileName);
  }

  function saveAs() {
    const name = prompt("Faili nimi", fileName.replace(/\.pdf$/, ""))?.trim();
    if (!name) return;
    docRef.current?.save(name.toLowerCase().endsWith(".pdf") ? name : `${name}.pdf`);
  }

  async function send() {
    const doc = docRef.current;
    if (!doc) return;
    const file = new File([doc.output("blob")], fileName, { type: "application/pdf" });
    // Telefonis jagamismenüü (Gmail/Mail koos manusega); arvutis mailto + PDF allalaadimine
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: email.subject, text: email.body });
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }
    download();
    const q = new URLSearchParams({ subject: email.subject, body: email.body }).toString().replace(/\+/g, "%20");
    window.location.href = `mailto:${encodeURIComponent(email.to)}?${q}`;
  }

  const totalHa = rows.reduce((a, r) => a + num(r.pindala), 0);
  const totalTm = rows.reduce((a, r) => a + num(r.maht), 0);
  const missingVol = rows.filter((r) => !r.maht).length;
  const tplField = (k: keyof Template) => ({
    value: tpl[k],
    onChange: (e: { target: { value: string } }) => setTpl((t) => ({ ...t, [k]: e.target.value })),
  });

  return (
    <div className="adm">
      <header className="adm-head">
        <img src="/images/logo3.png" alt="Fellin Forest" />
        <h1>Pakkumise generaator</h1>
        <span className="adm-hint">{ACCOUNTS[user].kontakt.split(",")[0]}</span>
        <button className="adm-link" onClick={onLogout}>Logi välja</button>
      </header>

      <div className="adm-types" role="radiogroup" aria-label="Pakkumise tüüp">
        {(Object.keys(TYPE_TEXT) as OfferType[]).map((t) => (
          <button key={t} role="radio" aria-checked={tyyp === t} className={tyyp === t ? "on" : ""} onClick={() => changeType(t)}>
            {TYPE_TEXT[t].label}
          </button>
        ))}
      </div>

      <form className="adm-search" onSubmit={search}>
        <label htmlFor="q">Katastritunnus(ed) või kinnistu number</label>
        <div className="adm-row">
          <input
            id="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="nt 75903:001:0050 või 31701:003:0123, 2854337"
          />
          <button className="btn btn-solid" disabled={loading}>{loading ? "Laen…" : "Too andmed"}</button>
        </div>
        {error && errorAt === "search" && <p className="adm-error" role="alert">{error}</p>}
      </form>

      {parcels.length > 0 && (
        <div className="adm-grid">
          <div className="adm-edit">
            <section>
              <h2>Kinnistud</h2>
              <div className="adm-maps">
                {parcels.map((p) => (
                  <figure key={p.tunnus}>
                    {maps[p.tunnus] ? <img src={maps[p.tunnus]} alt={`Kaart ${p.tunnus}`} /> : <div className="adm-nomap">Kaart puudub</div>}
                    <figcaption>
                      <b>{p.tunnus}</b> {p.l_aadress} · {p.ov_nimi} · mets {((p.mets ?? 0) / 10000).toFixed(2)} ha
                      {parcels.length > 1 && (
                        <button className="adm-link adm-remove" onClick={() => removeParcel(p.tunnus)}>
                          Eemalda pakkumisest
                        </button>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <form className="adm-search" onSubmit={addParcels}>
                <label htmlFor="add-q">Lisa pakkumisse veel kinnistuid (pakett)</label>
                <div className="adm-row">
                  <input
                    id="add-q"
                    value={addQuery}
                    onChange={(e) => setAddQuery(e.target.value)}
                    placeholder="katastritunnus(ed) või kinnistu nr"
                  />
                  <button className="btn btn-ghost" disabled={loading}>{loading ? "Laen…" : "+ Lisa kinnistu"}</button>
                </div>
                {error && errorAt === "add" && <p className="adm-error" role="alert">{error}</p>}
              </form>
            </section>

            <section>
              <h2>{tyyp === "raie" ? "Raie" : "Hind"}</h2>
              {tyyp === "raie" && (
              <>
              <p className="adm-hint">
                Read tulevad kehtivatest metsateatistest, nende puudumisel kõikidest eraldistest. Mahud sisesta käsitsi
                (nt metsaregistrist või metsamajanduskavast).
              </p>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Katastritunnus</th>
                      <th>Eraldis</th>
                      <th>Raieliik</th>
                      <th>Pindala (ha)</th>
                      <th>Maht (tm)</th>
                      <th title="Peapuuliik, vanus, kõrgus – ainult sulle, PDF-i ei lähe">Info</th>
                      <th aria-label="Kustuta" />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <input aria-label="Katastritunnus" value={r.tunnus} onChange={(e) => setRow(r.id, { tunnus: e.target.value })} />
                        </td>
                        <td>
                          <input aria-label="Eraldis" className="sm" value={r.eraldis} onChange={(e) => setRow(r.id, { eraldis: e.target.value })} />
                        </td>
                        <td>
                          <input aria-label="Raieliik" className="sm" value={r.raieliik} onChange={(e) => setRow(r.id, { raieliik: e.target.value })} />
                        </td>
                        <td>
                          <input aria-label="Pindala" className="sm" inputMode="decimal" value={r.pindala} onChange={(e) => setRow(r.id, { pindala: e.target.value })} />
                        </td>
                        <td>
                          <input aria-label="Maht" className="sm" inputMode="decimal" value={r.maht} onChange={(e) => setRow(r.id, { maht: e.target.value })} />
                        </td>
                        <td className="adm-info">{r.info}</td>
                        <td>
                          <button className="adm-x" aria-label={`Kustuta eraldis ${r.eraldis}`} onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}>
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3}>
                        <b>Kokku</b>
                      </td>
                      <td>
                        <b>{totalHa.toFixed(2)}</b>
                      </td>
                      <td>
                        <b>{Math.round(totalTm)}</b>
                      </td>
                      <td colSpan={2} />
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="adm-row">
                <button
                  className="adm-link"
                  onClick={() =>
                    setRows((rs) => [
                      ...rs,
                      { id: Date.now(), tunnus: parcels[0].tunnus, eraldis: "", raieliik: "LR", pindala: "", maht: "", info: "" },
                    ])
                  }
                >
                  + Lisa rida
                </button>
                {missingVol > 0 && <span className="adm-fill">{missingVol} rida ilma mahuta</span>}
              </div>
              </>
              )}
              {tyyp === "raie" ? (
                <label>
                  Hind kokku (EUR)
                  <input inputMode="decimal" value={hind} onChange={(e) => setHind(e.target.value)} placeholder="nt 8500" />
                </label>
              ) : (
                <>
                  {parcels.map((p) => (
                    <label key={p.tunnus}>
                      {p.tunnus} {p.l_aadress} – pakutav hind (EUR)
                      <input
                        inputMode="decimal"
                        value={hinnad[p.tunnus] ?? ""}
                        onChange={(e) => setHinnad((h) => ({ ...h, [p.tunnus]: e.target.value }))}
                        placeholder="nt 45000"
                      />
                    </label>
                  ))}
                  {parcels.length > 1 && (
                    <>
                      <label>
                        Paketi hind kokku (EUR) – üks hind kõigile kinnistutele
                        <input
                          inputMode="decimal"
                          value={paketihind}
                          onChange={(e) => setPaketihind(e.target.value)}
                          placeholder="nt 95000"
                        />
                      </label>
                      <p className="adm-hint">
                        Kui paketi hind on täidetud, läheb PDF-i ainult see ja kinnistu kaupa hindu ei näidata. Jäta tühjaks,
                        et näidata hinda iga kinnistu juures ja nende summat.
                      </p>
                      <p>
                        <b>
                          Kokku: {eur(num(paketihind) || parcels.reduce((a, p) => a + num(hinnad[p.tunnus] ?? ""), 0))}
                        </b>
                      </p>
                    </>
                  )}
                </>
              )}
            </section>

            <section>
              <h2>Tekstid</h2>
              <div className="adm-2col">
                <label>
                  Pakkumise nr
                  <input value={nr} onChange={(e) => setNr(e.target.value)} />
                </label>
                <label>
                  Pealkiri
                  <input {...tplField("pealkiri")} />
                </label>
              </div>
              <div className="adm-2col">
                <label>
                  Saaja (nimi, aadress)
                  <textarea rows={3} value={saaja} onChange={(e) => setSaaja(e.target.value)} />
                </label>
                <label>
                  Pakkuja
                  <textarea rows={3} {...tplField("pakkuja")} />
                </label>
              </div>
              <label>
                Kontakt
                <textarea rows={2} {...tplField("kontakt")} />
              </label>
              <label>
                Sissejuhatus
                <textarea rows={3} {...tplField("sissejuhatus")} />
              </label>
              <label>
                Tingimused / lisainfo
                <textarea rows={8} {...tplField("tingimused")} />
              </label>
              <label>
                Jalus (eralda | märgiga)
                <input {...tplField("jalus")} />
              </label>
              <p className="adm-hint">
                Pakkuja, kontakt, tekstid ja jalus jäävad selles brauseris meelde. Mitme kinnistu puhul pannakse
                „kinnistu” PDF-is ise mitmusesse (kinnistute).{" "}
                <button className="adm-link" onClick={() => setTpl(templateFor(user, tyyp))}>Taasta vaikimisi tekstid</button>
              </p>
            </section>

            <section>
              <h2>Saada kliendile</h2>
              <label>
                Kliendi e-post
                <input type="email" value={email.to} onChange={(e) => setEmail({ ...email, to: e.target.value })} />
              </label>
              <label>
                Teema
                <input value={email.subject} onChange={(e) => setEmail({ ...email, subject: e.target.value })} />
              </label>
              <label>
                Sõnum
                <textarea rows={7} value={email.body} onChange={(e) => setEmail({ ...email, body: e.target.value })} />
              </label>
              <div className="adm-row">
                <button className="btn btn-solid" onClick={send} disabled={!pdfUrl}>Saada e-postiga</button>
                <button className="btn btn-ghost" onClick={saveAs} disabled={!pdfUrl}>Laadi PDF alla</button>
              </div>
              <p className="adm-hint">
                Telefonis avaneb jagamismenüü ja PDF on manuses. Arvutis laaditakse PDF alla ja avaneb meiliprogramm, kus
                saad faili kirjale lohistada.
              </p>
            </section>
          </div>

          <div className="adm-preview">{pdfUrl ? <iframe title="PDF eelvaade" src={pdfUrl} /> : <p>Koostan PDF-i…</p>}</div>
        </div>
      )}
    </div>
  );
}
