import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider forceColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>
);
