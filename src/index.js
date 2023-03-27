import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ErrorBoundary fallback={<p>An error has occurred</p>}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
