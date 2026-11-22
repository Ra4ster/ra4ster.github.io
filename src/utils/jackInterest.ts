export interface PillarData {
  key: "hpc" | "math" | "philosophy" | "culture";
  label: string;
  tagline: string;
  score: number; // 0 - 100
  color: string;
}

export type VerdictTier = "exceptional" | "strong" | "moderate" | "low";

export interface InterestResult {
  score: number; // 0 - 100
  tier: VerdictTier;
  verdict: string;
  summary: string;
  pillars: PillarData[];
  topPillar: string;
  source: "jev" | "local";
}

const PILLAR_CONFIG = [
  {
    key: "hpc" as const,
    label: "High Performance Computing",
    tagline: "Parallel systems, low-level architecture, GPU compute",
    color: "#10B981", // emerald
  },
  {
    key: "math" as const,
    label: "Operations Research & Math",
    tagline: "Statistical learning, mathematical optimization, modeling",
    color: "#06B6D4", // cyan
  },
  {
    key: "philosophy" as const,
    label: "Decision Theory & Logic",
    tagline: "Decision analysis, epistemic systems, human-in-the-loop",
    color: "#8B5CF6", // purple
  },
  {
    key: "culture" as const,
    label: "Work Culture & Interests",
    tagline: "Startup velocity, discipline, personal interests",
    color: "#F59E0B", // amber
  },
];

/**
 * Robust local fallback evaluator tailored to Jack Rose's real profile.
 * Used if the worker is offline, rate-limited, or prior to worker redeployment.
 */
export function evaluateInterestLocally(message: string): InterestResult {
  const text = message.toLowerCase();

  const hpcPatterns = [
    /\b(hpc|cuda|gpu|gpus|kernel|kernels|supercomputer|parallel|distributed|inference|deepity|predictive coding)\b/i,
    /\b(c\+\+|c|cpp|clang|gcc|rust|assembly|low-level|hardware|architecture|memory|coalesc\w*)\b/i,
    /\b(optimi[sz]\w*|accelerat\w*|profil\w*|speed\w*|throughput|latency|bottleneck)\b/i,
    /\b(pipeline|nvidia|tensor|vram|simd|openmp|mpi)\b/i,
  ];

  const mathPatterns = [
    /\b(bayes\w*|gibbs|sampling|prior|posterior|mcmc)\b/i,
    /\b(milp|gurobi|linear programming|integer programming|optimi[sz]\w*|operations research)\b/i,
    /\b(statistic\w*|data analytics|regression|probabilit\w*|stochastic|matrix|linear algebra)\b/i,
    /\b(machine learning|ai|deep learning|data mining|statistical learning|dataset)\b/i,
  ];

  const philosophyPatterns = [
    /\b(philosoph\w*|epistem\w*|logic|deductive|inductive|axiomatic)\b/i,
    /\b(decision theory|expected utility|eut|utility function|rational\w*|decision analysis)\b/i,
    /\b(hilp|human-in-the-loop|alignment|ethics|conditional belief|truth is conditional)\b/i,
  ];

  const culturePatterns = [
    /\b(tea|teas|gyokuro|sencha|matcha|oolong|puerh)\b/i,
    /\b(anime|hell's paradise|manga)\b/i,
    /\b(gym|squat|bench|deadlift|workout|lifting|lift|fitness|pr|training splits?)\b/i,
    /\b(startup|founder|founding|agency|builder|grit|fast-paced|curiosity)\b/i,
  ];

  function scorePatterns(patterns: RegExp[]): number {
    let hits = 0;
    for (const pat of patterns) {
      if (pat.test(text)) {
        hits += 1;
      }
    }
    if (hits === 0) return Math.floor(18 + Math.random() * 8);
    if (hits === 1) return Math.floor(58 + Math.random() * 10);
    if (hits === 2) return Math.floor(76 + Math.random() * 8);
    if (hits === 3) return Math.floor(88 + Math.random() * 6);
    return Math.min(99, 93 + hits * 2);
  }

  const hpcScore = scorePatterns(hpcPatterns);
  const mathScore = scorePatterns(mathPatterns);
  const philScore = scorePatterns(philosophyPatterns);
  const cultScore = scorePatterns(culturePatterns);

  const rawOverall = Math.round(
    hpcScore * 0.45 + mathScore * 0.25 + philScore * 0.15 + cultScore * 0.15
  );
  const score = Math.max(15, Math.min(99, rawOverall));

  const pillars: PillarData[] = [
    { ...PILLAR_CONFIG[0], score: hpcScore },
    { ...PILLAR_CONFIG[1], score: mathScore },
    { ...PILLAR_CONFIG[2], score: philScore },
    { ...PILLAR_CONFIG[3], score: cultScore },
  ];

  const sortedPillars = [...pillars].sort((a, b) => b.score - a.score);
  const topPillar = sortedPillars[0]?.label || "High Performance Computing";
  const topKey = sortedPillars[0]?.key;

  let tier: VerdictTier;
  let verdict: string;
  let summary: string;

  if (score >= 70) {
    tier = "exceptional";
    verdict = "High interest";
    if (topKey === "culture") {
      summary = "Shared alignment in work culture, personal discipline, and shared interests.";
    } else if (topKey === "math") {
      summary = "Strong intersection with operations research, mathematical modeling, and statistical learning.";
    } else if (topKey === "philosophy") {
      summary = "Direct relevance to decision theory, formal logic, and human-in-the-loop systems.";
    } else {
      summary = "Direct overlap with my active work in high performance computing and computational systems.";
    }
  } else if (score >= 50) {
    tier = "strong";
    verdict = "Solid overlap";
    if (topKey === "culture") {
      summary = "Strong resonance with personal interests, high-agency work, and discipline.";
    } else if (topKey === "math") {
      summary = "Tangible overlap with mathematical modeling and operations research.";
    } else if (topKey === "philosophy") {
      summary = "Interesting conceptual overlap in decision theory and logic.";
    } else {
      summary = "Tangible intersection with my systems and computing background.";
    }
  } else if (score >= 30) {
    tier = "moderate";
    verdict = "Partial fit";
    summary = "Interesting proposition, though somewhat adjacent to my primary computational focus.";
  } else {
    tier = "low";
    verdict = "Outside current focus";
    summary = "Currently focused on low-level systems, high performance computing, and mathematical modeling.";
  }

  return {
    score,
    tier,
    verdict,
    summary,
    pillars,
    topPillar,
    source: "local",
  };
}

/**
 * Query the Cloudflare Worker proxy, with graceful fallback to local evaluation.
 */
export async function analyzeJackInterest(message: string): Promise<InterestResult> {
  const trimmed = message.trim();
  if (!trimmed) {
    throw new Error("Please enter a role, research problem, or project idea.");
  }

  const endpoint =
    import.meta.env.VITE_JACK_EMOTION_API ||
    "https://jack-emotion-proxy.jackrose2335.workers.dev/";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmed.slice(0, 250) }),
    });

    if (res.status === 429) {
      const errData = await res.json().catch(() => null);
      throw new Error(errData?.reason || "Rate limit reached. Please wait a moment.");
    }

    if (!res.ok) {
      console.warn("API returned error, using local interest evaluation fallback.");
      return evaluateInterestLocally(trimmed);
    }

    const data = await res.json();

    // If Cloudflare worker returns the interest schema:
    if (typeof data.score === "number" && data.pillars) {
      const pillars: PillarData[] = PILLAR_CONFIG.map((cfg) => ({
        ...cfg,
        score: Math.min(100, Math.max(0, Math.round(data.pillars[cfg.key] ?? 30))),
      }));

      const rawVerdict = (data.verdict || "High interest").replace(/\s*[—–]\s*/g, ": ");
      const rawSummary = (data.summary || "").replace(/\s*[—–]\s*/g, ": ");

      return {
        score: Math.min(100, Math.max(0, Math.round(data.score))),
        tier: data.tier || "strong",
        verdict: rawVerdict,
        summary: rawSummary || "Matches Jack's focus areas.",
        pillars,
        topPillar: data.topPillar || "High Performance Computing",
        source: "jev",
      };
    }

    // If worker returns legacy format, fall back to smart local evaluation:
    return evaluateInterestLocally(trimmed);
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("Rate limit")) {
      throw err;
    }
    console.warn("API request failed, falling back to local interest evaluation:", err);
    return evaluateInterestLocally(trimmed);
  }
}
