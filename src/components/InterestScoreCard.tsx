import { motion } from "motion/react";
import { Link } from "react-router";
import type { InterestResult } from "../utils/jackInterest";

interface Props {
  result: InterestResult;
}

const TIER_STYLES = {
  exceptional: {
    scoreText: "text-emerald-400",
  },
  strong: {
    scoreText: "text-cyan-400",
  },
  moderate: {
    scoreText: "text-amber-400",
  },
  low: {
    scoreText: "text-zinc-400",
  },
};

export default function InterestScoreCard({ result }: Props) {
  const style = TIER_STYLES[result.tier] || TIER_STYLES.strong;
  const cleanVerdict = (result.verdict || "").replace(/\s*[—–]\s*/g, ": ");
  const sortedPillars = [...(result.pillars || [])].sort(
    (a, b) => b.score - a.score,
  );
  const topKey = sortedPillars[0]?.key;

  let displaySummary = result.summary;
  if (result.score >= 50 && topKey) {
    if (topKey === "culture") {
      displaySummary =
        "Shared alignment in work culture, personal discipline, and shared interests.";
    } else if (topKey === "math") {
      displaySummary =
        "Strong intersection with operations research, mathematical modeling, and statistical learning.";
    } else if (topKey === "philosophy") {
      displaySummary =
        "Direct relevance to decision theory, formal logic, and human-in-the-loop systems.";
    } else if (topKey === "hpc") {
      displaySummary =
        "Direct overlap with my active work in high performance computing and computational systems.";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full text-left"
    >
      <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4 mb-4">
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight mb-1">
            {cleanVerdict}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-xs sm:max-w-sm">
            {displaySummary}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span
            className={`text-3xl font-semibold tracking-tight font-mono ${style.scoreText}`}
          >
            {result.score}%
          </span>
          <span className="text-[10px] uppercase font-mono text-zinc-500 block -mt-1 tracking-wider">
            Match
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-5 border-t border-zinc-800/80 pt-4">
        <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
          Alignment Breakdown
        </p>

        {result.pillars.map((p) => (
          <div key={p.key} className="group">
            <div className="flex justify-between items-baseline text-xs mb-1">
              <span className="text-zinc-200 font-medium">{p.label}</span>
              <span className="font-mono text-zinc-400 text-[11px] tabular-nums">
                {p.score}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.score}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: p.color }}
              />
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5 tracking-tight font-mono">
              {p.tagline}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 pt-3 flex items-center justify-end text-xs font-mono">
        <Link
          to="/where"
          className="inline-flex items-center gap-1 text-zinc-300 hover:text-white transition-colors underline underline-offset-4"
        >
          <span>Connect with Jack</span>
        </Link>
      </div>
    </motion.div>
  );
}
