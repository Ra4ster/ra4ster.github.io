import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router";
import ChoiceSelector from "./components/ChoiceSelector";

const choices = [
  { label: "Who", path: "/who" },
  { label: "What", path: "/what" },
  { label: "When", path: "/when" },
  { label: "Where", path: "/where" },
  { label: "Why", path: "/why" },
  { label: "How", path: "/how" },
];

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const path = pathname.replace(/\/+$/, "").toLowerCase();
  const selected = Math.max(
    0,
    choices.findIndex((choice) => path === choice.path),
  );

  return (
    <>
      <p className="absolute top-2 left-2 uppercase text-lg alliance2 text-gray-400">
        Jack Rose / Portfolio
      </p>

      <p className="absolute top-2 right-2 uppercase alliance2 text-gray-400 tabular-nums">
        {String(selected + 1).padStart(2, "0")} /{" "}
        {String(choices.length).padStart(2, "0")}
      </p>

      <p className="absolute bottom-2 right-2 uppercase alliance2 text-gray-400">
        @ 2026
      </p>

      <main
        className={`page-layout ${path === "/what" ? "page-layout--top" : ""}`}
      >
        <div className="page-layout__main">
          <div
            id="centergrid"
            className="flex w-fit max-w-full max-h-screen items-center justify-center items-baseline text-black text-5xl p-2"
          >
            <ChoiceSelector
              choices={choices}
              selected={selected}
              onSelect={(index) => navigate(choices[index].path)}
            />
            <h1>is Jack Rose?</h1>
          </div>

          <div className="page-layout__side">
            {path !== "/what" && <Outlet />}
          </div>
        </div>

        {path === "/what" && (
          <div className="page-layout__projects">
            <Outlet />
          </div>
        )}
      </main>
    </>
  );
}
