import { Author } from "@/types";
import { getBadgeColor, getBadgeLabel } from "@/lib/utils";

interface ReputationBadgeProps {
  author: Author;
  showScore?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function ReputationBadge({
  author,
  showScore = true,
  size = "md",
}: ReputationBadgeProps) {
  const avatarSizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-xl",
  };

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div
        className={`rounded-full bg-blue-900 flex items-center justify-center shrink-0 ${avatarSizes[size]}`}
      >
        <span className="text-white font-bold">{author.name.charAt(0)}</span>
      </div>

      {/* Info */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-semibold text-slate-800 truncate ${
              size === "lg" ? "text-lg" : size === "sm" ? "text-sm" : "text-base"
            }`}
          >
            {author.name}
          </span>
          {author.verifiedAuthor && (
            <span className="text-teal-500 shrink-0" title="Verified Author">
              ✓
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`border rounded-full px-2 py-0.5 font-medium text-xs ${getBadgeColor(
              author.badge
            )}`}
          >
            {getBadgeLabel(author.badge)}
          </span>
          {showScore && (
            <span className="text-xs text-slate-500">
              Score: <span className="font-bold text-blue-900">{author.reputationScore}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
