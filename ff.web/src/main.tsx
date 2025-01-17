import React from "react";
import ReactDOM from "react-dom/client";

import App from "@vuo/App.tsx";
import { initSentry } from "./sentry";

initSentry();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
