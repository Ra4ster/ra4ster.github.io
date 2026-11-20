import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Who from "./pages/Who.tsx";
import What from "./pages/What.tsx";
import When from "./pages/When.tsx";
import Where from "./pages/Where.tsx";
import Why from "./pages/Why.tsx";
import How from "./pages/How.tsx";

const root = document.getElementById("root");
if (root == null) throw new DOMException("Root not found.");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="who" element={<Who />} />
          <Route path="what" element={<What />} />
          <Route path="when" element={<When />} />
          <Route path="where" element={<Where />} />
          <Route path="why" element={<Why />} />
          <Route path="how" element={<How />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
