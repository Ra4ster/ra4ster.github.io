import "./App.css";
import { Link, useLocation, useNavigate, useOutlet } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import ChoiceSelector from "./components/ChoiceSelector";
import { useEffect, useState } from "react";
import Socials from "./components/Socials";

const choices = [
  { label: "Who", path: "/who" },
  { label: "What", path: "/what" },
  { label: "When", path: "/when" },
  { label: "Where", path: "/where" },
  { label: "Why", path: "/why" },
  { label: "How", path: "/how" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

export default function App() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const navigate = useNavigate();
  const path = pathname.replace(/\/+$/, "").toLowerCase();
  const isHome = path === "" || path === "/";
  const selected = choices.findIndex((choice) => path === choice.path);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 sm:h-20 z-30 pointer-events-none bg-gradient-to-b from-white via-white/80 to-transparent" />
      <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 z-30 pointer-events-none bg-gradient-to-t from-white via-white/80 to-transparent" />

      <header className="fixed top-0 left-0 right-0 z-40 h-11 sm:h-12 flex items-center justify-between px-3 sm:px-4 pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto uppercase text-sm sm:text-lg alliance2 text-gray-400 hover:text-black transition-colors"
        >
          Jack Rose / Portfolio
        </Link>

        <p className="pointer-events-auto uppercase alliance2 text-xs sm:text-base text-gray-400 tabular-nums">
          {selected >= 0
            ? `${String(selected + 1).padStart(2, "0")} / ${String(choices.length).padStart(2, "0")}`
            : `00 / ${String(choices.length).padStart(2, "0")}`}
        </p>
      </header>

      <footer className="fixed bottom-0 left-0 right-0 z-40 h-11 sm:h-12 flex items-center justify-between px-3 sm:px-4 pointer-events-none">
        <div className="w-10" />
        <p className="pointer-events-auto uppercase alliance2 text-xs sm:text-base text-gray-400">
          @ 2026
        </p>
      </footer>

      <motion.div
        className="fixed bottom-1 left-2 sm:bottom-1 sm:left-3 z-50 pointer-events-auto"
        animate={{
          x:
            path === "/where"
              ? isMobile
                ? "calc(50vw - 48px)"
                : "calc(50vw - 29px)"
              : 0,
          y:
            path === "/where"
              ? isMobile
                ? "calc(29px - 52vh)"
                : "calc(29px - 60vh)"
              : 0,
          scale: path === "/where" ? (isMobile ? 1.6 : 2.5) : 1,
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
            className="flex w-fit max-w-full items-center justify-center items-baseline text-black text-3xl sm:text-4xl md:text-5xl p-2"
          >
            <ChoiceSelector
              choices={choices}
              selected={selected}
              onSelect={(index) => navigate(choices[index].path)}
            />
            <h1 className="whitespace-nowrap">is Jack Rose?</h1>
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
