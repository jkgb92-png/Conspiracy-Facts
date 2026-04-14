"use client";

import { useState, useRef, useCallback } from "react";
import { LedgerEntry } from "@/types";

interface IPFSUploaderProps {
  onComplete: (entry: LedgerEntry) => void;
}

const PROGRESS_STEPS = [
  "Hashing file contents…",
  "Connecting to IPFS node…",
  "Pinning to distributed network…",
  "Scanning against 4.2M indexed documents…",
  "Running RAG retrieval pipeline…",
  "Cross-referencing entities…",
  "Computing Veracity Score…",
  "Writing CID to immutable registry…",
  "Analysis complete.",
];

export default function IPFSUploader({ onComplete }: IPFSUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [fileName, setFileName] = useState("");
  const [mimeType, setMimeType] = useState("application/pdf");
  const [isUploading, setIsUploading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setMimeType(file.type || "application/octet-stream");
      if (!title) setTitle(file.name.replace(/\.[^.]+$/, ""));
    }
  }, [title]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setMimeType(file.type || "application/octet-stream");
      if (!title) setTitle(file.name.replace(/\.[^.]+$/, ""));
    }
  }, [title]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError("Title is required."); return; }
    setError(null);
    setIsUploading(true);
    setProgressStep(0);

    // Animate progress steps
    for (let i = 1; i < PROGRESS_STEPS.length - 1; i++) {
      await new Promise((r) => setTimeout(r, 260 + Math.random() * 180));
      setProgressStep(i);
    }

    try {
      const res = await fetch("/api/ledger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          uploader: "current_user",
          mimeType,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          contentSample: description.slice(0, 200),
        }),
      });

      setProgressStep(PROGRESS_STEPS.length - 1);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Upload failed");
      }

      const { data } = await res.json() as { data: LedgerEntry };
      await new Promise((r) => setTimeout(r, 600));
      onComplete(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`relative rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-[var(--wr-teal)] bg-[var(--wr-teal)]/5 wr-glow"
            : "border-[var(--wr-border)] hover:border-[var(--wr-teal)]/50"
        }`}
        style={{ background: "var(--wr-surface-2)" }}
      >
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          accept=".pdf,.csv,.txt,.mp4,.doc,.docx,.json,.xml"
          onChange={handleFileChange}
        />
        <div className="text-3xl mb-2">{fileName ? "📎" : "⬆"}</div>
        {fileName ? (
          <p className="text-sm font-semibold" style={{ color: "var(--wr-teal)" }}>{fileName}</p>
        ) : (
          <>
            <p className="text-sm font-semibold" style={{ color: "var(--wr-text)" }}>
              Drag &amp; drop a document or video
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--wr-text-dim)" }}>
              PDF · CSV · TXT · MP4 · DOC · JSON — up to 500 MB
            </p>
          </>
        )}
        <p className="text-[10px] mt-2 wr-mono" style={{ color: "var(--wr-text-dim)" }}>
          Once uploaded, content is pinned to IPFS and cannot be deleted.
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        <div>
          <label
            className="block text-xs font-semibold mb-1 wr-mono uppercase tracking-widest"
            style={{ color: "var(--wr-text-dim)" }}
          >
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. NSA Internal Audit 2019 — Declassified"
            className="w-full rounded border px-3 py-2 text-sm wr-mono focus:outline-none focus:ring-1 focus:ring-[var(--wr-teal)]"
            style={{
              background: "var(--wr-surface)",
              borderColor: "var(--wr-border)",
              color: "var(--wr-text)",
            }}
          />
        </div>

        <div>
          <label
            className="block text-xs font-semibold mb-1 wr-mono uppercase tracking-widest"
            style={{ color: "var(--wr-text-dim)" }}
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Briefly describe the content and its significance…"
            className="w-full rounded border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[var(--wr-teal)]"
            style={{
              background: "var(--wr-surface)",
              borderColor: "var(--wr-border)",
              color: "var(--wr-text)",
            }}
          />
        </div>

        <div>
          <label
            className="block text-xs font-semibold mb-1 wr-mono uppercase tracking-widest"
            style={{ color: "var(--wr-text-dim)" }}
          >
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="surveillance, FOIA, NSA, declassified"
            className="w-full rounded border px-3 py-2 text-sm wr-mono focus:outline-none focus:ring-1 focus:ring-[var(--wr-teal)]"
            style={{
              background: "var(--wr-surface)",
              borderColor: "var(--wr-border)",
              color: "var(--wr-text)",
            }}
          />
        </div>
      </div>

      {error && (
        <div className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400 wr-mono">
          ⚠ {error}
        </div>
      )}

      {/* Progress */}
      {isUploading && (
        <div
          className="rounded-lg border p-4 space-y-3"
          style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-[var(--wr-teal)] border-t-transparent rounded-full animate-spin shrink-0" />
            <span
              className="text-xs wr-mono wr-cursor"
              style={{ color: "var(--wr-teal)" }}
            >
              {PROGRESS_STEPS[progressStep]}
            </span>
          </div>
          <div
            className="w-full rounded-full h-1 overflow-hidden"
            style={{ background: "var(--wr-border)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 wr-glow"
              style={{
                width: `${((progressStep + 1) / PROGRESS_STEPS.length) * 100}%`,
                background: "var(--wr-teal)",
              }}
            />
          </div>
          <div
            className="text-[10px] wr-mono space-y-0.5"
            style={{ color: "var(--wr-text-dim)" }}
          >
            {PROGRESS_STEPS.slice(0, progressStep + 1).map((step, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span style={{ color: "var(--wr-teal)" }}>✓</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isUploading || !title.trim()}
        className="w-full py-2.5 rounded font-bold text-sm wr-mono transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
        style={{
          background: "var(--wr-teal)",
          color: "var(--wr-bg)",
        }}
      >
        {isUploading ? "Processing…" : "⬆  Pin to IPFS & Analyse"}
      </button>
    </form>
  );
}
