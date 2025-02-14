import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// -----------------------------------------------------------
// import { App } from "./0_setup/App"; // with Stage, no light, no shadows enabled
// import { App } from "./1_setup/App"; // with lights without Stage
// import { App } from "./3_setup/App";
// -----------------------------------------------------------
// import { App } from "./4_setup/App"; // floor is a box, not a plane
// import { App } from "./5_setup/App"; // lights are in separate component
// -----------------------------------------------------------

// import { App } from "./6_part_one/App";
// import { App } from "./7_part_two/App";
import { App } from "./8_part_three/App";

// -----------------------------------------------------------

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
