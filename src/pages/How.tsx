import { useState, useRef } from "react";
import { motion } from "motion/react";
import { RiSendPlaneFill } from "react-icons/ri";
import InterestScoreCard from "../components/InterestScoreCard";
import {
  analyzeJackInterest,
  type InterestResult,
} from "../utils/jackInterest";

const SUGGESTIONS = [
  "Looking for a CUDA engineer for GPU kernel optimization",
  "Researching Bayesian inference and Gibbs sampling",
  "Founding an AI infrastructure startup at high velocity",
  "Let's discuss regional teas and gym training splits",
];

export default function How() {
  const [result, setResult] = useState<InterestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const executeAnalysis = async (message: string) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const res = await analyzeJackInterest(message);
      if (res) {
        setResult(res);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const message =
      (formData.get("message") as string)?.trim() ||
      "Looking for a CUDA engineer to optimize our HPC kernels";

    await executeAnalysis(message);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (inputRef.current) {
      inputRef.current.value = suggestion;
    }
    executeAnalysis(suggestion);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="text-black w-full px-2 sm:px-0 pb-16 sm:pb-0"
    >
      <div className="bg-transparent border-black border-2 p-2 sm:p-3">
        <p className="text-xs font-mono text-zinc-600 mb-2 leading-relaxed">
          Tell me about what you're here for. Using{" "}
          <a
            href="https://systemonemodels.org/guides/what-is-a-system-one-model/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-400"
          >
            System One AI
          </a>
          , I'll tell you if I show interest!
        </p>
        <div className="flex items-stretch mb-2">
          <form onSubmit={handleSubmit} className="flex w-full">
            <input
              ref={inputRef}
              type="text"
              name="message"
              maxLength={200}
              placeholder="e.g. Looking for a CUDA engineer to optimize our HPC kernels..."
              className="bg-black text-xs sm:text-sm text-white outline-none focus:ring-1 focus:ring-zinc-600 w-full p-2.5 sm:p-3 font-mono"
            />
            <button
              type="submit"
              disabled={isLoading}
              aria-label="Evaluate Interest"
              className="group w-12 cursor-pointer flex items-center justify-center hover:bg-black transition-colors"
            >
              <RiSendPlaneFill
                size={24}
                className={`transition-colors ${
                  isLoading
                    ? "text-gray-400 animate-pulse"
                    : "text-black group-hover:text-white"
                }`}
              />
            </button>
          </form>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSuggestionClick(s)}
              className="text-[9px] sm:text-[10px] font-mono border border-zinc-300 text-zinc-600 px-2 py-0.5 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors truncate max-w-full"
            >
              + {s}
            </button>
          ))}
        </div>
        <div className="flex items-stretch">
          <div className="bg-black text-white w-full min-h-[260px] sm:min-h-[300px] p-3 sm:p-5 flex flex-col items-center justify-center">
            {error ? (
              <span className="text-sm font-mono text-rose-400 text-center px-4">
                {error}
              </span>
            ) : result ? (
              <InterestScoreCard result={result} />
            ) : (
              <div className="text-center px-6 py-8">
                <p className="text-sm font-mono text-zinc-400 mb-1">
                  Ready to evaluate alignment.
                </p>
                <p className="text-xs font-mono text-zinc-400">
                  Enter an opportunity, project, or thesis above.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
