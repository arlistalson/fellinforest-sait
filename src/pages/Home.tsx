import Hero from "../components/sections/Hero";
import StatsBand from "../components/sections/StatsBand";
import Services from "../components/sections/Services";
import RaieoigusSplit from "../components/sections/RaieoigusSplit";
import Protsess from "../components/sections/Protsess";
import WhyUs from "../components/sections/WhyUs";
import RegionsTeaser from "../components/sections/RegionsTeaser";
import Faq from "../components/sections/Faq";
import InquiryForm from "../components/sections/InquiryForm";
import { FAQ_GENERAL } from "../content/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Services />
      <RaieoigusSplit />
      <Protsess />
      <WhyUs />
      <RegionsTeaser />
      <Faq items={FAQ_GENERAL} />
      <InquiryForm />
    </>
  );
}
