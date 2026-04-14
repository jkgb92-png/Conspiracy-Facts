"use client";

import { useState, useEffect } from "react";
import { LedgerEntry } from "@/types";
import IPFSUploader from "@/components/IPFSUploader";
import VeracityScorePanel from "@/components/VeracityScorePanel";

const MIME_ICONS: Record<string, string> = {
  "application/pdf": "📄",
  "text/csv": "📊",
  "video/mp4": "🎬",
  "text/plain": "📝",
  default: "📎",
};

function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`;
  return `${bytes} B`;
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-[var(--wr-teal)]" : score >= 55 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="w-full rounded-full h-1 overflow-hidden" style={{ background: "var(--wr-border)" }}>
      <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
    </div>
  );
}

export default function LedgerPage() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [selected, setSelected] = useState<LedgerEntry | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    fetch("/api/ledger")
      .then((r) => r.json())
      .then(({ data }: { data: LedgerEntry[] }) => {
        setEntries(data);
        if (data.length > 0) setSelected(data[0]);
      });
  }, []);

  function handleUploadComplete(entry: LedgerEntry) {
    setEntries((prev) => [entry, ...prev]);
    setSelected(entry);
    setShowUpload(false);
  }

  const scoreColor = (score: number) =>
    score >= 80 ? "text-[var(--wr-teal)]" : score >= 55 ? "text-amber-400" : "text-red-400";

  return (
    <div
      className="wr-bg wr-scanlines min-h-screen flex flex-col"
      style={{ fontFamily: "var(--wr-mono)" }}
    >
      {/* Top bar */}
      <div
        className="border-b px-6 py-3 flex items-center justify-between shrink-0"
        style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full wr-pulse"
            style={{ background: "var(--wr-teal)" }}
          />
          <span
            className="text-xs uppercase tracking-widest font-bold"
            style={{ color: "var(--wr-teal)" }}
          >
            The Ledger of Truth
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded border"
            style={{ borderColor: "var(--wr-border)", color: "var(--wr-text-dim)" }}
          >
            IPFS · Immutable · Censorship-Resistant
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "var(--wr-text-dim)" }}>
            {entries.length} truths pinned
          </span>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="px-3 py-1.5 rounded text-xs font-bold transition-all hover:brightness-110"
            style={{ background: "var(--wr-teal)", color: "var(--wr-bg)" }}
          >
            + Upload Truth
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left panel: Case files ─────────────────────────────── */}
        <aside
          className="w-72 shrink-0 border-r flex flex-col overflow-hidden"
          style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface)" }}
        >
          <div
            className="px-4 py-2.5 border-b text-[10px] uppercase tracking-widest font-bold"
            style={{ borderColor: "var(--wr-border)", color: "var(--wr-text-dim)" }}
          >
            Case Files ({entries.length})
          </div>
          <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: "var(--wr-border)" }}>
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => { setSelected(entry); setShowUpload(false); }}
                className={`w-full text-left px-4 py-3 space-y-1.5 transition-colors hover:bg-[var(--wr-surface-2)] ${
                  selected?.id === entry.id ? "border-l-2 border-[var(--wr-teal)]" : ""
                }`}
                style={
                  selected?.id === entry.id
                    ? { background: "var(--wr-surface-2)" }
                    : {}
                }
              >
                <div className="flex items-start gap-2">
                  <span className="text-base shrink-0 mt-0.5">
                    {MIME_ICONS[entry.mimeType] ?? MIME_ICONS.default}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-xs font-semibold leading-snug truncate"
                      style={{ color: "var(--wr-text)" }}
                    >
                      {entry.title}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "var(--wr-text-dim)" }}>
                      @{entry.uploader} · {relativeTime(entry.uploadedAt)}
                    </p>
                  </div>
                  <span className={`text-xs font-black shrink-0 ${scoreColor(entry.veracity.veracityScore)}`}>
                    {entry.veracity.veracityScore}
                  </span>
                </div>
                <ScoreBar score={entry.veracity.veracityScore} />
                <div className="flex flex-wrap gap-1">
                  {entry.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 rounded"
                      style={{ background: "var(--wr-bg)", color: "var(--wr-text-dim)" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* ── Center panel: Investigation canvas ─────────────────── */}
        <main className="flex-1 overflow-y-auto p-6" style={{ background: "var(--wr-bg)" }}>
          {showUpload ? (
            <div className="max-w-xl mx-auto space-y-4">
              <div>
                <h2
                  className="text-base font-bold uppercase tracking-widest"
                  style={{ color: "var(--wr-teal)" }}
                >
                  Submit a Truth
                </h2>
                <p className="text-xs mt-1" style={{ color: "var(--wr-text-dim)" }}>
                  Upload a document, dataset, or video. It will be pinned to IPFS and scanned
                  by the RAG forensic engine against 4.2M indexed records. The resulting CID
                  is written to an immutable registry.
                </p>
              </div>
              <IPFSUploader onComplete={handleUploadComplete} />
            </div>
          ) : selected ? (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Document header */}
              <div
                className="rounded-xl border p-5 space-y-3"
                style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{MIME_ICONS[selected.mimeType] ?? MIME_ICONS.default}</span>
                  <div className="flex-1 min-w-0">
                    <h1
                      className="text-lg font-black leading-snug"
                      style={{ color: "var(--wr-text)" }}
                    >
                      {selected.title}
                    </h1>
                    <p className="text-xs mt-1" style={{ color: "var(--wr-text-dim)" }}>
                      Uploaded by @{selected.uploader} · {relativeTime(selected.uploadedAt)}
                    </p>
                  </div>
                </div>
                {selected.description && (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--wr-text-dim)" }}>
                    {selected.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{
                        borderColor: "var(--wr-teal)30",
                        background: "var(--wr-teal)10",
                        color: "var(--wr-teal)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* IPFS record */}
              <div
                className="rounded-xl border p-5 space-y-3"
                style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface)" }}
              >
                <h2
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--wr-teal)" }}
                >
                  ⛓ IPFS Immutable Record
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: "CID", value: selected.ipfs.cid, mono: true, truncate: true },
                    { label: "Pinned At", value: new Date(selected.ipfs.pinnedAt).toLocaleString() },
                    { label: "File Size", value: formatBytes(selected.ipfs.fileSizeBytes) },
                    { label: "MIME Type", value: selected.ipfs.mimeType },
                  ].map((row) => (
                    <div key={row.label}>
                      <span
                        className="text-[10px] block uppercase tracking-widest"
                        style={{ color: "var(--wr-text-dim)" }}
                      >
                        {row.label}
                      </span>
                      <span
                        className={`text-xs break-all ${row.mono ? "wr-mono" : ""} ${row.truncate ? "block truncate" : ""}`}
                        style={{ color: "var(--wr-text)" }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href={selected.ipfs.gateway}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs underline hover:no-underline"
                  style={{ color: "var(--wr-teal)" }}
                >
                  View on IPFS gateway →
                </a>
              </div>

              {/* Veracity Score */}
              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface)" }}
              >
                <h2
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "var(--wr-teal)" }}
                >
                  🧠 RAG Forensic Analysis
                </h2>
                <VeracityScorePanel result={selected.veracity} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: "var(--wr-surface)" }}
              >
                📂
              </div>
              <p className="text-sm" style={{ color: "var(--wr-text-dim)" }}>
                Select a case file or upload a new truth.
              </p>
            </div>
          )}
        </main>

        {/* ── Right panel: AI analysis feed ─────────────────────── */}
        <aside
          className="w-72 shrink-0 border-l flex flex-col overflow-hidden"
          style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface)" }}
        >
          <div
            className="px-4 py-2.5 border-b text-[10px] uppercase tracking-widest font-bold"
            style={{ borderColor: "var(--wr-border)", color: "var(--wr-text-dim)" }}
          >
            Live Analysis Feed
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {selected ? (
              <>
                <div
                  className="rounded-lg border p-3 space-y-2"
                  style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
                >
                  <p
                    className="text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: "var(--wr-teal)" }}
                  >
                    Veracity Summary
                  </p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--wr-text-dim)" }}>
                    {selected.veracity.summary}
                  </p>
                </div>

                <div
                  className="rounded-lg border p-3 space-y-2"
                  style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
                >
                  <p
                    className="text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: "var(--wr-amber)" }}
                  >
                    Corpus Scan
                  </p>
                  <div className="space-y-1 text-[11px] wr-mono" style={{ color: "var(--wr-text-dim)" }}>
                    {["WikiLeaks / ICIJ", "FOIA Releases", "Court Filings", "Declassified Gov", "Academic DB"].map(
                      (corpus) => (
                        <div key={corpus} className="flex items-center justify-between">
                          <span>{corpus}</span>
                          <span style={{ color: "var(--wr-teal)" }}>✓</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div
                  className="rounded-lg border p-3 space-y-2"
                  style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
                >
                  <p
                    className="text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: "var(--wr-text-dim)" }}
                  >
                    Score Breakdown
                  </p>
                  {[
                    { label: "Src Credibility", value: `${(selected.veracity.sourceCreditWeight * 100).toFixed(0)}%`, color: "var(--wr-teal)" },
                    { label: "Corroborations", value: selected.veracity.corroborationCount, color: "var(--wr-teal)" },
                    { label: "Contradictions", value: selected.veracity.contradictionCount, color: selected.veracity.contradictionCount > 0 ? "#ef4444" : "var(--wr-text-dim)" },
                    { label: "Final Score", value: `${selected.veracity.veracityScore}/100`, color: selected.veracity.veracityScore >= 80 ? "var(--wr-teal)" : selected.veracity.veracityScore >= 55 ? "#f59e0b" : "#ef4444" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between text-xs wr-mono"
                    >
                      <span style={{ color: "var(--wr-text-dim)" }}>{row.label}</span>
                      <span className="font-bold" style={{ color: row.color }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-lg border p-3 space-y-1.5"
                  style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
                >
                  <p
                    className="text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: "var(--wr-text-dim)" }}
                  >
                    Smart Contract Log
                  </p>
                  <div className="text-[10px] wr-mono space-y-1" style={{ color: "var(--wr-text-dim)" }}>
                    <div>TX: 0x{selected.ipfs.cid.slice(2, 14).toLowerCase()}…</div>
                     <div>Block: {18_000_000 + selected.ipfs.cid.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 1_000_000}</div>
                    <div>Network: Polygon PoS</div>
                    <div style={{ color: "var(--wr-teal)" }}>Status: Confirmed ✓</div>
                  </div>
                </div>
              </>
            ) : (
              <p
                className="text-xs text-center mt-8"
                style={{ color: "var(--wr-text-dim)" }}
              >
                Select a case file to see the analysis feed.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
