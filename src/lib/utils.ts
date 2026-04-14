import { ReputationBadge, VerificationStatus } from "@/types";

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getVerificationColor(status: VerificationStatus): string {
  switch (status) {
    case "verified":
      return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "disputed":
      return "text-red-600 bg-red-50 border-red-200";
    case "pending":
      return "text-amber-600 bg-amber-50 border-amber-200";
    default:
      return "text-slate-500 bg-slate-50 border-slate-200";
  }
}

export function getVerificationLabel(status: VerificationStatus): string {
  switch (status) {
    case "verified":
      return "Verified";
    case "disputed":
      return "Disputed";
    case "pending":
      return "Pending Review";
    default:
      return "Unverified";
  }
}

export function getVerificationIcon(status: VerificationStatus): string {
  switch (status) {
    case "verified":
      return "✓";
    case "disputed":
      return "✗";
    case "pending":
      return "⏳";
    default:
      return "?";
  }
}

export function getBadgeLabel(badge: ReputationBadge): string {
  switch (badge) {
    case "truth-champion":
      return "Truth Champion";
    case "verified-reporter":
      return "Verified Reporter";
    case "trusted":
      return "Trusted Member";
    case "contributor":
      return "Contributor";
    default:
      return "Newcomer";
  }
}

export function getBadgeColor(badge: ReputationBadge): string {
  switch (badge) {
    case "truth-champion":
      return "text-violet-700 bg-violet-50 border-violet-200";
    case "verified-reporter":
      return "text-blue-700 bg-blue-50 border-blue-200";
    case "trusted":
      return "text-teal-700 bg-teal-50 border-teal-200";
    case "contributor":
      return "text-slate-600 bg-slate-100 border-slate-200";
    default:
      return "text-slate-500 bg-slate-50 border-slate-200";
  }
}

export function getTruthScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
}

export function getTruthScoreBarColor(score: number): string {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
}
