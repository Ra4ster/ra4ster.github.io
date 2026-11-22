import "./App.css";
import { Link, useLocation, useNavigate, useOutlet } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import ChoiceSelector from "./components/ChoiceSelector";
import { useEffect } from "react";
import Socials from "./components/Socials";

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
  const outlet = useOutlet();
  const navigate = useNavigate();
  const path = pathname.replace(/\/+$/, "").toLowerCase();
  const isHome = path === "" || path === "/";
  const selected = choices.findIndex((choice) => path === choice.path);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <Link
        to="/"
        className="fixed top-2 left-2 z-30 uppercase text-lg alliance2 text-gray-400"
      >
        Jack Rose / Portfolio
      </Link>

      <p className="fixed top-2 right-2 z-30 uppercase alliance2 text-gray-400 tabular-nums">
        {selected >= 0
          ? `${String(selected + 1).padStart(2, "0")} / ${String(choices.length).padStart(2, "0")}`
          : `00 / ${String(choices.length).padStart(2, "0")}`}
      </p>

      <p className="fixed bottom-2 right-2 z-30 uppercase alliance2 text-gray-400">
        @ 2026
      </p>

      <motion.div
        className="fixed bottom-2 left-2 z-50"
        animate={{
          x: path === "/where" ? "calc(50vw - 29px)" : 0,
          y: path === "/where" ? "calc(29px - 60vh)" : 0,
          scale: path === "/where" ? 2.5 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        <Socials className="relative" />
      </motion.div>
      <main
        className={`page-layout ${isHome ? "page-layout--home" : ""} ${path === "/what" ? "page-layout--top" : ""} ${path === "/where" ? "page-layout--where" : ""} ${path === "/why" ? "page-layout--why" : ""} ${path === "/how" ? "page-layout--how" : ""}`}
      >
        <div className="page-layout__main">
          <motion.div
            layout
            id="centergrid"
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 28,
            }}
            className="flex w-fit max-w-full items-center justify-center items-baseline text-black text-5xl p-2"
          >
            <ChoiceSelector
              choices={choices}
              selected={selected}
              onSelect={(index) => navigate(choices[index].path)}
            />
            <h1>is Jack Rose?</h1>
          </motion.div>
          <div className="page-layout__side">
            <AnimatePresence mode="popLayout">
              {path !== "/what" && (
                <motion.div
                  key={pathname}
                  className="h-full w-full flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {outlet}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {path === "/what" && (
            <motion.div
              key="what-projects"
              className="page-layout__projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15 },
              }}
              style={{
                position: path !== "/what" ? "absolute" : "relative",
                top: path !== "/what" ? "8rem" : undefined,
                left: path !== "/what" ? "1rem" : undefined,
                right: path !== "/what" ? "1rem" : undefined,
                pointerEvents: path === "/what" ? "auto" : "none",
              }}
            >
              {outlet}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
