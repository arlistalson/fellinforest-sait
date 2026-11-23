import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import AnimatedSection from "../components/AnimatedSection";
import CtaBand from "../components/CtaBand";
import { useReveal } from "../motion/reveal";
import { cardPop, fadeUp, staggerContainer, staggerItem } from "../motion/variants";
import { ARTICLES, formatDate } from "../content/articles";
import { Link } from "../router";

interface ListItem {
  to: string;
  title: string;
  excerpt: string;
  label: string;
}

/** Artiklid kuupäevaga; püsivad juhendid lõpus ilma kuupäevata. */
const ITEMS: ListItem[] = [
  ...ARTICLES.map((article) => ({
    to: article.path,
    title: article.headline,
    excerpt: article.excerpt,
    label: formatDate(article.published),
  })),
  {
    to: "/metsa-muuk/",
    title: "Metsa müük: juhend metsaomanikule",
    excerpt:
      "Kas müüa kinnistu või raieõigus, millest sõltub metsa hind ja kuidas ostjate pakkumisi võrrelda.",
    label: "Juhend",
  },
];

export default function Artiklid() {
  const gridReveal = useReveal<HTMLDivElement>(0.1);

  return (
    <>
      <PageHero
        crumb="Artiklid"
        eyebrow="Artiklid"
        title="Artiklid ja juhendid metsaomanikule"
        lead="Selgitame lihtsas keeles, mida metsa müük, raieõigus ja uued nõuded metsaomaniku jaoks tähendavad. Iga artikli juures on kirjas, millal see avaldati ja millistele allikatele see tugineb."
      />

      <AnimatedSection className="section" variant={fadeUp}>
        <div className="container">
          <h2 className="sr-only">Kõik artiklid</h2>
          <motion.div className="related-grid article-grid" {...gridReveal} variants={staggerContainer}>
            {ITEMS.map((item) => (
              <motion.div key={item.to} variants={staggerItem} {...cardPop}>
                <Link to={item.to} className="related-card">
                  <span className="article-card-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <span className="card-link">Loe edasi →</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      <CtaBand />
    </>
  );
}
