import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAnimationControls, useInView, useReducedMotion } from "framer-motion";

/**
 * Sisse-ilmumise animatsioon, mis ei peida eelrenderdatud HTML-i teksti.
 *
 * Varem oli igal sektsioonil `initial="hidden"`, mistõttu staatilises HTML-is
 * oli ~40 plokki `style="opacity:0"` – otsingumootor ja ilma JS-ita lugeja
 * nägid sisu peidetuna. Nüüd renderdame alati nähtava oleku (`initial={false}`)
 * ja alles brauseris, enne esimest joonistamist, peidame need plokid, mis on
 * ekraanist väljas. Need ilmuvad kerimisel nagu enne. Laadimisel juba nähtav
 * sisu jääb paigale (ei vilgu ega hüppa).
 *
 * Kliendipoolsel navigeerimisel (pärast hüdreerimist) animeeritakse ka ekraanil
 * olev sisu, sest siis pole serveri HTML-i, mida vilkuma ajada.
 */

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

let appHydrated = false;

/** Kutsu üks kord pärast esimest (hüdreerimise) renderdust. */
export function markAppHydrated() {
  appHydrated = true;
}

function isOnScreen(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

export function useReveal<T extends Element = HTMLDivElement>(amount = 0.2) {
  const ref = useRef<T>(null);
  const controls = useAnimationControls();
  const inView = useInView(ref, { once: true, amount });
  const prefersReducedMotion = useReducedMotion();
  // Loetakse ainult esimesel renderdusel: kas see plokk tuli serveri HTML-ist?
  const [mountedAfterHydration] = useState(() => appHydrated);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;
    if (!mountedAfterHydration && isOnScreen(element)) return;
    controls.set("hidden");
    // Ainult esimesel mount'il – hilisem peitmine tooks nähtava sisu ära.
  }, []);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return { ref, initial: false as const, animate: controls };
}
