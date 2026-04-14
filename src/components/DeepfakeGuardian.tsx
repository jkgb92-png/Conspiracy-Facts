"use client";

import { useState } from "react";
import { DeepfakeResult } from "@/types";

interface DeepfakeGuardianProps {
  videoTitle?: string;
  durationSeconds?: number;
  initialResult?: DeepfakeResult;
}

const artifactLabels: Record<string, string> = {
  "blending-seam": "Face blending seam",
  "GAN-fingerprint": "GAN fingerprint detected",
  "facial-muscle-anomaly": "Unnatural facial muscle movement",
  "compression-artifact": "Suspicious compression artifacting",
  "minor-compression": "Minor compression anomaly",
};

export default function DeepfakeGuardian({
  videoTitle = "Video",
  durationSeconds = 60,
  initialResult,
}: DeepfakeGuardianProps) {
  const [result, setResult] = useState<DeepfakeResult | null>(initialResult ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runAnalysis() {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/deepfake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoTitle, durationSeconds }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Analysis failed");
      }
      const data = await res.json() as { data: DeepfakeResult };
      setResult(data.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  }

  const probPercent = result ? Math.round(result.manipulationProbability * 100) : 0;
  const barColor =
    probPercent >= 70
      ? "bg-red-500"
      : probPercent >= 40
      ? "bg-amber-500"
      : "bg-emerald-500";
  const textColor =
    probPercent >= 70 ? "text-red-400" : probPercent >= 40 ? "text-amber-400" : "text-emerald-400";

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface)" }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 border-b flex items-center justify-between"
        style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🔬</span>
          <span
            className="text-sm font-bold wr-mono uppercase tracking-widest"
            style={{ color: "var(--wr-teal)" }}
          >
            Deepfake Guardian
          </span>
        </div>
        <span className="text-xs wr-mono" style={{ color: "var(--wr-text-dim)" }}>
          CNN + FaceForensics++ Model
        </span>
      </div>

      <div className="p-5 space-y-4">
        {!result && !isLoading && (
          <div className="space-y-3">
            <p className="text-xs leading-relaxed" style={{ color: "var(--wr-text-dim)" }}>
              AI model inspects extracted frames for compression artifacting, blending seams,
              GAN fingerprints, and unnatural facial muscle movement. Aggregate manipulation
              probability is computed across all analysed frames.
            </p>
            <button
              onClick={runAnalysis}
              className="w-full py-2.5 rounded font-bold text-sm wr-mono transition-all hover:brightness-110"
              style={{ background: "var(--wr-teal)", color: "var(--wr-bg)" }}
            >
              🔬 Run Deepfake Analysis
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center gap-3 py-4">
            <span className="w-8 h-8 border-2 border-[var(--wr-teal)] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs wr-mono" style={{ color: "var(--wr-teal)" }}>
              Extracting frames via FFmpeg… running classifier…
            </p>
          </div>
        )}

        {error && (
          <div className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400 wr-mono">
            ⚠ {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {/* Warning banner */}
            {result.isWarning && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 flex items-start gap-3">
                <span className="text-xl shrink-0">⚠</span>
                <div>
                  <p className="text-sm font-bold text-red-400 wr-mono">
                    AI-Generation Warning
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--wr-text-dim)" }}>
                    High probability of AI manipulation detected. Treat this clip with caution
                    and seek original source verification.
                  </p>
                </div>
              </div>
            )}

            {/* Score */}
            <div
              className="rounded-lg border p-4 space-y-2"
              style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs wr-mono uppercase tracking-widest" style={{ color: "var(--wr-text-dim)" }}>
                  Manipulation Probability
                </span>
                <span className={`text-2xl font-black wr-mono ${textColor}`}>
                  {probPercent}%
                </span>
              </div>
              <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: "var(--wr-border)" }}>
                <div
                  className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                  style={{ width: `${probPercent}%` }}
                />
              </div>
              <div
                className="flex justify-between text-[10px] wr-mono"
                style={{ color: "var(--wr-text-dim)" }}
              >
                <span>0% — Authentic</span>
                <span>{result.frameCount} frames · {result.analyzedFrames.length} analysed</span>
                <span>100% — Synthetic</span>
              </div>
            </div>

            {/* Detected artifacts */}
            {result.detectedArtifacts.length > 0 && (
              <div className="space-y-1.5">
                <p
                  className="text-xs font-semibold wr-mono uppercase tracking-widest"
                  style={{ color: "var(--wr-text-dim)" }}
                >
                  Detected Artifacts
                </p>
                {result.detectedArtifacts.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2 text-xs rounded px-3 py-2 border border-amber-500/20 bg-amber-500/5"
                  >
                    <span className="text-amber-400 shrink-0">▲</span>
                    <span className="text-amber-300 wr-mono">
                      {artifactLabels[a] ?? a}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {result.detectedArtifacts.length === 0 && (
              <div className="flex items-center gap-2 text-xs rounded px-3 py-2 border border-emerald-500/20 bg-emerald-500/5">
                <span className="text-emerald-400 shrink-0">✓</span>
                <span className="text-emerald-300 wr-mono">No artifacting patterns detected</span>
              </div>
            )}

            {/* Frame timeline */}
            <div
              className="rounded-lg border p-3"
              style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
            >
              <p
                className="text-[10px] font-semibold wr-mono uppercase tracking-widest mb-2"
                style={{ color: "var(--wr-text-dim)" }}
              >
                Per-Frame Probability Timeline
              </p>
              <div className="flex items-end gap-0.5 h-10">
                {result.analyzedFrames.map((f) => {
                  const h = Math.max(4, f.manipulationProbability * 40);
                  const col =
                    f.manipulationProbability >= 0.7
                      ? "bg-red-500"
                      : f.manipulationProbability >= 0.4
                      ? "bg-amber-500"
                      : "bg-emerald-500/60";
                  return (
                    <div
                      key={f.frameIndex}
                      title={`${f.timestampSeconds}s — ${Math.round(f.manipulationProbability * 100)}%`}
                      className={`flex-1 rounded-sm ${col} transition-all`}
                      style={{ height: `${h}px` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* C2PA provenance */}
            <div
              className="rounded-lg border p-3 space-y-1"
              style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
            >
              <p
                className="text-[10px] font-semibold wr-mono uppercase tracking-widest"
                style={{ color: "var(--wr-text-dim)" }}
              >
                C2PA Provenance
              </p>
              {result.c2paMetadata.hasProvenance ? (
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 wr-mono">
                    <span>✓</span> {result.c2paMetadata.signedBy}
                  </div>
                  {result.c2paMetadata.captureDevice && (
                    <div className="text-xs wr-mono" style={{ color: "var(--wr-text-dim)" }}>
                      Capture device: {result.c2paMetadata.captureDevice}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-amber-400 wr-mono">
                  <span>⚠</span> No C2PA provenance metadata found
                </div>
              )}
            </div>

            <button
              onClick={runAnalysis}
              className="w-full py-2 rounded text-xs wr-mono border transition-all hover:border-[var(--wr-teal)]/50"
              style={{ borderColor: "var(--wr-border)", color: "var(--wr-text-dim)" }}
            >
              Re-run Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
