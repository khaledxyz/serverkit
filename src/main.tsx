import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: <not needed>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>App</h1>
  </StrictMode>
);
