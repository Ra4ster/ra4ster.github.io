import {
  FiChevronUp as ChevronUp,
  FiChevronDown as ChevronDown,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const items = [
  {
    date: "2005",
    text: "I was born on March 18th in Columbus Ohio, as an only child (soon-to-be older brother).",
  },
  {
    date: "2020",
    text: "Major COVID conflicts cause my school to go remote. With so many canceled events, preparing for the SAT and driving tests pressure me to strive harder.",
  },
  {
    date: "2021",
    text: "Began my first job at Swenson's Drive-Ins, where I learned to grill, fry, shake, clean, and work in a fast-paced environment with a team.",
  },
  {
    date: "2022",
    text: "2022 was especially rough for me. Diagnosed with Crohn's Disease, I spent a large amount of school time getting tests done and calling in sick. Finding remission was a huge process, and one that I am still working on today.",
  },
  {
    date: "2023",
    text: "I graduated from Scioto Highschool Summa Cum Laude, and enrolled at The Ohio State University under PoliSci.",
  },
  {
    date: "2024",
    text: "Disappointed in the lack of mathematics and logic in my classes, I applied to enroll in Data Analytics, an exclusive application-only major.",
  },
  {
    date: "2025",
    text: "The bulk of my studies on Machine Learning and Artificial Intelligence are this year. I took classes in Bayesian Theory, AI, Computer Vision, Regression, Databases, Low-Level programming, etc.",
  },
  {
    date: "2026",
    text: "It's the present. I am currently applying to startups across the nation, applications at T-10 MSCS graduate universities, and working on HPC projects at Ohio Supercomputer Center. My goal for this year is to learn CUDA.",
  },
];

function SlidingDigit({ value }: { value: string }) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState<string | null>(null);
  const currentRef = useRef(value);

  useEffect(() => {
    if (currentRef.current === value) return;

    const outgoing = currentRef.current;
    currentRef.current = value;
    setPrevious(outgoing);
    setCurrent(value);

    const timeout = window.setTimeout(() => setPrevious(null), 450);
    return () => window.clearTimeout(timeout);
  }, [value]);

  return (
    <span className="timeline-digit">
      {previous !== null && (
        <span
          key={`out-${previous}`}
          aria-hidden="true"
          className="timeline-digit__face timeline-digit--out"
        >
          {previous}
        </span>
      )}
      <span
        key={`in-${current}`}
        aria-hidden="true"
        className={`timeline-digit__face ${previous === null ? "" : "timeline-digit--in"}`}
      >
        {current}
      </span>
    </span>
  );
}

function SlidingYear({ value }: { value: string }) {
  return (
    <span className="timeline-year">
      {Array.from(value, (digit, index) => (
        <SlidingDigit key={index} value={digit} />
      ))}
    </span>
  );
}

export default function When() {
  const [selected, setSelected] = useState(0);
  const [displayedText, setDisplayedText] = useState(items[0].text);
  const previousSelected = useRef(selected);
  const selectedText = items[selected].text;

  useEffect(() => {
    if (previousSelected.current === selected) return;
    previousSelected.current = selected;

    const target = items[selected].text;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-/[](){}^%&@!";
    const startTime = performance.now();
    const duration = 650;
    const timer = window.setInterval(() => {
      const progress = Math.min((performance.now() - startTime) / duration, 1);
      const resolvedCharacters = Math.floor(progress * target.length);
      const nextText = Array.from(target, (character, index) => {
        if (index < resolvedCharacters || character === " ") return character;
        return characters[Math.floor(Math.random() * characters.length)];
      }).join("");

      setDisplayedText(nextText);
      if (progress === 1) {
        window.clearInterval(timer);
        setDisplayedText(target);
      }
    }, 35);

    return () => window.clearInterval(timer);
  }, [selected]);

  return (
    <motion.section
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="h-full w-full text-black flex items-center"
    >
      <div className="flex h-full w-full gap-8">
        <div className="flex h-full w-28 shrink-0 flex-col items-center border-l-2 border-black">
          <ChevronUp
            size={48}
            strokeWidth={1.5}
            className="my-3 cursor-pointer opacity-40 transition-opacity duration-200 ease-in hover:opacity-100"
            onClick={() =>
              setSelected(
                (selected) => (selected - 1 + items.length) % items.length,
              )
            }
          />
          <div className="relative flex min-h-0 w-full flex-1 flex-col">
            {items.map((item, i) => (
              <button
                key={item.date}
                type="button"
                aria-pressed={selected === i}
                className="flex flex-1 cursor-pointer items-center justify-center alliance2 transition-opacity duration-300"
                style={{
                  opacity: Math.max(0.2, 1 - Math.abs(selected - i) * 0.15),
                }}
                onClick={() => setSelected(i)}
              >
                {item.date}
              </button>
            ))}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[-7px] size-3 -translate-y-1/2 rounded-full border-2 border-black bg-white transition-[top] duration-500 ease-in-out"
              style={{ top: `${((selected + 0.5) / items.length) * 100}%` }}
            />
          </div>
          <ChevronDown
            size={48}
            strokeWidth={1.5}
            className="my-3 cursor-pointer opacity-40 transition-opacity duration-200 ease-in hover:opacity-100"
            onClick={() => setSelected((selected + 1) % items.length)}
          />
        </div>
        <article className="grid min-w-0 flex-1 content-center gap-2">
          <h2 className="text-xl">
            <span className="sr-only">{items[selected].date}</span>
            <span aria-hidden="true">
              <SlidingYear value={items[selected].date} />
            </span>
          </h2>
          <div className="grid min-w-0">
            {items.map((item) => (
              <p
                key={item.date}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 text-base leading-relaxed"
              >
                {item.text}
              </p>
            ))}
            <div className="col-start-1 row-start-1 min-w-0">
              <p className="relative text-base leading-relaxed text-gray-600">
                <span
                  className={displayedText === selectedText ? "" : "invisible"}
                >
                  {selectedText}
                </span>
                {displayedText !== selectedText && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block overflow-hidden"
                  >
                    {displayedText}
                  </span>
                )}
              </p>
            </div>
          </div>
        </article>
      </div>
    </motion.section>
  );
}
