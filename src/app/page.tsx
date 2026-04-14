import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import VideoCard from "@/components/VideoCard";
import { mockStories, mockVideos, mockAuthors } from "@/lib/mockData";
import { getBadgeColor, getBadgeLabel } from "@/lib/utils";

const stats = [
  { label: "Verified Stories", value: "12,400+", icon: "📰" },
  { label: "Videos Uploaded", value: "8,900+", icon: "🎥" },
  { label: "Claims Checked", value: "94,200+", icon: "🛡" },
  { label: "Community Members", value: "52,000+", icon: "👥" },
];

const features = [
  {
    icon: "🎥",
    title: "Video Hosting Module",
    description:
      "Upload and share documentary-quality video content. Videos are stored securely on AWS S3 with automatic transcript generation for Truth Guard analysis.",
    href: "/videos",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
  },
  {
    icon: "📰",
    title: "Community Story Feed",
    description:
      "Publish written investigative pieces and real stories. Every submission is peer-reviewed and scanned by Truth Guard AI before appearing in the public feed.",
    href: "/feed",
    color: "bg-teal-50 border-teal-200",
    iconBg: "bg-teal-100",
  },
  {
    icon: "⭐",
    title: "User Reputation System",
    description:
      "Build credibility through verified reporting. Earn badges from Newcomer to Truth Champion. Your reputation score rises with every independently confirmed fact.",
    href: "/profile",
    color: "bg-violet-50 border-violet-200",
    iconBg: "bg-violet-100",
  },
  {
    icon: "🛡",
    title: "Truth Guard AI",
    description:
      "Our built-in LLM-powered fact-checking assistant scans video transcripts and text in real-time, cross-referencing claims with verified academic and journalistic databases.",
    href: "/truth-guard",
    color: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
  },
  {
    icon: "📂",
    title: "The Ledger of Truth",
    description:
      "Upload documents, datasets, and videos to IPFS for immutable, censorship-resistant storage. Every truth is scored by our RAG forensic engine against 4.2M indexed records.",
    href: "/ledger",
    color: "bg-slate-900 border-slate-700",
    iconBg: "bg-slate-800",
    dark: true,
  },
  {
    icon: "🕸",
    title: "Network of Influence",
    description:
      "Interactive D3.js force graph revealing connections between people, organizations, documents, and events — backed by Neo4j graph database with Cypher query API.",
    href: "/network",
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
  },
];

const techStack = [
  { name: "Next.js 16", role: "Frontend & SSR", icon: "▲" },
  { name: "TypeScript", role: "Type Safety", icon: "TS" },
  { name: "Tailwind CSS", role: "UI Styling", icon: "🎨" },
  { name: "AWS S3", role: "Video Storage", icon: "☁" },
  { name: "AWS CloudFront", role: "CDN Delivery", icon: "⚡" },
  { name: "LLM API (OpenAI)", role: "Truth Guard AI", icon: "🤖" },
  { name: "IPFS / Filecoin", role: "Immutable Storage", icon: "⛓" },
  { name: "D3.js + Neo4j", role: "Influence Graph", icon: "🕸" },
  { name: "PostgreSQL + pgvector", role: "RAG Vector Store", icon: "🗄" },
  { name: "FaceForensics++", role: "Deepfake Detection", icon: "🔬" },
  { name: "Polygon / Ethereum", role: "Smart Contract Registry", icon: "📜" },
  { name: "Redis", role: "Caching Layer", icon: "🔴" },
];

export default function Home() {
  const featuredStory = mockStories[0];
  const recentStories = mockStories.slice(1, 4);
  const featuredVideos = mockVideos.slice(0, 3);
  const topAuthors = mockAuthors.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
              <span>🛡</span>
              <span>Every claim verified by Truth Guard AI</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Authentic Stories,
              <span className="text-teal-300"> Verified Truths.</span>
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              ConspiracyFacts is a platform for journalists, researchers, and community members
              to share real stories backed by evidence — and hold every claim accountable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/feed"
                className="px-6 py-3 bg-teal-400 text-blue-900 font-bold rounded-lg hover:bg-teal-300 transition-colors"
              >
                Explore Stories →
              </Link>
              <Link
                href="/truth-guard"
                className="px-6 py-3 bg-white/10 border border-white/30 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
              >
                Try Truth Guard AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-black text-blue-900">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-blue-900 mb-4">Platform Features</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Four pillars that make ConspiracyFacts the most transparent and trustworthy
            storytelling platform on the web.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className={`rounded-xl border p-6 space-y-4 hover:shadow-md transition-shadow ${f.color} group`}
            >
              <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center text-2xl`}>
                {f.icon}
              </div>
              <h3 className={`font-bold group-hover:opacity-80 transition-opacity ${f.dark ? "text-white" : "text-blue-900 group-hover:text-teal-700"}`}>
                {f.title}
              </h3>
              <p className={`text-sm leading-relaxed ${f.dark ? "text-slate-400" : "text-slate-600"}`}>{f.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-blue-900">Featured Story</h2>
          <Link href="/feed" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
            View all stories →
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StoryCard story={featuredStory} featured />
          </div>
          <div className="space-y-4">
            {recentStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-blue-900">Latest Videos</h2>
            <Link href="/videos" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
              View all videos →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* Truth Guard CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-teal-600 to-blue-800 rounded-2xl p-8 sm:p-12 text-white">
          <div className="max-w-2xl">
            <div className="text-4xl mb-4">🛡</div>
            <h2 className="text-3xl font-black mb-4">Meet Truth Guard AI</h2>
            <p className="text-blue-100 leading-relaxed mb-8">
              Our built-in AI fact-checking assistant scans video transcripts and text in
              real-time, extracting individual claims and cross-referencing them against
              peer-reviewed research, government data, and established journalistic sources.
              Get a per-claim confidence score and instant citation links.
            </p>
            <Link
              href="/truth-guard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-teal-50 transition-colors"
            >
              <span>Try Truth Guard</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Contributors */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-blue-900">Top Contributors</h2>
            <Link href="/profile" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
              View leaderboard →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topAuthors.map((author, i) => (
              <div
                key={author.id}
                className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center">
                      <span className="text-white font-bold">{author.name.charAt(0)}</span>
                    </div>
                    <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-amber-900">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{author.name}</div>
                    <div className="text-xs text-slate-500">@{author.username}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs border rounded-full px-2 py-0.5 font-medium ${getBadgeColor(
                      author.badge
                    )}`}
                  >
                    {getBadgeLabel(author.badge)}
                  </span>
                  <span className="text-sm font-bold text-blue-900">{author.reputationScore}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(author.reputationScore / 1000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-blue-900 mb-3">Built on a Modern, Scalable Stack</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Every technology choice is made for reliability, scalability, and the ability
            to serve truth at global scale.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="bg-white border border-slate-200 rounded-xl p-4 text-center space-y-2 hover:border-blue-300 transition-colors"
            >
              <div className="text-2xl font-mono font-bold text-blue-900">{tech.icon}</div>
              <div className="font-semibold text-slate-800 text-sm">{tech.name}</div>
              <div className="text-xs text-slate-500">{tech.role}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
