import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress third-party warnings that cannot be fixed internally (e.g. THREE.Clock deprecation, Framer Motion viewport container warning)
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] &&
    typeof args[0] === "string" &&
    (args[0].includes("THREE.Clock") ||
      args[0].includes("non-static position"))
  ) {
    return;
  }
  originalWarn(...args);
};

createRoot(document.getElementById("root")!).render(<App />);

