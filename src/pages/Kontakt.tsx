import PageHero from "../components/PageHero";
import TextSection from "../components/TextSection";
import InquiryForm from "../components/sections/InquiryForm";
import Faq from "../components/sections/Faq";
import RelatedLinks from "../components/RelatedLinks";
import PhoneIcon from "../components/icons/PhoneIcon";
import { FAQ_KONTAKT } from "../content/faq";
import { BUSINESS, mapUrl } from "../content/business";

export default function Kontakt() {
  return (
    <>
      <PageHero
        crumb="Kontakt"
        eyebrow="Kontakt"
        title="Võta ühendust"
        lead="Helista, kirjuta või saada hinnapäring – vastame igale päringule 24 tunni jooksul. Konsultatsioon on tasuta ega kohusta sind millekski."
      />

      <TextSection eyebrow="Kontaktandmed" title="Fellin Forest OÜ">
        <div className="contact-cards">
          <div className="contact-card">
            <h3>Telefon</h3>
            <a href={`tel:${BUSINESS.phone}`} className="contact-big">
              <PhoneIcon />
              {BUSINESS.phoneDisplay}
            </a>
            <p>
              {BUSINESS.contactPerson} – {BUSINESS.contactRole}
            </p>
            <p className="contact-hours">E–R 9:00–18:00</p>
          </div>

          <div className="contact-card">
            <h3>E-post</h3>
            <a href={`mailto:${BUSINESS.email}`} className="contact-big">
              {BUSINESS.email}
            </a>
            <p>Saada katastritunnus ja kirjuta, mida kaalud – vastame tavaliselt sama päeva jooksul.</p>
          </div>

          <div className="contact-card">
            <h3>Kontor</h3>
            <address className="contact-address">
              {BUSINESS.legalName}
              <br />
              {BUSINESS.street}
              <br />
              {BUSINESS.postalCode} {BUSINESS.city}
              <br />
              {BUSINESS.region}
            </address>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="card-link">
              Vaata kaardil →
            </a>
            <p className="contact-hours">Palume enne tulekut aeg kokku leppida.</p>
          </div>

          <div className="contact-card">
            <h3>Ettevõte</h3>
            <p>
              {BUSINESS.legalName}
              <br />
              Registrikood {BUSINESS.regCode}
            </p>
            <p>
              Ostame metsakinnistuid, raieõigust ja põllumaad kõigis Eesti maakondades.
            </p>
          </div>
        </div>
      </TextSection>

      <InquiryForm />

      <Faq items={FAQ_KONTAKT} eyebrow="Kontakt" title="Korduma kippuvad küsimused" />

      <RelatedLinks
        links={[
          {
            to: "/hinnakujundus/",
            title: "Hinnakujundus ja protsess",
            desc: "Mis juhtub pärast seda, kui oled päringu saatnud.",
          },
          {
            to: "/metsakinnistute-ost/",
            title: "Metsakinnistute ost",
            desc: "Mida me ostame ja mis seisus kinnistud sobivad.",
          },
          {
            to: "/viljandimaa/",
            title: "Viljandimaa ja teised maakonnad",
            desc: "Kus me ostame ja kui kiiresti kohale jõuame.",
          },
        ]}
      />
    </>
  );
}
