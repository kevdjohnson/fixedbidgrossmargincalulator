import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GrossMarginCalculator from "./GrossMarginCalculator.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GrossMarginCalculator />
  </StrictMode>
);
