import { useState, useEffect } from "react";
import { motion } from "motion/react";

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

export default function Why() {
  const isMobile = useIsMobile();

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="text-black w-full px-2 sm:px-0 pb-12 sm:pb-0"
    >
      <div className="text-center mb-6 border-b border-gray-200 pb-4">
        <p className="text-base sm:text-xl mb-3">
          Great question! I love building things from start to finish. How about
          you see:
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="/Resume_JackRose.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-black hover:bg-black hover:text-white transition-colors"
          >
            View Full PDF ↗
          </a>
          <a
            href="/Resume_JackRose.pdf"
            download="Resume_JackRose.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Download PDF ↓
          </a>
        </div>
      </div>

      {isMobile ? (
        <div className="border border-gray-200 p-5 font-mono text-left bg-zinc-50 rounded shadow-sm space-y-4">
          <div className="border-b border-gray-200 pb-3">
            <h3 className="text-lg font-bold text-black font-sans">
              Jack Rose
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Computational Data Analytics &amp; Philosophy · The Ohio State University
            </p>
          </div>

          <div className="space-y-1 text-xs">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Core Competencies
            </p>
            <p className="text-gray-700 leading-relaxed font-sans">
              High Performance Computing (HPC), CUDA, OpenMP, SIMD (AVX/AVX-512), C/C++, Python, PyTorch, Mathematical Optimization (MILP/Gurobi), Bayesian Inference.
            </p>
          </div>

          <div className="space-y-1 text-xs">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Key Work &amp; Research
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 font-sans text-xs">
              <li>
                <span className="font-semibold text-black">Ohio Supercomputer Center:</span> HPC systems, CUDA kernels, parallel algorithms.
              </li>
              <li>
                <span className="font-semibold text-black">Deepity:</span> Cross-platform HPC predictive coding library for GPUs &amp; CPUs.
              </li>
              <li>
                <span className="font-semibold text-black">Optimal City:</span> Mixed-Integer Linear Programming optimization on 10x10 grids.
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <a
              href="/Resume_JackRose.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 text-center text-xs font-mono font-semibold bg-black text-white hover:bg-zinc-800 transition-colors"
            >
              Open Full 1-Page Resume (PDF) ↗
            </a>
          </div>
        </div>
      ) : (
        <iframe
          src="/Resume_JackRose.pdf#page=1&toolbar=0&navpanes=0"
          title="Resume"
          loading="lazy"
          className="w-full h-[700px] border border-gray-200 rounded"
        />
      )}
    </motion.section>
  );
}
