import { VeracityResult } from "@/types";

interface VeracityScorePanelProps {
  result: VeracityResult;
}

const corpusLabels: Record<string, string> = {
  wikileaks: "WikiLeaks / ICIJ",
  foia: "FOIA Release",
  court: "Court Filing",
  academic: "Academic",
  government: "Government Record",
  news: "News Archive",
};

const corpusColors: Record<string, string> = {
  wikileaks: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  foia: "text-teal-400 border-teal-400/30 bg-teal-400/10",
  court: "text-violet-400 border-violet-400/30 bg-violet-400/10",
  academic: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  government: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  news: "text-slate-400 border-slate-400/30 bg-slate-400/10",
};

function ScoreRing({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#00e5c0" : score >= 55 ? "#f59e0b" : "#ef4444";

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="rotate-[-90deg]">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="#1e2736" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}

export default function VeracityScorePanel({ result }: VeracityScorePanelProps) {
  const scoreColor =
    result.veracityScore >= 80
      ? "text-[var(--wr-teal)]"
      : result.veracityScore >= 55
      ? "text-amber-400"
      : "text-red-400";

  const statusLabel =
    result.status === "verified"
      ? "VERIFIED"
      : result.status === "disputed"
      ? "DISPUTED"
      : "PENDING REVIEW";

  const statusColor =
    result.status === "verified"
      ? "text-[var(--wr-teal)] border-[var(--wr-teal)]/30 bg-[var(--wr-teal)]/10"
      : result.status === "disputed"
      ? "text-red-400 border-red-400/30 bg-red-400/10"
      : "text-amber-400 border-amber-400/30 bg-amber-400/10";

  return (
    <div className="space-y-4">
      {/* Score overview */}
      <div
        className="rounded-lg border p-4 flex items-center gap-5"
        style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
      >
        <div className="relative shrink-0">
          <ScoreRing score={result.veracityScore} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-xl font-black wr-mono ${scoreColor}`}>
              {result.veracityScore}
            </span>
            <span className="text-[10px] text-slate-500 wr-mono">/100</span>
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs font-bold border rounded-full px-2.5 py-0.5 wr-mono ${statusColor}`}
            >
              {statusLabel}
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--wr-text-dim)" }}>
            {result.summary}
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { label: "Corroborations", value: result.corroborationCount, color: "text-[var(--wr-teal)]" },
              { label: "Contradictions", value: result.contradictionCount, color: result.contradictionCount > 0 ? "text-red-400" : "text-slate-500" },
              { label: "Src Weight", value: `${(result.sourceCreditWeight * 100).toFixed(0)}%`, color: "text-amber-400" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded p-2 text-center"
                style={{ background: "var(--wr-surface)" }}
              >
                <div className={`text-lg font-black wr-mono ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px]" style={{ color: "var(--wr-text-dim)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formula */}
      <div
        className="rounded-lg border px-4 py-2 wr-mono text-xs"
        style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface)" }}
      >
        <span style={{ color: "var(--wr-text-dim)" }}>Score formula: </span>
        <span className="text-[var(--wr-teal)]">src_weight</span>
        <span style={{ color: "var(--wr-text-dim)" }}> × </span>
        <span className="text-[var(--wr-teal)]">corroboration_count</span>
        <span style={{ color: "var(--wr-text-dim)" }}> ÷ </span>
        <span className="text-amber-400">contradiction_penalty</span>
        <span style={{ color: "var(--wr-text-dim)" }}> → normalised 0–100</span>
      </div>

      {/* RAG sources */}
      <div className="space-y-2">
        <h4
          className="text-xs font-bold uppercase tracking-widest wr-mono"
          style={{ color: "var(--wr-text-dim)" }}
        >
          Retrieved Sources ({result.ragSources.length})
        </h4>
        {result.ragSources.map((src) => (
          <div
            key={src.id}
            className="rounded-lg border p-3 space-y-1.5"
            style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
          >
            <div className="flex items-start justify-between gap-2">
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold hover:underline truncate flex-1"
                style={{ color: "var(--wr-text)" }}
              >
                {src.title}
              </a>
              <span
                className={`shrink-0 text-[10px] border rounded-full px-2 py-0.5 wr-mono ${
                  corpusColors[src.corpus] ?? corpusColors.news
                }`}
              >
                {corpusLabels[src.corpus] ?? src.corpus}
              </span>
            </div>
            <p
              className="text-[11px] leading-relaxed italic"
              style={{ color: "var(--wr-text-dim)" }}
            >
              &ldquo;{src.excerpt}&rdquo;
            </p>
            <div className="flex items-center justify-between text-[10px] wr-mono" style={{ color: "var(--wr-text-dim)" }}>
              <span>{new Date(src.publishedAt).getFullYear()}</span>
              <span>Credibility weight: {(src.credibilityWeight * 100).toFixed(0)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
