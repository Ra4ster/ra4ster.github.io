import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

export default function Socials({ className }: { className: string }) {
  const [dispersed, setDispersed] = useState(false);
  const [hoveredCircle, setHoveredCircle] = useState<number | null>(null);
  const [readyToHover, setReadyToHover] = useState(false);
  const [hoveringShare, setHoveringShare] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dispersed) return;
    const handleClickOutside = (e: MouseEvent) => {
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
    return () => window.removeEventListener("click", handleClickOutside);
  }, [dispersed]);

  const circles = [
    {
      cx: 14,
      cy: 6,
      x: 35,
      y: 0,
      color: "#8B5CF6",
      Icon: FaGithub,
      href: "https://github.com/Ra4ster",
    },
    {
      cx: 8,
      cy: 12,
      x: 35,
      y: -35,
      color: "#0A66C2",
      Icon: FaLinkedinIn,
      href: "https://linkedin.com/in/jack-c-rose",
    },
    {
      cx: 14,
      cy: 18,
      x: 0,
      y: -35,
      color: "#EA4335",
      Icon: MdOutlineMail,
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
            ? "-top-[74px] -right-[80px] bottom-0 left-0 pointer-events-auto"
            : "inset-0 pointer-events-none"
        }`}
        onMouseLeave={() => {
          setDispersed(false);
          setReadyToHover(false);
          setHoveredCircle(null);
          setHoveringShare(false);
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
            if (!dispersed) {
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

          {circles.map(({ cx, cy, x, y, color, Icon, href }, i) => (
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
              <g>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r="2.5"
                  strokeWidth="2"
                  fill="white"
                  stroke={
                    dispersed && readyToHover && hoveredCircle === i
                      ? color
                      : dispersed || hoveringShare
                        ? "#000000"
                        : "#9ca3af"
                  }
                  animate={{
                    x: dispersed ? x : 0,
                    y: dispersed ? y : 0,
                    scale: dispersed ? 5 : 1,
                    strokeWidth: dispersed ? 0.8 : 2,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: i * 0.07,
                    stroke: { duration: 0.2 },
                    scale: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  }}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    transition: "stroke 0.2s ease",
                  }}
                  onAnimationComplete={() => {
                    if (dispersed && i === 2) {
                      setReadyToHover(true);
                    }
                  }}
                />

                <motion.foreignObject
                  x={cx - 2}
                  y={cy - 2}
                  width="4"
                  height="4"
                  style={{ overflow: "visible", pointerEvents: "none" }}
                  initial={{ opacity: 0 }}
                  animate={{
                    x: dispersed ? x : 0,
                    y: dispersed ? y : 0,
                    scale: dispersed ? 5 : 1,
                    opacity: dispersed ? 1 : 0,
                  }}
                  transition={{
                    x: {
                      duration: 0.6,
                      ease: "easeOut",
                      delay: i * 0.07,
                    },
                    y: {
                      duration: 0.6,
                      ease: "easeOut",
                      delay: i * 0.07,
                    },
                    scale: {
                      duration: 0.6,
                      ease: "easeOut",
                      delay: i * 0.07,
                    },
                    opacity: {
                      duration: 0.2,
                      delay: dispersed ? 0.3 + i * 0.07 : 0,
                    },
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color:
                        dispersed && readyToHover && hoveredCircle === i
                          ? color
                          : "currentColor",
                      transition: "color 0.2s ease",
                    }}
                  >
                    <Icon size="3" />
                  </div>
                </motion.foreignObject>
              </g>
            </a>
          ))}
        </motion.svg>
      </div>
    </div>
  );
}
