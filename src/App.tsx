import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MoveRight,
  ScanSearch,
  Sparkle,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";
import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

type Project = {
  title: string;
  year: string;
  category: string;
  summary: string;
  outcome: string;
  tools: string[];
  metrics: { label: string; value: string }[];
  image: string;
};

type WritingSample = {
  label: string;
  title: string;
  text: string;
};

const projects: Project[] = [
  {
  title: "SIMD-Optimized Levenshtein Distance",
  year: "2025",
  category: "Systems / Performance",
  summary:
    "A highly optimized edit-distance implementation in C using AVX2 and POSIX, designed to significantly outperform naive approaches.",
  outcome:
    "Demonstrated measurable performance gains through vectorization and low-level optimization.",
  tools: ["C", "AVX2", "SIMD", "POSIX"],
  metrics: [
    { label: "Focus", value: "Vectorization" },
    { label: "Type", value: "Algorithm Optimization" },
    { label: "Level", value: "Low-Level Systems" },
  ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
  title: "Moderation Classifier (BERT)",
  year: "2026",
  category: "Machine Learning",
  summary:
    "A multi-class moderation classifier built using BERT with PyTorch and ONNX, designed for real-time content classification.",
  outcome:
    "Built an end-to-end ML pipeline including training, optimization, and deployable inference.",
  tools: ["Python", "PyTorch", "ONNX", "Transformers"],
  metrics: [
    { label: "Type", value: "NLP" },
    { label: "Model", value: "BERT" },
    { label: "Task", value: "Classification" },
  ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
  title: "Custom Redis Server",
  year: "2025",
  category: "Systems / Backend",
  summary:
    "A Redis-like server implemented in C++, focusing on networking, data structures, and performance.",
  outcome:
    "Explored backend architecture and low-level system design principles.",
  tools: ["C++", "Networking", "Data Structures"],
  metrics: [
    { label: "Type", value: "Backend System" },
    { label: "Focus", value: "Performance" },
    { label: "Level", value: "Systems" },
  ],
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80",
  },
];

const writingSamples: WritingSample[] = [
  {
    label: "What I Value",
    title: "Clarity before complexity.",
    text: "I build analytics work that helps people decide faster: cleaner dashboards, sharper summaries, and the right amount of depth behind the recommendation.",
  },
  {
    label: "How I Work",
    title: "Analytical, practical, reliable.",
    text: "I like ambiguous problems that need structure. My instinct is to turn messy data into something decision-makers can trust, use, and revisit.",
  },
  {
    label: "What I’m Looking For",
    title: "Real analytics work with real stakes.",
    text: "I am looking for internships and opportunities where strong quantitative thinking, communication, and ownership all matter at once.",
  },
];

function useMeasuredWidth<T extends HTMLElement>(fallback = 720) {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => setWidth(node.clientWidth || fallback);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [fallback]);

  return { ref, width };
}

function usePretextLines(
  text: string,
  font = "500 18px Inter",
  widthFallback = 720,
  lineHeight = 32,
) {
  const { ref, width } = useMeasuredWidth<HTMLDivElement>(widthFallback);

  const measured = useMemo(() => {
    const prepared = prepareWithSegments(text, font);
    return layoutWithLines(prepared, Math.max(120, width), lineHeight);
  }, [font, lineHeight, text, width]);

  return { ref, measured };
}

function useBalancedHeadline(
  text: string,
  font = "600 72px Inter",
  widthFallback = 900,
) {
  const { ref, width } = useMeasuredWidth<HTMLDivElement>(widthFallback);

  const lines = useMemo(() => {
    const prepared = prepareWithSegments(text, font);
    const base = Math.max(280, width);
    const candidates = [base * 0.8, base * 0.9, base, base * 1.08, base * 1.16];

    let bestLines: string[] = [text];
    let bestScore = Number.POSITIVE_INFINITY;

    for (const candidateWidth of candidates) {
      const result = layoutWithLines(prepared, Math.round(candidateWidth), 76);
      const widths = result.lines.map((line) => line.width);
      if (widths.length === 0 || widths.length > 4) continue;

      const max = Math.max(...widths);
      const min = Math.min(...widths);
      const imbalance = max - min;
      const linePenalty = Math.abs(widths.length - 3) * 140;
      const score = imbalance + linePenalty;

      if (score < bestScore) {
        bestScore = score;
        bestLines = result.lines.map((line) => line.text);
      }
    }

    return bestLines;
  }, [font, text, width]);

  return { ref, lines };
}

function useAdaptiveSummary(
  text: string,
  font = "500 15px Inter",
  widthFallback = 320,
) {
  const { ref, width } = useMeasuredWidth<HTMLDivElement>(widthFallback);

  const summary = useMemo(() => {
    const prepared = prepareWithSegments(text, font);
    const result = layoutWithLines(prepared, Math.max(180, width), 28);

    const firstThree = result.lines.slice(0, 3).map((line) => line.text);
    const didTruncate = result.lines.length > 3;

    const trimmed = [...firstThree];
    if (didTruncate && trimmed.length > 0) {
      trimmed[trimmed.length - 1] = `${trimmed[trimmed.length - 1].trimEnd()}…`;
    }

    return { lines: trimmed, didTruncate };
  }, [font, text, width]);

  return { ref, summary };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
      {children}
    </div>
  );
}

function HeroHeadline({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();
  const { ref, lines } = useBalancedHeadline(text);

  return (
    <div ref={ref} className="max-w-[980px]">
      {lines.map((line, index) => (
        <motion.div
          key={`${line}-${index}`}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" }
          }
          animate={
            reduceMotion
              ? {}
              : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
          }
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.08,
          }}
          className="pb-[0.18em] text-[clamp(3.2rem,7vw,6.6rem)] font-semibold leading-[1.06] tracking-[-0.06em] text-zinc-950 will-change-transform"
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

function PretextParagraph({
  sample,
  index,
}: {
  sample: WritingSample;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const { ref, measured } = usePretextLines(
    sample.text,
    "500 18px Inter",
    680,
    32,
  );

  const lines = useMemo(() => {
    if (!measured?.lines) return [sample.text];
    return measured.lines.map((line) => line.text);
  }, [measured, sample.text]);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="border-t border-zinc-200 py-8 first:border-t-0 first:pt-0"
    >
      <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
        {sample.label}
      </div>
      <h3 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-950">
        {sample.title}
      </h3>

      <div
        ref={ref}
        className="max-w-2xl text-[18px] leading-[1.8] text-zinc-700"
      >
        {lines.map((line, lineIndex) => (
<div key={lineIndex} className="mb-1">
  <motion.span
    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
    whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.06 * lineIndex,
    }}
    className="block text-zinc-700 will-change-transform"
  >
    {line}
  </motion.span>
</div>
        ))}
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const { ref, summary } = useAdaptiveSummary(
    project.summary,
    "500 15px Inter",
    320,
  );

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="flex h-full flex-col overflow-hidden border border-zinc-300 bg-white/70 backdrop-blur-[3px]"
    >
      <div className="group relative h-56 shrink-0 overflow-hidden border-b border-zinc-300 bg-zinc-100">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4 border border-white/30 bg-black/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm">
          Figure 0{index + 1}
        </div>
      </div>

      <div className="grid flex-1 gap-0 grid-rows-[1fr_auto] md:grid-cols-[minmax(0,1fr)_156px] md:grid-rows-1 lg:grid-cols-1 lg:grid-rows-[1fr_auto]">
        <div className="p-5">
          <div className="flex items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950">
            {project.title}
          </h3>

          <div
            ref={ref}
            className="mt-3 min-h-[92px] text-[15px] leading-7 text-zinc-700"
          >
            {summary.lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="border border-zinc-300 px-2.5 py-1 text-xs text-zinc-700"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-6 border-t border-zinc-200 pt-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              Result
            </div>
            <p className="mt-2 text-sm leading-7 text-zinc-700">
              {project.outcome}
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-300 bg-[#f3efe8]/70 backdrop-blur-[3px] p-4 md:border-l md:border-t-0 lg:border-l-0 lg:border-t">
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            Case Data
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  {metric.label}
                </div>
                <div className="mt-1 text-sm font-medium text-zinc-900">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturePanel({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="border border-zinc-300 p-4">
      <div className="text-zinc-950">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-zinc-950">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-7 text-zinc-700">{body}</p>
    </div>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const heroText =
    "Data analytics for forecasting, dashboards, and decisions that actually move work forward.";
  
  const [particlesReady, setParticlesReady] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, []);

return (
    <>
{particlesReady && (
  <div className="pointer-events-none fixed inset-0 z-0">
    <Particles
      id="portfolio-particles"
      className="h-full w-full"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        particles: {
          number: {
            value: 80,
            density: { enable: true, width: 800, height: 800 },
          },
          color: { value: "#71717a" },
          links: {
            color: "#71717a",
            distance: 150,
            enable: true,
            opacity: 0.3, // Thinner, subtle lines
            width: 1,     // Canonical thin width
          },
          move: {
            enable: true,
            speed: 3,     // Faster "default" pace
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // Switched from grab to repulse
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  </div>
)}
      <div className="relative z-10 mx-auto max-w-[1480px] px-5 pb-14 pt-5 sm:px-7 lg:px-10">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: -18 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 border border-zinc-300 bg-[#f3efe8]/70 backdrop-blur-[3px]"
        >
          <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">
                Jack Rose
              </div>
              <div className="mt-1 text-xl font-semibold tracking-tight text-zinc-950">
                Data Analytics Portfolio
              </div>
            </div>

            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-700">
              <a href="#work" className="transition hover:text-zinc-950">
                Work
              </a>
              <a href="#feature" className="transition hover:text-zinc-950">
                Feature
              </a>
              <a href="#approach" className="transition hover:text-zinc-950">
                Approach
              </a>
              <a href="#contact" className="transition hover:text-zinc-950">
                Contact
              </a>
            </nav>
          </div>
        </motion.header>

        <section className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="border border-zinc-300 bg-[#f3efe8]/70 backdrop-blur-[3px]"
          >
            <div className="grid min-h-[720px] grid-rows-[auto_auto_1fr_auto] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-zinc-300 pb-4">
                <SectionLabel>Portfolio / 2026</SectionLabel>
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <MapPin className="h-4 w-4" />
                  Ohio
                </div>
              </div>

              <div className="grid gap-4 border-b border-zinc-300 py-5 md:grid-cols-[1fr_auto] md:items-center">
                <div className="text-sm leading-7 text-zinc-700">
                  Data Analytics major focused on forecasting, KPI design,
                  structured storytelling, and finding the signal that most
                  dashboards bury.
                </div>
                <div className="grid grid-cols-3 gap-6 text-xs uppercase tracking-[0.18em] text-zinc-500">
                  <div>
                    <div>Focus</div>
                    <div className="mt-2 text-sm font-medium normal-case tracking-normal text-zinc-900">
                      Forecasting
                    </div>
                  </div>
                  <div>
                    <div>Tools</div>
                    <div className="mt-2 text-sm font-medium normal-case tracking-normal text-zinc-900">
                      SQL / Python / BI
                    </div>
                  </div>
                  <div>
                    <div>Mode</div>
                    <div className="mt-2 text-sm font-medium normal-case tracking-normal text-zinc-900">
                      Decision Support
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center py-10 sm:py-14">
                <div className="mb-5 flex items-center gap-2 text-sm text-zinc-600">
                  <ScanSearch className="h-4 w-4" />
                  Forecasting, KPI design, decision support
                </div>
                <HeroHeadline text={heroText} />
                <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-700 sm:text-[19px]">
I build systems and analytics tools that emphasize performance,
clarity, and practical use. My work spans low-level optimization,
custom infrastructure, and machine learning applications—from
SIMD-accelerated algorithms in C to neural classifiers and data
analysis pipelines.
                </p>
              </div>

              <div className="grid gap-4 border-t border-zinc-300 pt-5 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="border border-zinc-300 bg-white/70 backdrop-blur-[3px] p-4">
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                    <Sparkle className="h-4 w-4" />
                    Signal / Noise
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-700">
                    The best analytics work reduces noise, sharpens priorities,
                    and makes the next action clearer.
                  </p>
                </div>
                <div className="border border-zinc-300 bg-white/70 backdrop-blur-[3px] p-4">
                  <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                    Field Note
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-700">
                    I care about precision, readability, and trust. Good outputs
                    should hold up both in a meeting and under scrutiny later.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="grid gap-5"
          >
            <div className="group relative min-h-[420px] overflow-hidden border border-zinc-300 bg-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
                alt="Analytics workspace"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 grid gap-4 p-6 text-white">
                <div className="max-w-lg">
                  <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/70">
                    Figure 00 / Workspace
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight">
                    Portfolio highlights and selected work.
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/85">
                    This area is ready for your best dashboard screenshot,
                    project visual, or workspace image so the site feels
                    personal and complete.
                  </p>
                </div>
                <div className="grid gap-3 border-t border-white/20 pt-4 sm:grid-cols-3">
                  {["Forecasting", "Dashboards", "Decision support"].map(
                    (item) => (
                      <div key={item} className="text-sm text-white/80">
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="border border-zinc-300 bg-white/70 backdrop-blur-[3px] p-5">
                <SectionLabel>Mini Case Snapshot</SectionLabel>
                <div className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">
                  10+ Projects
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-700">
Multiple performance-focused systems projects, including
SIMD-optimized algorithms, custom infrastructure, and
machine learning classifiers.
                </p>
              </div>
              <div className="border border-zinc-300 bg-[#ece7dd]/70 backdrop-blur-[3px] p-5">
                <SectionLabel>Profile</SectionLabel>
                <p className="mt-4 text-sm leading-7 text-zinc-700">
                  Data Analytics student at OSU with strong systems and
machine learning experience. Interested in performance,
infrastructure, and building tools that bridge low-level
efficiency with real-world applications.
                </p>
              </div>
            </div>

            <div className="border border-zinc-300 bg-white/70 backdrop-blur-[3px] p-6">
              <SectionLabel>Contact Links</SectionLabel>
              <div className="mt-5 grid gap-3">
                {[
                  {
                    icon: <Github className="h-4 w-4" />,
                    label: "GitHub",
                    href: "https://github.com/ra4ster",
                  },
                  {
                    icon: <Linkedin className="h-4 w-4" />,
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/jack-c-rose/",
                  },
                  {
                    icon: <Mail className="h-4 w-4" />,
                    label: "Email",
                    href: "mailto:jackrose2335@gmail.com",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between border border-zinc-300 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>
                    <MoveRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="work" className="mt-20">
          <div className="mb-8 grid gap-4 border-b border-zinc-300 pb-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <SectionLabel>Selected Work</SectionLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
                Portfolio projects
              </h2>
            </div>
            <div className="max-w-md text-sm leading-7 text-zinc-600">
              A selection of projects focused on forecasting, retention, and
              operations visibility. Each one is framed as work that supports
              decisions, not just reporting.
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        <section
          id="feature"
          className="mt-20 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]"
        >
          <div className="border border-zinc-300 bg-white/70 backdrop-blur-[3px] p-6 sm:p-8">
            <SectionLabel>Experience</SectionLabel>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-zinc-950">
              What I bring to an analytics team.
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-8 text-zinc-700">
I bring a mix of systems-level thinking and analytical reasoning.
I am comfortable working across abstraction layers—from optimized
C implementations to machine learning models and data pipelines—
with a focus on building tools that are both efficient and usable.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <FeaturePanel
                icon={<BarChart3 className="h-5 w-5" />}
title="Systems Programming"
body="Experience building low-level systems in C and C++, including memory, performance, and architecture considerations."
              />
              <FeaturePanel
                icon={<Database className="h-5 w-5" />}
title="Machine Learning"
body="Built classification systems using modern ML frameworks including PyTorch and transformer models."
              />
              <FeaturePanel
                icon={<Briefcase className="h-5 w-5" />}
title="Performance Optimization"
body="Focused on efficient implementations using SIMD, AVX2, and algorithmic improvements."
              />
              <FeaturePanel
                icon={<ScanSearch className="h-5 w-5" />}
title="Software Engineering"
body="Strong foundation across Java, Python, and C++, with experience building complete, usable systems."
              />
            </div>
          </div>

          <div className="grid gap-5">
            <div className="overflow-hidden border border-zinc-300 bg-[#ece7dd]/70 backdrop-blur-[3px]">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
                alt="Desk with laptop and analytics setup"
                className="h-full min-h-[360px] w-full object-cover"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-[1.15fr_0.85fr]">
              <div className="border border-zinc-300 bg-white/70 backdrop-blur-[3px] p-5">
                <SectionLabel>Featured Project</SectionLabel>
                <div className="mt-4 max-w-xl text-[16px] leading-8 text-zinc-700">
This section should highlight your strongest technical project—
ideally your SIMD optimization or classifier—explaining the
problem, approach, and why your solution is meaningfully better.
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Problem statement",
                    "Approach",
                    "Key metric",
                    "Outcome",
                  ].map((item) => (
                    <span
                      key={item}
                      className="border border-zinc-300 px-2.5 py-1 text-xs text-zinc-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-zinc-300 bg-[#f3efe8]/70 backdrop-blur-[3px] p-5">
                <SectionLabel>Strengths</SectionLabel>
                <div className="mt-4 space-y-4">
                  {[
                    "Structured analysis",
                    "Clear reporting",
                    "Business context",
                    "Reliable execution",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-zinc-700"
                    >
                      <div className="flex h-7 w-7 items-center justify-center border border-zinc-300 bg-white text-xs font-medium text-zinc-900">
                        0{index + 1}
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="approach"
          className="mt-20 border border-zinc-300 bg-white/70 backdrop-blur-[3px] p-6 sm:p-8"
        >
          <div className="mb-8 grid gap-4 border-b border-zinc-300 pb-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <SectionLabel>Approach</SectionLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
                How I think about analytics work
              </h2>
            </div>
            <div className="max-w-md text-sm leading-7 text-zinc-600">
              A few short statements that communicate how I approach analysis,
              communication, and the kind of opportunities I want to grow into.
            </div>
          </div>

          <div>
            {writingSamples.map((sample, index) => (
              <PretextParagraph
                key={sample.title}
                sample={sample}
                index={index}
              />
            ))}
          </div>
        </section>

<section
  id="contact"
  className="mt-20 border border-zinc-300 bg-[#f3efe8]/70 backdrop-blur-[3px] p-6 sm:p-8"
>
  {/* The main grid remains 2 columns: Text (Left) and Action Stack (Right) */}
  <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
    
    {/* Column 1: Text Content */}
    <div>
      <SectionLabel>Contact</SectionLabel>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl max-w-3xl">
        Open to internships, analytics projects, and teams that care about quality.
      </h2>
      <p className="mt-5 max-w-2xl text-[16px] leading-8 text-zinc-700">
        I’m looking for internships and opportunities in software engineering, machine learning, or systems work where I can contribute to meaningful, technically challenging projects.
      </p>
    </div>

    {/* Column 2: The Vertical Stack (Image + Button) */}
    <div className="flex flex-col items-end gap-8">
      <img
        src="https://avatars.githubusercontent.com/u/195119975?v=4"
        alt="Jack Rose"
        className="h-48 w-48 rounded-full object-cover border border-zinc-300 shadow-lg"
      />

      <a
        href="mailto:jackrose2335@gmail.com"
        className="inline-flex items-center gap-3 border border-zinc-950 bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:translate-x-1"
      >
        Reach Out
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>

  </div>
</section>
                <div className="mt-10 flex justify-end">
          <a
            href="#top"
            className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-950 hover:-translate-y-1"
          >
            Back to top
            <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
          </a>
        </div>
      </div>
    </>
  );
}
