import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Database,
  Mail,
  ScrollText,
  MapPin,
  MoveRight,
  ScanSearch,
  Sparkle,
  Code,
  Command,
  Sun,
  Moon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.67 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.4-2.69 5.37-5.25 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.2.67.8.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

type Project = {
  title: string;
  year: string;
  github: string;
  category: string;
  summary: string;
  outcome: string;
  tools: string[];
  metrics: { label: string; value: string }[];
  image: string;
};

type WritingSample = {
  label: string;
  image: string;
  title: string;
  text: string;
};

const projects: Project[] = [
  {
    title: "SIMD-Optimized Levenshtein Distance",
    year: "2025",
    github: "https://github.com/Ra4ster/Optimized-Levenshtein-Distance",
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
    image: "/LevenshteinDistanceOutput.png",
  },
  {
    title: "Moderation Classifier (BERT)",
    year: "2026",
    github: "https://github.com/Ra4ster/Automod-Classifier",
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
    image: "/automod.png",
  },
  {
    title: "Custom Desktop Environment",
    year: "2025",
    github: "https://github.com/Balcony4Windows/Railing",
    category: "Systems / UX",
    summary:
      "A custom taskbar and desktop shell implemented in Win32, focusing on webview integration, reverse engineering, and rendering performance.",
    outcome:
      "Built a functional Windows desktop replacement with a custom taskbar, emphasizing low-level UI performance and native interop.",
    tools: ["C++", "Win32", "WebView", "Reverse Engineering"],
    metrics: [
      { label: "Type", value: "UI/UX" },
      { label: "Focus", value: "Performance" },
      { label: "Level", value: "Systems" },
    ],
    image: "/glass_pill.png",
  },
  {
    title: "Deepity",
    year: "2026",
    github: "https://github.com/Ra4ster/deepity",
    category: "Machine Learning",
    summary:
      "A predictive coding library created in C++ with bindings for Python, delivering performance on CPU currently faster than top libraries like pcn-torch.",
    outcome:
      "93% accuracy on MNIST in 1000 seconds, and neurologically inspired software, available with clean documentation.",
    tools: ["C++", "BLAS", "OMP", "Python", "OpenMP", "CUDA", "CMake"],
    metrics: [
      { label: "Type", value: "AI/ML" },
      { label: "Focus", value: "Performance & DevX" },
      { label: "Level", value: "Full Stack" },
    ],
    image: "/MNIST_results.png",
  },
];

const writingSamples: WritingSample[] = [
  {
    label: "What I Value",
    image: "/Rplot.png",
    title: "Clarity before complexity.",
    text: "I build analytics work that helps people decide faster: cleaner dashboards, sharper summaries, and the right amount of depth behind the recommendation.",
  },
  {
    label: "How I Work",
    image: "/Swiss_Roll_2.png",
    title: "Analytical, practical, reliable.",
    text: "I like ambiguous problems that need structure. My instinct is to turn messy data into something decision-makers can trust, use, and revisit.",
  },
  {
    label: "What I’m Looking For",
    image: "/HR_Visualization.png",
    title: "Real analytics work with real stakes.",
    text: "I am looking for internships and opportunities where strong quantitative thinking, communication, and ownership all matter at once.",
  },
];

type CaseStudy = {
  id: string;
  label: string;
  title: string;
  intro: string;
  points: string[];
  image?: string;
  imageAlt?: string;
  pdfHref?: string;
  externalHref?: string;
  externalLabel?: string;
  tags: string[];
};

const caseStudies: CaseStudy[] = [
  {
    id: "deepity-predictive-coding",
    label: "Machine Learning / C++",
    title: "A predictive coding library, built to be fast on CPU.",
    intro:
      "Deepity is a predictive coding library written in C++ with Python bindings, built as an alternative to backprop-based training and implemented to run faster on CPU than established libraries like pcn-torch, not just to prove the algorithm works.",
    points: [
      "Core numerics in C++ with BLAS and OpenMP for CPU performance, with optional CUDA for GPU workloads, wrapped in Python bindings so the library is usable from either side of the stack.",
      "Predictive coding is a biologically inspired alternative to standard backpropagation, and the implementation focuses on making that idea practical rather than purely academic.",
      "Reached 93% accuracy on MNIST in 1000 seconds, with performance on CPU currently ahead of comparable libraries like pcn-torch.",
      "Shipped with CMake-based builds and documentation, so it's set up to be used rather than just cloned and read.",
    ],
    image: "/MNIST_results.png",
    imageAlt: "Deepity MNIST training results",
    externalHref: "https://github.com/Ra4ster/deepity",
    externalLabel: "View source on GitHub",
    tags: ["Predictive Coding", "C++", "BLAS / OpenMP", "Python Bindings"],
  },
  {
    id: "titanic-logistic-regression",
    label: "Statistics / R",
    title: "Did age and sex jointly predict survival on the Titanic?",
    intro:
      "I fit a logistic regression model on the Titanic passenger manifest with an age × sex interaction term, to test whether the survival gap between men and women held steady across ages or changed with them.",
    points: [
      "Modeled survival as a binary outcome with age, sex, and an age × sex interaction term as predictors, fit in R by maximum likelihood.",
      "Used the interaction term specifically to test whether the male/female survival gap widened or narrowed for older versus younger passengers, rather than assuming one fixed effect.",
      "Built a confidence interval on the joint contribution of age and sex to isolate how much of the survival differential the two variables explain together.",
      "Exact coefficient estimates, interval bounds, and model diagnostics are in the full write-up below.",
    ],
    image: "/predGraph.png",
    imageAlt: "Predicted survival probability by age and sex",
    pdfHref: "/STAT3302_HW2_LogisticRegression.pdf",
    tags: [
      "Survival Analysis",
      "Logistic Regression",
      "Confidence Intervals",
      "Hypothesis Testing",
    ],
  },
];

type RepoStats = {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
};

function parseGithubRepo(url: string) {
  try {
    const parsed = new URL(url);
    const [, owner, repo] = parsed.pathname.split("/");
    if (!owner || !repo) return null;
    return { owner, repo: repo.replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

function formatRelativeDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

function useGithubStats(repos: Project[]) {
  const [stats, setStats] = useState<Record<string, RepoStats>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    (async () => {
      try {
        const entries = await Promise.all(
          repos.map(async (project) => {
            const parsed = parseGithubRepo(project.github);
            if (!parsed) return null;

            const res = await fetch(
              `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
              { headers: { Accept: "application/vnd.github+json" } },
            );
            if (!res.ok) throw new Error(`GitHub API ${res.status}`);
            const data = await res.json();

            return [
              project.title,
              {
                stars: data.stargazers_count ?? 0,
                forks: data.forks_count ?? 0,
                language: data.language ?? null,
                pushedAt: data.pushed_at ?? "",
              } as RepoStats,
            ] as const;
          }),
        );

        if (cancelled) return;

        const next: Record<string, RepoStats> = {};
        entries.forEach((entry) => {
          if (entry) next[entry[0]] = entry[1];
        });

        setStats(next);
        setStatus(Object.keys(next).length > 0 ? "ready" : "error");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [repos]);

  return { stats, status };
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}

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

function SiteBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const context = canvasEl?.getContext("2d");
    if (!canvasEl || !context) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const GRID_SIZE = 50;
    const BOLD_EVERY = 3;
    const CROSS_SIZE_SMALL = 5;
    const CROSS_SIZE_LARGE = 9;
    const CROSS_THICKNESS = 1;
    const SCROLL_SPEED = 0.1;
    const TWINKLE_MIN = 0.15;
    const TWINKLE_MAX = 1.0;
    const TWINKLE_SPEED = 0.001;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let rafId = 0;
    let offset = 0;

    type Cross = {
      baseX: number;
      baseY: number;
      phase: number;
      speed: number;
      isLarge: boolean;
    };
    let crosses: Cross[] = [];

    const readVar = (name: string, fallback: string) => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      return value || fallback;
    };

    function rebuildCrosses() {
      const step = GRID_SIZE * BOLD_EVERY;
      const cols = Math.ceil(width / step) + 2;
      const rows = Math.ceil(height / step) + 2;
      crosses = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          crosses.push({
            baseX: c * step,
            baseY: r * step,
            phase: Math.random() * Math.PI * 2,
            speed: TWINKLE_SPEED * (0.5 + Math.random()),
            isLarge: (r + c) % 2 === 0,
          });
        }
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, window.innerWidth);
      height = Math.max(rect.height, window.innerHeight);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildCrosses();
      draw();
    }

    function draw() {
      const bgColor = readVar("--bg", "#ffffff");
      const lineColor = readVar("--text", "#46434F");
      const accentColor = readVar("--accent", "#FF0080");

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      const step = GRID_SIZE * BOLD_EVERY;
      const ox = -(offset % step);
      const oy = -((offset * 0.7) % step);

      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = 0.12;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = ox; x < width; x += GRID_SIZE) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = oy; y < height; y += GRID_SIZE) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      for (let x = ox; x < width; x += step) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = oy; y < height; y += step) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      const t = performance.now();
      ctx.lineWidth = CROSS_THICKNESS;

      crosses.forEach((cross) => {
        const x = cross.baseX + ox;
        const y = cross.baseY + oy;
        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) return;

        const phase = Math.sin(t * cross.speed + cross.phase);
        const norm = (phase + 1) / 2;
        const tw = TWINKLE_MIN + (TWINKLE_MAX - TWINKLE_MIN) * Math.pow(norm, 2);
        const size = cross.isLarge ? CROSS_SIZE_LARGE : CROSS_SIZE_SMALL;

        ctx.strokeStyle = cross.isLarge ? accentColor : lineColor;
        ctx.globalAlpha = (cross.isLarge ? 0.65 : 0.22) * tw;
        ctx.beginPath();
        ctx.moveTo(x + 0.5, y - size);
        ctx.lineTo(x + 0.5, y + size);
        ctx.moveTo(x - size, y + 0.5);
        ctx.lineTo(x + size, y + 0.5);
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
    }

    function loop() {
      offset += SCROLL_SPEED;
      draw();
      rafId = requestAnimationFrame(loop);
    }

    resize();
    const raf1 = requestAnimationFrame(() => requestAnimationFrame(resize));

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);
    window.addEventListener("resize", resize);

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf1);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--text)]">
      {children}
    </div>
  );
}

function BalancedHeadline({
  text,
  font = "600 72px Inter",
  widthFallback = 900,
  containerClassName,
  lineClassName,
  trigger = "mount",
}: {
  text: string;
  font?: string;
  widthFallback?: number;
  containerClassName?: string;
  lineClassName: string;
  trigger?: "mount" | "inView";
}) {
  const reduceMotion = useReducedMotion();
  const { ref, lines } = useBalancedHeadline(text, font, widthFallback);

  const motionProps = reduceMotion
    ? {}
    : trigger === "mount"
      ? {
          initial: { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" },
          animate: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
        }
      : {
          initial: { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" },
          whileInView: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
          viewport: { once: true, amount: 0.4 },
        };

  return (
    <div ref={ref} className={containerClassName} aria-hidden="true">
      {lines.map((line, index) => (
        <motion.div
          key={`${line}-${index}`}
          {...motionProps}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.08,
          }}
          className={`${lineClassName} will-change-transform`}
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
      className="border-t border-[var(--border)] py-8 first:border-t-0 first:pt-0"
    >
      <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--text)]">
        {sample.label}
      </div>
      <h3 className="mb-4 text-2xl font-semibold tracking-tight text-[var(--text-h)]">
        {sample.title}
      </h3>

      <div
        ref={ref}
        className="max-w-2xl text-[18px] leading-[1.8] text-[var(--text)]"
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
              className="block text-[var(--text)] will-change-transform"
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
      className="flex h-full flex-col overflow-hidden border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px]"
    >
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} on GitHub`}
        className="group relative h-44 shrink-0 overflow-hidden border-b border-[var(--border)] bg-[var(--code-bg)]"
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          width={640}
          height={224}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />

        <div className="absolute left-4 top-4 border border-white/30 bg-black/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm">
          Figure 0{index + 1}
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
          <span className="translate-y-2 rounded border border-white/60 bg-black/50 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View on GitHub ↗
          </span>
        </div>
      </a>

      <div className="grid flex-1 grid-rows-[1fr_auto] gap-0 md:grid-cols-[minmax(0,1fr)_156px] md:grid-rows-1 lg:grid-cols-1 lg:grid-rows-[1fr_auto]">
        <div className="p-5">
          <div className="flex items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--text)]">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--text-h)]">
            {project.title}
          </h3>

          <div
            ref={ref}
            className="mt-3 min-h-[92px] text-[15px] leading-7 text-[var(--text)]"
          >
            {summary.lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--text)]"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--text)]">
              Result
            </div>

            <p className="mt-2 text-sm leading-7 text-[var(--text)]">
              {project.outcome}
            </p>
          </div>
        </div>
        <div className="border-t border-[var(--border)] bg-[var(--social-bg)] p-4 backdrop-blur-[3px] md:border-l md:border-t-0 lg:border-l-0 lg:border-t">
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--text)]">
            Case Data
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--text)]">
                  {metric.label}
                </div>

                <div className="mt-1 text-sm font-medium text-[var(--text-h)]">
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
    <div className="border border-[var(--border)] p-4">
      <div className="text-[var(--text-h)]">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-[var(--text-h)]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-7 text-[var(--text)]">{body}</p>
    </div>
  );
}

function LiveGithubPanel() {
  const { stats, status } = useGithubStats(projects);

  const statValues: RepoStats[] = Object.values(stats);
  const totalStars = statValues.reduce((sum, r) => sum + r.stars, 0);
  const mostRecentPush = statValues.reduce<string | null>((latest, repo) => {
    if (!repo.pushedAt) return latest;
    if (!latest || new Date(repo.pushedAt) > new Date(latest)) {
      return repo.pushedAt;
    }
    return latest;
  }, null);
  const relativeUpdated = mostRecentPush
    ? formatRelativeDate(mostRecentPush)
    : null;

  return (
    <div className="border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px] p-5">
      <SectionLabel>GitHub</SectionLabel>

      {status === "error" ? (
        <>
          <div className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-h)]">
            4 Open-Source Projects
          </div>
          <p className="mt-3 text-sm leading-7 text-[var(--text)]">
            Multiple performance-focused systems projects, including
            SIMD-optimized algorithms, custom infrastructure, and machine
            learning libraries.
          </p>
        </>
      ) : (
        <>
          <div className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-h)]">
            {status === "loading" ? (
              <span className="text-[var(--text)]">···</span>
            ) : (
              `${totalStars} ★`
            )}
          </div>
          <div className="mt-1 text-sm text-[var(--text)]">
            across {projects.length} repos
            {relativeUpdated ? ` · updated ${relativeUpdated}` : ""}
          </div>
          <p className="mt-3 text-sm leading-7 text-[var(--text)]">
            Star counts and language pulled from each repo's GitHub API
            endpoint.
          </p>
          <div className="mt-4 grid gap-3">
            {projects.map((project) => {
              const repoStats = stats[project.title];
              return (
                <div key={project.title} className="grid gap-0.5">
                  <span className="truncate text-xs text-[var(--text)]">
                    {project.title}
                  </span>
                  <span className="text-[11px] tabular-nums text-[var(--text)]">
                    {repoStats
                      ? `${repoStats.stars} ★ · ${repoStats.language ?? "n/a"}`
                      : "…"}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function CaseStudyBlock({ study }: { study: CaseStudy }) {
  const reduceMotion = useReducedMotion();
  const { ref, measured } = usePretextLines(
    study.intro,
    "500 18px Inter",
    680,
    32,
  );

  const lines = useMemo(() => {
    if (!measured?.lines) return [study.intro];
    return measured.lines.map((line) => line.text);
  }, [measured, study.intro]);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      className="grid gap-6 border-t border-[var(--border)] pt-8 first:border-t-0 first:pt-0 md:grid-cols-[1.1fr_0.9fr] md:items-start"
    >
      <div>
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--text)]">
          {study.label}
        </div>
        <h3 className="mb-4 text-2xl font-semibold tracking-tight text-[var(--text-h)]">
          {study.title}
        </h3>

        <div
          ref={ref}
          className="max-w-2xl text-[17px] leading-[1.8] text-[var(--text)]"
        >
          {lines.map((line, i) => (
            <div key={i} className="mb-1">
              {line}
            </div>
          ))}
        </div>

        <ul className="mt-5 grid gap-2.5">
          {study.points.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-7 text-[var(--text)]"
            >
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--text)]" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--text)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-5">
          {study.pdfHref && (
            <a
              href={study.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-h)] transition hover:gap-3"
            >
              Full derivation & results (PDF)
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
          {study.externalHref && (
            <a
              href={study.externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-h)] transition hover:gap-3"
            >
              {study.externalLabel ?? "View source"}
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {study.image && (
        <div className="overflow-hidden border border-[var(--border)] bg-[var(--code-bg)]">
          <img
            src={study.image}
            alt={study.imageAlt ?? study.title}
            loading="lazy"
            width={640}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </motion.article>
  );
}

type PaletteCommand = {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
  action: () => void;
};

function useCommandPalette(commands: PaletteCommand[]) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((cmd) =>
      `${cmd.label} ${cmd.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isPaletteShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isPaletteShortcut) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const cmd = filtered[activeIndex];
        if (cmd) {
          cmd.action();
          setOpen(false);
          setQuery("");
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, activeIndex]);

  return {
    open,
    setOpen,
    query,
    setQuery,
    filtered,
    activeIndex,
    setActiveIndex,
  };
}

function CommandPalette({
  open,
  onClose,
  query,
  onQueryChange,
  commands,
  activeIndex,
  onHoverIndex,
}: {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  commands: PaletteCommand[];
  activeIndex: number;
  onHoverIndex: (index: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[14vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg border border-[var(--border)] bg-[var(--bg)] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <ScanSearch className="h-4 w-4 shrink-0 text-zinc-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Jump to a section, project, or link…"
            className="w-full bg-transparent text-sm text-[var(--text-h)] outline-none placeholder:text-zinc-400"
          />
          <kbd className="shrink-0 rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-[var(--text)]">
            esc
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {commands.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-[var(--text)]">
              No matches.
            </div>
          ) : (
            commands.map((cmd, i) => (
              <button
                key={cmd.id}
                onMouseEnter={() => onHoverIndex(i)}
                onClick={() => {
                  cmd.action();
                  onClose();
                }}
                className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition ${
                  i === activeIndex
                    ? "bg-[var(--code-bg)] text-[var(--text-h)]"
                    : "text-[var(--text)]"
                }`}
              >
                <span>{cmd.label}</span>
                {cmd.hint && (
                  <span className="shrink-0 text-xs text-[var(--text)]">
                    {cmd.hint}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const heroText =
    "Engineering high-performance systems, scalable infrastructure, and ML pipelines that deliver real gains.";

  const commands = useMemo<PaletteCommand[]>(() => {
    const scrollTo = (id: string) => () => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    };
    const openLink = (href: string) => () => {
      window.open(href, "_blank", "noopener,noreferrer");
    };

    return [
      { id: "nav-work", label: "Go to Work", hint: "Section", action: scrollTo("work") },
      { id: "nav-feature", label: "Go to Feature", hint: "Section", action: scrollTo("feature") },
      { id: "nav-approach", label: "Go to Approach", hint: "Section", action: scrollTo("approach") },
      { id: "nav-writing", label: "Go to Writing", hint: "Section", action: scrollTo("writing") },
      { id: "nav-contact", label: "Go to Contact", hint: "Section", action: scrollTo("contact") },
      ...projects.map((project) => ({
        id: `project-${project.title}`,
        label: project.title,
        hint: "Project · GitHub",
        keywords: `${project.category} ${project.tools.join(" ")}`,
        action: openLink(project.github),
      })),
      {
        id: "link-github",
        label: "Open GitHub Profile",
        hint: "External",
        action: openLink("https://github.com/ra4ster"),
      },
      {
        id: "link-linkedin",
        label: "Open LinkedIn",
        hint: "External",
        action: openLink("https://www.linkedin.com/in/jack-c-rose/"),
      },
      {
        id: "link-email",
        label: "Email Jack",
        hint: "mailto",
        action: openLink("mailto:jackrose2335@gmail.com"),
      },
      {
        id: "toggle-theme",
        label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        hint: "Preference",
        action: toggleTheme,
      },
    ];
  }, [reduceMotion, theme, toggleTheme]);

  const palette = useCommandPalette(commands);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        <SiteBackground />
      </div>
      <CommandPalette
        open={palette.open}
        onClose={() => palette.setOpen(false)}
        query={palette.query}
        onQueryChange={palette.setQuery}
        commands={palette.filtered}
        activeIndex={palette.activeIndex}
        onHoverIndex={palette.setActiveIndex}
      />
      <div
        id="top"
        className="relative z-10 mx-auto max-w-[1480px] px-5 pb-14 pt-5 sm:px-7 lg:px-10"
      >
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: -18 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px]"
        >
          <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--text)]">
                Jack Rose
              </div>
              <h1 className="mt-1 text-xl font-semibold tracking-tight text-[var(--text-h)]">
                Computational Analytics Portfolio
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--text)]">
                <a href="#work" className="transition hover:text-[var(--text-h)]">
                  Work
                </a>
                <a href="#feature" className="transition hover:text-[var(--text-h)]">
                  Feature
                </a>
                <a href="#approach" className="transition hover:text-[var(--text-h)]">
                  Approach
                </a>
                <a href="#writing" className="transition hover:text-[var(--text-h)]">
                  Writing
                </a>
                <a href="#contact" className="transition hover:text-[var(--text-h)]">
                  Contact
                </a>
              </nav>

              <button
                type="button"
                onClick={() => palette.setOpen(true)}
                className="flex items-center gap-2 border border-[var(--border)] px-2.5 py-1.5 text-xs text-[var(--text)] transition hover:text-[var(--text-h)]"
              >
                <Command className="h-3 w-3" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="rounded border border-[var(--border)] px-1 text-[10px]">
                  ⌘K
                </kbd>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="flex items-center gap-2 border border-[var(--border)] px-2.5 py-1.5 text-xs text-[var(--text)] transition hover:text-[var(--text-h)]"
              >
                {theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        </motion.header>

        <section className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px]"
          >
            <div className="flex flex-col p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <SectionLabel>Portfolio / 2026</SectionLabel>
                <div className="flex items-center gap-2 text-sm text-[var(--text)]">
                  <MapPin className="h-4 w-4" />
                  Ohio
                </div>
              </div>

              <div className="grid gap-4 border-b border-[var(--border)] py-4 md:grid-cols-[1fr_auto] md:items-center">
                <div className="text-sm leading-7 text-[var(--text)]">
                  I build high-performance systems and machine learning
                  infrastructure, focusing on optimization, scalability, and
                  real-world deployment. My work spans SIMD-accelerated
                  algorithms, networking systems, and local ML inference
                  pipelines.
                </div>
                <div className="grid grid-cols-3 gap-6 text-xs uppercase tracking-[0.18em] text-[var(--text)]">
                  <div>
                    <div>Focus</div>
                    <div className="mt-2 text-sm font-medium normal-case tracking-normal text-[var(--text-h)]">
                      Optimization
                    </div>
                  </div>
                  <div>
                    <div>Tools</div>
                    <div className="mt-2 text-sm font-medium normal-case tracking-normal text-[var(--text-h)]">
                      C++ / PyTorch / AVX
                    </div>
                  </div>
                  <div>
                    <div>Mode</div>
                    <div className="mt-2 text-sm font-medium normal-case tracking-normal text-[var(--text-h)]">
                      Parallel Programming
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col py-6 sm:py-8">
                <div className="mb-4 flex items-center gap-2 text-sm text-[var(--text)]">
                  <ScanSearch className="h-4 w-4" />
                  Statistical modeling, optimization, & computational systems
                  for actionable decision-making
                </div>
                <BalancedHeadline
                  text={heroText}
                  containerClassName="max-w-[500px]"
                  lineClassName="pb-[0.14em] text-[clamp(2.4rem,3.2vw,4.6rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[var(--text-h)]"
                  trigger="mount"
                />
                <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text)]">
                  I build systems and analytics tools that emphasize
                  performance, clarity, and practical use. My work spans
                  low-level optimization, custom infrastructure, and machine
                  learning applications, from SIMD-accelerated algorithms in C to
                  neural classifiers and data analysis pipelines.
                </p>
              </div>

              <div className="grid gap-4 border-t border-[var(--border)] pt-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px] p-3">
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--text)]">
                    <Sparkle className="h-4 w-4" />
                    Signal / Noise
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--text)]">
                    The best analytics work is fundamentally epistemic work. The
                    goal is to extract insights from data.
                  </p>
                </div>
                <div className="border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px] p-3">
                  <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--text)]">
                    Field Note
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--text)]">
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
            className="grid gap-4"
          >
            <div className="group relative min-h-[280px] overflow-hidden border border-[var(--border)] bg-[var(--code-bg)]">
              <img
                src="/PomereneHall.jpg"
                alt="Analytics workspace"
                loading="eager"
                width={900}
                height={420}
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
                  {["Systems", "Infrastructure", "Machine Learning"].map(
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
              <LiveGithubPanel />
              <div className="border border-[var(--border)] bg-[var(--code-bg)]/70 backdrop-blur-[3px] p-5">
                <SectionLabel>Profile</SectionLabel>
                <p className="mt-4 text-sm leading-7 text-[var(--text)]">
                  Data Analytics student at OSU with strong systems and machine
                  learning experience. Interested in performance,
                  infrastructure, and building tools that bridge low-level
                  efficiency with real-world applications.
                </p>
              </div>
            </div>

            <div className="border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px] p-5">
              <SectionLabel>Contact Links</SectionLabel>
              <div className="mt-5 grid gap-3">
                {[
                  {
                    icon: <GithubIcon className="h-4 w-4" />,
                    label: "GitHub",
                    href: "https://github.com/ra4ster",
                  },
                  {
                    icon: <LinkedinIcon className="h-4 w-4" />,
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)] transition hover:bg-[var(--code-bg)] hover:text-[var(--text-h)]"
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>
                    <MoveRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <br />
              <SectionLabel>Recent Projects</SectionLabel>
              <div className="mt-5 grid gap-3">
                {[
                  {
                    icon: <ScrollText className="h-4 w-4" />,
                    label: "Truth is Conditional",
                    href: "/bingham_TI.pdf",
                  },
                  {
                    icon: <Code className="h-4 w-4" />,
                    label: "Predictive Coding Library",
                    href: "https://github.com/ra4ster/deepity",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)] transition hover:bg-[var(--code-bg)] hover:text-[var(--text-h)]"
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
          <div className="mb-8 grid gap-4 border-b border-[var(--border)] pb-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <SectionLabel>Selected Work</SectionLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--text-h)]">
                Portfolio projects
              </h2>
            </div>
            <div className="max-w-md text-sm leading-7 text-[var(--text)]">
              A selection of projects spanning systems programming, machine
              learning, and algorithm optimization. Each one is built around a
              concrete technical challenge and a measurable outcome.
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
          <div className="border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px] p-5 sm:p-6">
            <SectionLabel>Experience</SectionLabel>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-[var(--text-h)]">
              What I bring to an analytics team.
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-8 text-[var(--text)]">
              I bring a mix of systems-level thinking and analytical reasoning.
              I am comfortable working across abstraction layers, from optimized
              C implementations to machine learning models and data pipelines,
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

          <div className="grid gap-4">
            <div className="overflow-hidden border border-[var(--border)] bg-[var(--code-bg)]/70 backdrop-blur-[3px]">
              <img
                src="/predGraph.png"
                alt="Age/sex comparison"
                loading="lazy"
                width={720}
                height={360}
                className="h-full min-h-[240px] w-full object-cover"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-[1.15fr_0.85fr]">
              <div className="border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px] p-5">
                <SectionLabel>Featured Write-up</SectionLabel>
                <a href="#writing" className="group mt-4 block">
                  <div className="max-w-xl text-[16px] leading-8 text-[var(--text)]">
                    Was there a meaningful difference in survival rates between
                    men/women and between age aboard the Titanic? I fit an
                    interaction model for Logistic Regression in R, and form a
                    confidence interval on the joint contribution of age and
                    sex.
                  </div>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-h)] transition group-hover:gap-3">
                    Read the full case study
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Survival Analysis",
                    "Logistic Regression",
                    "Confidence Intervals",
                    "Hypothesis Rejection",
                  ].map((item) => (
                    <span
                      key={item}
                      className="border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--text)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px] p-5">
                <SectionLabel>Strengths</SectionLabel>
                <div className="mt-4 space-y-4">
                  {[
                    "Problem solving",
                    "Clear reporting",
                    "Team supporting",
                    "Reliable execution",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-[var(--text)]"
                    >
                      <div className="flex h-7 w-7 items-center justify-center border border-[var(--border)] bg-[var(--bg)] text-xs font-medium text-[var(--text-h)]">
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
          className="mt-20 border border-[var(--border)] bg-[var(--social-bg)] p-5 backdrop-blur-[3px] sm:p-6"
        >
          <div className="mb-8 grid gap-4 border-b border-[var(--border)] pb-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <SectionLabel>Approach</SectionLabel>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--text-h)]">
                How I think about analytics work
              </h2>
            </div>

            <div className="max-w-md text-sm leading-7 text-[var(--text)]">
              Clarity before complexity. Analysis grounded in real stakes.
              Growing into roles that demand precision and impact.
            </div>
          </div>

          <div>
            {writingSamples.map((sample, index) => (
              <article
                key={sample.title}
                className="border-t border-[var(--border)] py-8 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-col gap-8 md:flex-row md:items-start">
                  <div className="relative w-full shrink-0 overflow-hidden rounded-lg bg-[var(--code-bg)] shadow-md md:w-64">
                    <img
                      src={sample.image}
                      alt={sample.title}
                      loading="lazy"
                      width={256}
                      height={256}
                      className="h-auto w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <PretextParagraph sample={sample} index={index} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="writing"
          className="mt-20 border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px] p-5 sm:p-6"
        >
          <div className="mb-8 grid gap-4 border-b border-[var(--border)] pb-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <SectionLabel>Writing</SectionLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--text-h)]">
                Case studies, not just links.
              </h2>
            </div>
            <div className="max-w-md text-sm leading-7 text-[var(--text)]">
              Full write-ups embedded on the page, with the original PDF
              available for the complete derivation and diagnostics.
            </div>
          </div>

          <div className="grid gap-10">
            {caseStudies.map((study) => (
              <CaseStudyBlock key={study.id} study={study} />
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mt-20 border border-[var(--border)] bg-[var(--social-bg)] backdrop-blur-[3px] p-5 sm:p-6"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <BalancedHeadline
                text="Open to internships, analytics projects, and teams that care about quality."
                font="600 44px Inter"
                widthFallback={640}
                containerClassName="mt-3 max-w-3xl"
                lineClassName="text-4xl font-semibold tracking-tight text-[var(--text-h)] sm:text-5xl"
                trigger="inView"
              />
              <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[var(--text)]">
                I’m looking for internships and opportunities in software
                engineering, machine learning, or systems work where I can
                contribute to meaningful, technically challenging projects.
              </p>
            </div>
            <div className="flex flex-col items-end gap-6">
              <img
                src="./profile2025.jpg"
                alt="Jack Rose"
                loading="lazy"
                width={160}
                height={160}
                className="h-36 w-36 rounded-full object-cover border border-[var(--border)] shadow-lg"
              />

              <a
                href="mailto:jackrose2335@gmail.com"
                className="inline-flex items-center gap-3 border border-[var(--text-h)] bg-[var(--text-h)] px-5 py-3 text-sm font-medium text-[var(--bg)] transition hover:translate-x-1"
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
            className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm text-[var(--text)] transition hover:bg-[var(--code-bg)] hover:text-[var(--text-h)] hover:-translate-y-1"
          >
            Back to top
            <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
          </a>
        </div>
      </div>
    </>
  );
}
