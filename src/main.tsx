import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, no-type-assertion/no-type-assertion -- Ok
const root = document.querySelector("#root")!;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
