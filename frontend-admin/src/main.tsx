import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./common/router/render.route.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./common/config/query-client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
