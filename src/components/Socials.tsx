import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

export default function Socials({ className }: { className: string }) {
  const [dispersed, setDispersed] = useState(false);
  const [hoveredCircle, setHoveredCircle] = useState<number | null>(null);
  const [readyToHover, setReadyToHover] = useState(false);
  const [hoveringShare, setHoveringShare] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dispersed) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDispersed(false);
        setReadyToHover(false);
        setHoveredCircle(null);
        setHoveringShare(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("touchstart", handleClickOutside);
    };
  }, [dispersed]);

  const circles = [
    {
      cx: 14,
      cy: 6,
      x: 35,
      y: 0,
      color: "#8B5CF6",
      viewBox: "0 0 496 512",
      path: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
      href: "https://github.com/Ra4ster",
    },
    {
      cx: 8,
      cy: 12,
      x: 35,
      y: -35,
      color: "#0A66C2",
      viewBox: "0 0 448 512",
      path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z",
      href: "https://linkedin.com/in/jack-c-rose",
    },
    {
      cx: 14,
      cy: 18,
      x: 0,
      y: -35,
      color: "#EA4335",
      viewBox: "0 0 24 24",
      path: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0-8 4.99L4 6zm0 12H4V8l8 5 8-5z",
      href: "mailto:jackrose2335@gmail.com",
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`${className} relative w-[42px] h-[42px]`}
    >
      <div
        className={`absolute transition-all duration-200 ${
          dispersed
            ? "-top-[74px] -right-[60px] sm:-right-[80px] bottom-0 left-0 pointer-events-auto"
            : "inset-0 pointer-events-none"
        }`}
        onMouseLeave={() => {
          if (
            typeof window !== "undefined" &&
            window.matchMedia("(hover: hover)").matches
          ) {
            setDispersed(false);
            setReadyToHover(false);
            setHoveredCircle(null);
            setHoveringShare(false);
          }
        }}
      >
        <motion.svg
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          className={`absolute bottom-0 left-0 pointer-events-auto cursor-pointer transition-colors duration-200 ${
            dispersed ? "text-black" : "text-gray-400 hover:text-black"
          }`}
          style={{ overflow: "visible" }}
          onMouseEnter={() => setHoveringShare(true)}
          onMouseLeave={() => setHoveringShare(false)}
          onClick={(e) => {
            e.stopPropagation();
            if (dispersed) {
              setDispersed(false);
              setReadyToHover(false);
              setHoveredCircle(null);
              setHoveringShare(false);
            } else {
              setReadyToHover(false);
              setHoveredCircle(null);
              setDispersed(true);
            }
          }}
        >
          <rect width="24" height="24" fill="transparent" pointerEvents="all" />
          <motion.path
            d="M8 12L14 6M8 12L14 18"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            animate={{ opacity: dispersed ? 0 : 1 }}
            transition={{
              duration: 0.2,
              delay: dispersed ? 0 : 0.6,
            }}
          />

          {circles.map(({ cx, cy, x, y, color, viewBox, path, href }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                cursor: dispersed ? "pointer" : "default",
                pointerEvents: dispersed ? "auto" : "none",
              }}
              onMouseEnter={() => {
                if (readyToHover) setHoveredCircle(i);
              }}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <motion.g
                animate={{
                  x: dispersed ? x : 0,
                  y: dispersed ? y : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: i * 0.07,
                }}
              >
                <motion.circle
                  cx={cx}
                  cy={cy}
                  fill="white"
                  stroke={
                    dispersed && readyToHover && hoveredCircle === i
                      ? color
                      : dispersed || hoveringShare
                        ? "#000000"
                        : "#9ca3af"
                  }
                  animate={{
                    r: dispersed ? 12.5 : 2.5,
                    strokeWidth: dispersed ? 1.2 : 2,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: i * 0.07,
                    stroke: { duration: 0.2 },
                  }}
                  style={{
                    transition: "stroke 0.2s ease",
                  }}
                  onAnimationComplete={() => {
                    if (dispersed && i === 2) {
                      setReadyToHover(true);
                    }
                  }}
                />

                <motion.svg
                  x={cx - 6}
                  y={cy - 6}
                  width="12"
                  height="12"
                  viewBox={viewBox}
                  className="pointer-events-none"
                  style={{
                    overflow: "visible",
                    color:
                      dispersed && readyToHover && hoveredCircle === i
                        ? color
                        : "#000000",
                    transition: "color 0.2s ease",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: dispersed ? 1 : 0,
                    scale: dispersed ? 1 : 0.2,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: dispersed ? 0.25 + i * 0.07 : 0,
                  }}
                >
                  <path d={path} fill="currentColor" />
                </motion.svg>
              </motion.g>
            </a>
          ))}
        </motion.svg>
      </div>
    </div>
  );
}
