import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

interface RouterValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterValue>({ path: "/", navigate: () => {} });

/** Kõik teed hoiame kujul "/" või "/tee/" – nii langevad nad kokku failistruktuuriga. */
export function normalizePath(input: string): string {
  const bare = input.split("?")[0].split("#")[0];
  if (!bare || bare === "/") return "/";
  const withLeading = bare.startsWith("/") ? bare : `/${bare}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

function splitHash(to: string): { path: string; hash: string } {
  const index = to.indexOf("#");
  if (index === -1) return { path: to, hash: "" };
  return { path: to.slice(0, index), hash: to.slice(index + 1) };
}

function scrollToTarget(hash: string) {
  if (!hash) {
    window.scrollTo({ top: 0, left: 0 });
    return;
  }
  const target = document.getElementById(hash);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.scrollTo({ top: 0, left: 0 });
}

export function Router({ url, children }: { url?: string; children: ReactNode }) {
  const [path, setPath] = useState(() =>
    normalizePath(url ?? (typeof window === "undefined" ? "/" : window.location.pathname)),
  );

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const { path: rawPath, hash } = splitHash(to);
    const nextPath = rawPath ? normalizePath(rawPath) : normalizePath(window.location.pathname);
    const href = hash ? `${nextPath}#${hash}` : nextPath;

    if (nextPath === normalizePath(window.location.pathname)) {
      window.history.replaceState(null, "", href);
      scrollToTarget(hash);
      return;
    }

    window.history.pushState(null, "", href);
    setPath(nextPath);
    // Uus leht renderdatakse alles järgmises kaadris – alles siis saab sihtmärgini kerida.
    requestAnimationFrame(() => scrollToTarget(hash));
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterValue {
  return useContext(RouterContext);
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  children: ReactNode;
}

function isExternal(to: string) {
  return /^(https?:|mailto:|tel:)/.test(to);
}

/**
 * Sisemine link, mis renderdub päris <a href> märgendina (roomajate jaoks oluline),
 * kuid navigeerib kliendipoolselt ilma lehte uuesti laadimata.
 */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter();

  if (isExternal(to)) {
    return (
      <a href={to} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  const { path: rawPath, hash } = splitHash(to);
  const href = rawPath ? (hash ? `${normalizePath(rawPath)}#${hash}` : normalizePath(rawPath)) : to;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
