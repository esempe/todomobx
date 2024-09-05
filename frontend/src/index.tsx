import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
const root = createRoot(document.getElementById("root"));

root.render(<App />);
