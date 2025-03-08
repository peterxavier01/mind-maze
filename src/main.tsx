import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import { ThemeProvider } from "./providers/theme-provider.tsx";
import ModalProvider from "./providers/modal-provider.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModalProvider />
      <App />
    </ThemeProvider>
  </StrictMode>
);
