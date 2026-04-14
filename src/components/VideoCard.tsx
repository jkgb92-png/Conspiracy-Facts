import { Video } from "@/types";
import Link from "next/link";
import Image from "next/image";
import VerificationBadge from "./VerificationBadge";
import {
  formatDuration,
  formatNumber,
  formatRelativeTime,
  getTruthScoreBarColor,
  getTruthScoreColor,
} from "@/lib/utils";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-slate-100">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-blue-900 text-xl ml-1">▶</span>
          </div>
        </div>
        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-mono">
          {formatDuration(video.duration)}
        </span>
        {/* Verification overlay */}
        <div className="absolute top-2 left-2">
          <VerificationBadge status={video.verificationStatus} size="sm" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {video.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-bold text-blue-900 text-base leading-snug line-clamp-2">
          <Link href={`/videos/${video.id}`} className="hover:text-teal-700 transition-colors">
            {video.title}
          </Link>
        </h3>

        {/* Truth score */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Truth Score</span>
            <span className={`font-bold ${getTruthScoreColor(video.truthScore)}`}>
              {video.truthScore}/100
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${getTruthScoreBarColor(video.truthScore)}`}
              style={{ width: `${video.truthScore}%` }}
            />
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {video.author.name.charAt(0)}
              </span>
            </div>
            <span className="text-xs font-medium text-slate-600">{video.author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>👁 {formatNumber(video.views)}</span>
            <span>{formatRelativeTime(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
