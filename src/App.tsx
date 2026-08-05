import { useEffect } from "react";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import { Router, useRouter } from "./router";
import { matchRoute } from "./routes";
import { absUrl } from "./seo";

function setMeta(selector: string, attr: string, name: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function Page() {
  const { path } = useRouter();
  const route = matchRoute(path);
  const Component = route.component;

  // Eelrenderdatud HTML-is on <head> juba õige; siin hoiame selle
  // kliendipoolsel navigeerimisel sünkroonis.
  useEffect(() => {
    document.title = route.title;
    setMeta('meta[name="description"]', "name", "description", route.description);
    setMeta('meta[property="og:title"]', "property", "og:title", route.title);
    setMeta('meta[property="og:description"]', "property", "og:description", route.description);
    setMeta('meta[property="og:url"]', "property", "og:url", absUrl(route.path));

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = absUrl(route.path);
  }, [route]);

  return (
    <>
      <a className="skip-link" href="#main">
        Liigu sisu juurde
      </a>
      <Header />
      <main id="main">
        <Component />
      </main>
      <Footer />
    </>
  );
}

export default function App({ url }: { url?: string }) {
  return (
    <Router url={url}>
      <Page />
    </Router>
  );
}
