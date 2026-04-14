"use client";

import { useState } from "react";
import TruthGuardPanel from "@/components/TruthGuardPanel";
import { TruthGuardResult } from "@/types";

export default function TruthGuardPage() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TruthGuardResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runAnalysis() {
    if (content.trim().length < 20) {
      setError("Please enter at least 20 characters of text to analyse.");
      return;
    }
    setError(null);
    setResult(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/truth-guard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Analysis failed");
      }
      const data = await res.json();
      setResult(data.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 text-sm text-teal-700 font-medium mb-4">
          <span>🛡</span> Truth Guard AI — Powered by LLM + Verified Databases
        </div>
        <h1 className="text-3xl font-black text-blue-900 mb-3">Truth Guard AI</h1>
        <p className="text-slate-500 leading-relaxed max-w-2xl">
          Paste any article text, video transcript, or written claim below.
          Truth Guard will extract individual factual claims, cross-reference them
          against peer-reviewed research, government datasets, and established
          journalistic sources, and return a per-claim confidence score with
          citation links.
        </p>
      </div>

      {/* How it works */}
      <div className="grid sm:grid-cols-4 gap-3">
        {[
          { icon: "📥", step: "1", title: "Paste Content", desc: "Article, transcript, or any text" },
          { icon: "🔍", step: "2", title: "Claim Extraction", desc: "LLM identifies factual assertions" },
          { icon: "📚", step: "3", title: "Database Check", desc: "Claims cross-referenced with verified sources" },
          { icon: "📊", step: "4", title: "Score & Report", desc: "Per-claim confidence scores + citations" },
        ].map((s) => (
          <div key={s.step} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-1">
            <div className="text-xl">{s.icon}</div>
            <div className="text-xs font-bold text-slate-400">Step {s.step}</div>
            <div className="text-sm font-semibold text-blue-900">{s.title}</div>
            <div className="text-xs text-slate-500">{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Input panel */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h2 className="font-semibold text-slate-700">Enter Text for Analysis</h2>
          <span className="text-xs text-slate-400">{content.length} characters</span>
        </div>
        <div className="p-5 space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-52 resize-none rounded-lg border border-slate-200 p-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent leading-relaxed font-mono"
            placeholder="Paste your article, video transcript, or any text you want to fact-check here...

Example: 'Global temperatures have risen by 1.1°C since pre-industrial levels. Arctic ice is melting four times faster than the global average, and scientists predict sea levels could rise by up to 2 meters by 2100.'"
          />
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Minimum 20 characters · Supports articles up to 10,000 words
            </p>
            <button
              onClick={runAnalysis}
              disabled={isLoading || content.trim().length < 20}
              className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white font-medium text-sm rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analysing…
                </>
              ) : (
                <>
                  <span>🛡</span> Run Truth Guard
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <TruthGuardPanel result={result ?? undefined} isLoading={isLoading} />

      {/* Methodology note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span>📋</span> Methodology & Data Sources
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span> IPCC Reports &amp; Scientific Consensus</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span> Peer-reviewed journals (Nature, Science, NEJM)</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span> Government data (CDC, WHO, EPA, NASA, NOAA)</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span> Established fact-checkers (PolitiFact, Snopes)</li>
          </ul>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span> Academic citation databases (PubMed, JSTOR)</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span> Major wire services (AP, Reuters)</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span> International statistical organisations (IMF, World Bank)</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span> Credibility-scored domain whitelist (500+ sources)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
