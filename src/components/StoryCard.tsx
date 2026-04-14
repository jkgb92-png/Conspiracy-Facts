import { Story } from "@/types";
import Link from "next/link";
import Image from "next/image";
import VerificationBadge from "./VerificationBadge";
import {
  formatNumber,
  formatRelativeTime,
  getBadgeColor,
  getBadgeLabel,
  getTruthScoreBarColor,
  getTruthScoreColor,
} from "@/lib/utils";

interface StoryCardProps {
  story: Story;
  featured?: boolean;
}

export default function StoryCard({ story, featured = false }: StoryCardProps) {
  return (
    <article
      className={`bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow ${
        featured ? "md:flex" : ""
      }`}
    >
      {/* Thumbnail */}
      {story.imageUrl && (
        <div className={`relative ${featured ? "md:w-72 md:shrink-0" : "h-48"}`}>
          <Image
            src={story.imageUrl}
            alt={story.title}
            fill
            className="object-cover"
            sizes={featured ? "288px" : "100vw"}
          />
          <div className="absolute top-3 left-3">
            <VerificationBadge status={story.verificationStatus} size="sm" />
          </div>
        </div>
      )}

      <div className="p-5 flex flex-col gap-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {story.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className={`font-bold text-blue-900 leading-snug ${featured ? "text-xl" : "text-lg"}`}>
          <Link href={`/feed/${story.id}`} className="hover:text-teal-700 transition-colors">
            {story.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{story.excerpt}</p>

        {/* Truth Score Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Truth Score</span>
            <span className={`font-bold ${getTruthScoreColor(story.truthScore)}`}>
              {story.truthScore}/100
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${getTruthScoreBarColor(story.truthScore)} transition-all`}
              style={{ width: `${story.truthScore}%` }}
            />
          </div>
        </div>

        {/* Author + Meta */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {story.author.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-700">{story.author.name}</div>
              <span
                className={`text-xs border rounded-full px-1.5 py-0.5 font-medium ${getBadgeColor(
                  story.author.badge
                )}`}
              >
                {getBadgeLabel(story.author.badge)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{formatRelativeTime(story.publishedAt)}</span>
            <span>♥ {formatNumber(story.likes)}</span>
            <span>💬 {formatNumber(story.comments)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
