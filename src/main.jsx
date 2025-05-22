import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { BuscaProvider } from "./hooks/BuscaContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <BuscaProvider>
      <App />
    </BuscaProvider>
    </BrowserRouter>
  </StrictMode>
);
