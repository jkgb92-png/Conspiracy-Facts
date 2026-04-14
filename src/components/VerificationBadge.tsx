import { VerificationStatus } from "@/types";
import { getVerificationColor, getVerificationIcon, getVerificationLabel } from "@/lib/utils";

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: "sm" | "md";
}

export default function VerificationBadge({
  status,
  size = "md",
}: VerificationBadgeProps) {
  const colorClass = getVerificationColor(status);
  const sizeClass =
    size === "sm" ? "text-xs px-2 py-0.5 gap-1" : "text-sm px-2.5 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center border rounded-full font-medium ${colorClass} ${sizeClass}`}
    >
      <span>{getVerificationIcon(status)}</span>
      <span>{getVerificationLabel(status)}</span>
    </span>
  );
}
