/**
 * Cloudflare Worker Proxy for Jack's Collaboration & Interest Alignment Evaluator
 * Powered by TypeSafe AI (Jev System 1)
 *
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Rate limiting state in worker memory
const ipRateLimits = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // max 5 calls per minute
const MIN_INTERVAL_MS = 2000; // 2 seconds between clicks

function checkRateLimit(ip) {
  const now = Date.now();

  // Periodically clean stale entries to keep memory bounded
  if (ipRateLimits.size > 2000) {
    for (const [key, val] of ipRateLimits.entries()) {
      if (now - val.lastRequestTime > WINDOW_MS * 2) {
        ipRateLimits.delete(key);
      }
    }
  }

  const entry = ipRateLimits.get(ip);

  if (!entry) {
    ipRateLimits.set(ip, {
      count: 1,
      windowStart: now,
      lastRequestTime: now,
    });
    return { allowed: true };
  }

  // Enforce 2-second burst cooldown
  if (now - entry.lastRequestTime < MIN_INTERVAL_MS) {
    const waitSec = Math.ceil((MIN_INTERVAL_MS - (now - entry.lastRequestTime)) / 1000);
    return {
      allowed: false,
      reason: `Please wait ${waitSec}s between requests.`,
      retryAfter: waitSec,
    };
  }

  // Reset window if 60 seconds passed
  if (now - entry.windowStart > WINDOW_MS) {
    entry.count = 1;
    entry.windowStart = now;
    entry.lastRequestTime = now;
    return { allowed: true };
  }

  // Check 5 req/min threshold
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    const waitSec = Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000);
    return {
      allowed: false,
      reason: `Rate limit reached (max ${MAX_REQUESTS_PER_WINDOW}/min). Please wait ${waitSec}s.`,
      retryAfter: waitSec,
    };
  }

  entry.count += 1;
  entry.lastRequestTime = now;
  return { allowed: true };
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // IP-based Rate Limiting
    const clientIp =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for") ||
      "unknown-ip";

    const rateResult = checkRateLimit(clientIp);
    if (!rateResult.allowed) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          reason: rateResult.reason,
          retryAfter: rateResult.retryAfter,
        }),
        {
          status: 429,
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "application/json",
            "Retry-After": String(rateResult.retryAfter || 5),
          },
        }
      );
    }

    try {
      const body = await request.json();
      const message = (body?.message || "").toString().trim().slice(0, 250);

      if (!message) {
        return new Response(JSON.stringify({ error: "Missing or empty message" }), {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }

      // Persona & rubric context for Jev System 1:
      const statePrompt = `You are evaluating an incoming opportunity, project proposal, or inquiry for Jack Rose's portfolio.
Jack Rose holds a B.S. in Data Analytics from Ohio State with a minor in Philosophy.
His core focus is High Performance Computing (HPC), GPU acceleration (CUDA), parallel computing, and AI/ML systems infrastructure.
He also works extensively in operations research, mathematical optimization, statistical learning, and decision analysis.
In his personal life, he values discipline, high agency, and is aiming for top MSCS grad programs and systems startups.

A visitor submits:
"${message}"

Evaluate how strongly Jack Rose would be interested in this proposition across his key domains.`;

      const jevRes = await fetch("https://api.typesafe.ai/v1/systemone", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.TYPESAFE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "jev-latest",
          state: statePrompt,
          questions: {
            overall_interest: {
              type: "score",
              instructions: "Overall, how interested is Jack Rose in engaging with this opportunity, proposal, or conversation?",
              criteria: ["none", "low", "moderate", "high", "extreme"],
            },
            hpc: {
              type: "score",
              instructions: "How strongly does this align with High Performance Computing (HPC), parallel computing, GPU systems, low-level architecture, or AI infrastructure?",
              criteria: ["none", "low", "moderate", "high", "extreme"],
            },
            math: {
              type: "score",
              instructions: "How strongly does this involve operations research, statistical learning, mathematical optimization, or data analytics?",
              criteria: ["none", "low", "moderate", "high", "extreme"],
            },
            philosophy: {
              type: "score",
              instructions: "How strongly does this involve decision theory, formal logic, epistemic systems, or human-in-the-loop applications?",
              criteria: ["none", "low", "moderate", "high", "extreme"],
            },
            culture: {
              type: "score",
              instructions: "How strongly does this align with startup velocity, technical craft, discipline, or shared personal interests?",
              criteria: ["none", "low", "moderate", "high", "extreme"],
            },
          },
        }),
      });

      if (!jevRes.ok) {
        const errorText = await jevRes.text();
        return new Response(JSON.stringify({ error: "Jev API error", details: errorText }), {
          status: 502,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }

      const jevData = await jevRes.json();
      const answers = jevData?.answers || {};

      const rawOverall = answers.overall_interest?.score ?? 0.5;
      const rawHpc = answers.hpc?.score ?? 0.1;
      const rawMath = answers.math?.score ?? 0.1;
      const rawPhilosophy = answers.philosophy?.score ?? 0.1;
      const rawCulture = answers.culture?.score ?? 0.1;

      // Composite score ensures strong alignment in core domains reflects accurately
      const domainComposite = rawHpc * 0.45 + rawMath * 0.25 + rawPhilosophy * 0.15 + rawCulture * 0.15;
      const maxSpecialty = Math.max(rawHpc, rawMath, rawPhilosophy, rawCulture);
      const effectiveOverall = Math.max(rawOverall, maxSpecialty * 0.85, domainComposite);

      const score = Math.round(Math.max(0.12, Math.min(0.99, effectiveOverall)) * 100);
      const hpcScore = Math.round(Math.max(0, Math.min(1, rawHpc)) * 100);
      const mathScore = Math.round(Math.max(0, Math.min(1, rawMath)) * 100);
      const philScore = Math.round(Math.max(0, Math.min(1, rawPhilosophy)) * 100);
      const cultScore = Math.round(Math.max(0, Math.min(1, rawCulture)) * 100);

      const pillarScores = [
        { key: "hpc", label: "High Performance Computing", score: hpcScore },
        { key: "math", label: "Operations Research & Math", score: mathScore },
        { key: "philosophy", label: "Decision Theory & Logic", score: philScore },
        { key: "culture", label: "Work Culture & Interests", score: cultScore },
      ];
      pillarScores.sort((a, b) => b.score - a.score);
      const topKey = pillarScores[0]?.key;

      let tier;
      let verdict;
      let summary;

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

      const responsePayload = {
        score,
        tier,
        verdict,
        summary,
        pillars: {
          hpc: hpcScore,
          math: mathScore,
          philosophy: philScore,
          culture: cultScore,
        },
        topPillar: pillarScores[0]?.label || "High Performance Computing",
        source: "jev",
      };

      return new Response(JSON.stringify(responsePayload), {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }
  },
};
