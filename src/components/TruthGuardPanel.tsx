"use client";

import { useState } from "react";
import { TruthGuardResult, ClaimAnalysis } from "@/types";
import { getVerificationColor, getVerificationLabel, getVerificationIcon } from "@/lib/utils";

interface TruthGuardPanelProps {
  result?: TruthGuardResult;
  isLoading?: boolean;
}

function ClaimRow({ claim }: { claim: ClaimAnalysis }) {
  const [expanded, setExpanded] = useState(false);
  const color = getVerificationColor(claim.status);

  return (
    <div className={`rounded-lg border p-4 space-y-2 ${color}`}>
      <button
        className="w-full text-left flex items-start justify-between gap-3 group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-2">
          <span className="mt-0.5 font-bold text-lg">{getVerificationIcon(claim.status)}</span>
          <p className="text-sm font-medium leading-snug">{claim.claim}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold">{claim.confidence}%</span>
          <span className="text-xs opacity-60">{expanded ? "▲" : "▼"}</span>
        </div>
      </button>

      {expanded && (
        <div className="pl-7 space-y-2">
          <p className="text-xs leading-relaxed opacity-80">{claim.explanation}</p>
          {claim.sources.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-semibold opacity-70">Sources:</p>
              {claim.sources.map((src) => (
                <a
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs underline opacity-70 hover:opacity-100 truncate"
                >
                  {src.title} — {src.domain} (Credibility: {src.credibilityScore}/100)
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TruthGuardPanel({ result, isLoading = false }: TruthGuardPanelProps) {
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-semibold text-blue-900">Truth Guard is analysing…</p>
        <p className="text-sm text-slate-500">
          Cross-referencing claims with verified databases. This may take a few seconds.
        </p>
      </div>
    );
  }

  if (!result) return null;

  const scoreColor =
    result.overallScore >= 80
      ? "text-emerald-600"
      : result.overallScore >= 60
      ? "text-amber-600"
      : "text-red-600";

  const barColor =
    result.overallScore >= 80
      ? "bg-emerald-500"
      : result.overallScore >= 60
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-blue-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛡</span>
          <div>
            <h3 className="font-bold text-white text-lg">Truth Guard Analysis</h3>
            <p className="text-blue-200 text-xs">
              Powered by AI · {new Date(result.analysisDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-black ${scoreColor.replace("text-", "text-")} text-white`}>
            <span className={scoreColor.replace("600", "300").replace("text-", "text-")}>{result.overallScore}</span>
            <span className="text-blue-300 text-lg font-normal">/100</span>
          </div>
          <span
            className={`text-xs font-medium border rounded-full px-2 py-0.5 ${getVerificationColor(
              result.status
            )}`}
          >
            {getVerificationLabel(result.status)}
          </span>
        </div>
      </div>

      {/* Score bar */}
      <div className="w-full bg-slate-200 h-2">
        <div
          className={`h-full ${barColor} transition-all duration-700`}
          style={{ width: `${result.overallScore}%` }}
        />
      </div>

      {/* Summary */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
        <p className="text-sm text-slate-600 leading-relaxed">{result.summary}</p>
      </div>

      {/* Claims */}
      <div className="px-6 py-5 space-y-3">
        <h4 className="font-semibold text-slate-700 text-sm">
          Identified Claims ({result.claims.length})
        </h4>
        {result.claims.map((claim) => (
          <ClaimRow key={claim.id} claim={claim} />
        ))}
      </div>
    </div>
  );
}
