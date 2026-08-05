import { renderToString } from "react-dom/server";
import App from "./App";
import { NOT_FOUND, ROUTES, matchRoute } from "./routes";
import { buildHead } from "./seo";

export interface RenderResult {
  html: string;
  head: string;
}

export function render(url: string): RenderResult {
  const route = matchRoute(url);
  return {
    html: renderToString(<App url={route.path} />),
    head: buildHead(route),
  };
}

export function renderNotFound(): RenderResult {
  return {
    html: renderToString(<App url={NOT_FOUND.path} />),
    head: buildHead(NOT_FOUND),
  };
}

/** Prerender-skript kasutab seda nii failide kui sitemap'i genereerimiseks. */
export const pages = ROUTES.map((route) => ({
  path: route.path,
  title: route.title,
  description: route.description,
  priority: route.priority ?? "0.7",
  changefreq: route.changefreq ?? "monthly",
  noindex: route.noindex ?? false,
}));
