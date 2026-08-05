import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./style.css";

const container = document.getElementById("root")!;

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Eelrenderdatud lehel hüdreerime olemasoleva märgendi, arenduses aga
// renderdame nullist (siis on #root tühi).
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
