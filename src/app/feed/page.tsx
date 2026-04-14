import { mockStories } from "@/lib/mockData";
import StoryCard from "@/components/StoryCard";

const filterOptions = [
  { label: "All", value: "" },
  { label: "Verified", value: "verified" },
  { label: "Pending Review", value: "pending" },
  { label: "Disputed", value: "disputed" },
];

const tagOptions = [
  "environment", "labor-rights", "investigative", "media", "technology",
  "research", "government", "accountability", "health", "science", "economics",
];

export default function FeedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-blue-900 mb-2">Community Story Feed</h1>
        <p className="text-slate-500 max-w-2xl">
          Real stories from verified contributors. Every piece is scanned by Truth Guard AI
          before publication. Filter by verification status or topic.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-64 shrink-0 space-y-6">
          {/* Verification filter */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-700 mb-3 text-sm">Verification Status</h3>
            <div className="space-y-2">
              {filterOptions.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="status"
                    value={opt.value}
                    defaultChecked={opt.value === ""}
                    className="accent-teal-600"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-blue-900 transition-colors">
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-700 mb-3 text-sm">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-800 transition-colors font-medium"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="bg-blue-900 rounded-xl p-5 text-white">
            <h3 className="font-bold mb-2">Have a Story?</h3>
            <p className="text-blue-200 text-xs leading-relaxed mb-3">
              Submit your verified story or investigation. Our Truth Guard AI will scan it
              before it reaches the community feed.
            </p>
            <button className="w-full py-2 bg-teal-400 text-blue-900 font-bold text-sm rounded-lg hover:bg-teal-300 transition-colors">
              Submit a Story
            </button>
          </div>
        </aside>

        {/* Story grid */}
        <div className="flex-1 space-y-6">
          {/* Sort bar */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-700">{mockStories.length}</span> stories
            </p>
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600">
              <option>Sort: Most Recent</option>
              <option>Sort: Highest Truth Score</option>
              <option>Sort: Most Liked</option>
            </select>
          </div>

          {mockStories.map((story) => (
            <StoryCard key={story.id} story={story} featured />
          ))}
        </div>
      </div>
    </div>
  );
}
