import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { scaleIn } from "../../motion/variants";

type Status = "idle" | "sending" | "sent" | "error";

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
    } catch {
      setStatus("error");
      alert("Saatmine ebaõnnestus. Palun proovi uuesti või kirjuta otse: enrico@fellinforest.ee");
    }
  }

  return (
    <AnimatedSection id="hinnaparing" className="section section-tint" variant={scaleIn}>
      <div className="container">
        <p className="eyebrow center">Hinnapäring</p>
        <h2>Küsi tasuta hinnapakkumist</h2>
        {status !== "sent" && (
          <form
            className="inquiry-form"
            action="https://formspree.io/f/mgogvebk"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_subject" value="Uus hinnapäring – fellinforest.ee" />
            <input
              type="text"
              name="_gotcha"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="name">Nimi *</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-row">
                <label htmlFor="phone">Telefon *</label>
                <input type="tel" id="phone" name="phone" required />
              </div>
              <div className="form-row">
                <label htmlFor="email">E-post</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-row">
                <label htmlFor="katastritunnus">Katastritunnus</label>
                <input type="text" id="katastritunnus" name="katastritunnus" placeholder="nt 12345:001:0001" />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="interest">Mis sind huvitab?</label>
              <select id="interest" name="huvi">
                <option>Metsakinnistu müük</option>
                <option>Raieõiguse müük</option>
                <option>Põllumaa müük</option>
                <option>Metsamajandamine</option>
                <option>Muu / ei tea veel</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="message">Lisainfo</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Kirjelda oma metsa või küsi, mida soovid teada"
              />
            </div>
            <motion.button
              type="submit"
              className="btn btn-solid btn-wide"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {status === "sending" ? "Saadan…" : "Saada päring"}
            </motion.button>
            <p className="form-note">Päring on tasuta ega kohusta sind millekski.</p>
          </form>
        )}
        {status === "sent" && (
          <motion.div
            className="form-success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="form-success-icon">✓</div>
            <h3>Päring saadetud!</h3>
            <p>Aitäh! Võtame sinuga ühendust 24 tunni jooksul.</p>
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}
