import PageHero from "../components/PageHero";
import RelatedLinks from "../components/RelatedLinks";

export default function NotFound() {
  return (
    <>
      <PageHero
        crumb="Lehte ei leitud"
        eyebrow="404"
        title="Sellist lehte ei ole"
        lead="Link võis olla vana või sisaldada kirjaviga. Alt leiad kõige olulisemad lehed – või helista ja küsi otse."
      />
      <RelatedLinks
        title="Mine edasi siit"
        links={[
          {
            to: "/metsakinnistute-ost/",
            title: "Metsakinnistute ost",
            desc: "Ostame metsakinnistuid igas seisukorras üle Eesti.",
          },
          {
            to: "/raieoiguse-ost/",
            title: "Raieõiguse ost",
            desc: "Müü raieõigus ja jää maaomanikuks.",
          },
          {
            to: "/kontakt/",
            title: "Kontakt",
            desc: "Helista või saada hinnapäring – vastame 24 tunni jooksul.",
          },
        ]}
      />
    </>
  );
}
