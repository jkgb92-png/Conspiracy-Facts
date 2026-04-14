import { mockAuthors, mockReputationHistory, mockStories } from "@/lib/mockData";
import ReputationBadge from "@/components/ReputationBadge";
import StoryCard from "@/components/StoryCard";
import { getBadgeColor, getBadgeLabel, getTruthScoreBarColor } from "@/lib/utils";

const badgeTiers = [
  {
    badge: "newcomer" as const,
    label: "Newcomer",
    range: "0 – 199",
    desc: "Just joined. Build your score by submitting verified content.",
  },
  {
    badge: "contributor" as const,
    label: "Contributor",
    range: "200 – 499",
    desc: "Active community member with a growing track record.",
  },
  {
    badge: "trusted" as const,
    label: "Trusted Member",
    range: "500 – 699",
    desc: "Consistently accurate contributor, trusted by peers.",
  },
  {
    badge: "verified-reporter" as const,
    label: "Verified Reporter",
    range: "700 – 899",
    desc: "High-accuracy reporter whose work withstands rigorous fact-checking.",
  },
  {
    badge: "truth-champion" as const,
    label: "Truth Champion",
    range: "900 – 1000",
    desc: "Elite status. Consistent verified reporting and community leadership.",
  },
];

export default function ProfilePage() {
  const author = mockAuthors[0]; // Featured user
  const authorStories = mockStories.filter((s) => s.author.id === author.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-blue-900 to-teal-700" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-8 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-blue-900 border-4 border-white flex items-center justify-center shadow">
              <span className="text-white text-3xl font-black">{author.name.charAt(0)}</span>
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-blue-900">{author.name}</h1>
                {author.verifiedAuthor && (
                  <span className="text-teal-500 text-lg" title="Verified Author">✓</span>
                )}
              </div>
              <p className="text-slate-500 text-sm">@{author.username}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-6">
            {/* Reputation score */}
            <div className="sm:col-span-1 space-y-3">
              <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
                <div className="text-4xl font-black text-blue-900">{author.reputationScore}</div>
                <div className="text-xs text-slate-500 mt-1">Reputation Score</div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-3 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(author.reputationScore / 1000) * 100}%` }}
                  />
                </div>
                <div className="mt-2">
                  <span
                    className={`text-xs border rounded-full px-2.5 py-0.5 font-medium ${getBadgeColor(
                      author.badge
                    )}`}
                  >
                    {getBadgeLabel(author.badge)}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="sm:col-span-3 grid grid-cols-3 sm:grid-cols-4 gap-4">
              {[
                { label: "Stories Published", value: mockStories.filter((s) => s.author.id === author.id).length },
                { label: "Verified Stories", value: mockStories.filter((s) => s.author.id === author.id && s.verificationStatus === "verified").length },
                { label: "Total Likes", value: mockStories.filter((s) => s.author.id === author.id).reduce((acc, s) => acc + s.likes, 0).toLocaleString() },
                { label: "Avg Truth Score", value: Math.round(mockStories.filter((s) => s.author.id === author.id).reduce((acc, s) => acc + s.truthScore, 0) / Math.max(1, mockStories.filter((s) => s.author.id === author.id).length)) + "%" },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-blue-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reputation history */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-bold text-slate-700">Reputation History</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {mockReputationHistory.map((entry, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">{entry.reason}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{new Date(entry.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`text-sm font-bold ${
                      entry.delta >= 0 ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {entry.delta >= 0 ? "+" : ""}
                    {entry.delta}
                  </div>
                  <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getTruthScoreBarColor(entry.score / 10)}`}
                      style={{ width: `${entry.score / 10}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-blue-900 w-8 text-right">{entry.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top authors leaderboard sidebar */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-bold text-slate-700">Community Leaderboard</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {mockAuthors.map((a, i) => (
              <div key={a.id} className="px-5 py-4 flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    i === 0
                      ? "bg-amber-400 text-amber-900"
                      : i === 1
                      ? "bg-slate-300 text-slate-700"
                      : "bg-orange-200 text-orange-800"
                  }`}
                >
                  {i + 1}
                </span>
                <ReputationBadge author={a} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Published stories */}
      {authorStories.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-6">Published Stories</h2>
          <div className="space-y-6">
            {authorStories.map((story) => (
              <StoryCard key={story.id} story={story} featured />
            ))}
          </div>
        </div>
      )}

      {/* Badge tiers */}
      <div>
        <h2 className="text-xl font-bold text-blue-900 mb-6">Reputation Badge Tiers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {badgeTiers.map((tier) => (
            <div
              key={tier.badge}
              className={`rounded-xl border p-4 space-y-2 ${
                author.badge === tier.badge ? "ring-2 ring-blue-500" : ""
              } bg-white border-slate-200`}
            >
              <span
                className={`text-xs border rounded-full px-2.5 py-0.5 font-medium ${getBadgeColor(
                  tier.badge
                )}`}
              >
                {tier.label}
              </span>
              <p className="text-xs font-bold text-blue-900">{tier.range} pts</p>
              <p className="text-xs text-slate-500 leading-relaxed">{tier.desc}</p>
              {author.badge === tier.badge && (
                <p className="text-xs font-bold text-blue-600">← Your current level</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
