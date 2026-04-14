import { mockVideos, mockDeepfakeResult } from "@/lib/mockData";
import VideoCard from "@/components/VideoCard";
import DeepfakeGuardian from "@/components/DeepfakeGuardian";

export default function VideosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-blue-900 mb-2">Video Library</h1>
        <p className="text-slate-500 max-w-2xl">
          Documentary footage, investigative reports, and community-submitted videos. All
          transcripts are auto-generated and processed through Truth Guard AI for
          real-time fact-checking.
        </p>
      </div>

      {/* Upload CTA banner */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-700 rounded-2xl p-6 sm:p-8 text-white mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Upload Your Video</h2>
          <p className="text-blue-200 text-sm">
            Videos are stored securely on AWS S3. Transcripts are auto-generated and
            scanned by Truth Guard AI within minutes.
          </p>
        </div>
        <button className="shrink-0 px-5 py-2.5 bg-teal-400 text-blue-900 font-bold rounded-lg hover:bg-teal-300 transition-colors">
          Upload Video →
        </button>
      </div>

      {/* Upload process info */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          {
            step: "01",
            title: "Upload to S3",
            desc: "Your video is securely stored on AWS S3 with CloudFront CDN for global delivery.",
          },
          {
            step: "02",
            title: "Transcript Generation",
            desc: "Audio is processed via AWS Transcribe to produce an accurate text transcript.",
          },
          {
            step: "03",
            title: "Truth Guard Scan",
            desc: "The LLM API extracts claims from the transcript and cross-references them against verified sources.",
          },
        ].map((step) => (
          <div key={step.step} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-3xl font-black text-slate-200 mb-2">{step.step}</div>
            <h3 className="font-bold text-blue-900 mb-1">{step.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Deepfake Guardian section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-sm">🔬</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-900">Deepfake Guardian</h2>
            <p className="text-sm text-slate-500">
              AI frame-level analysis for any video in the library — powered by FaceForensics++ model.
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {mockVideos.map((video) => (
            <div key={video.id} className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 truncate">{video.title}</p>
              <DeepfakeGuardian
                videoTitle={video.title}
                durationSeconds={video.duration}
                initialResult={video.id === "video-1" ? mockDeepfakeResult : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Video grid */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          All Videos
          <span className="ml-2 text-sm font-normal text-slate-500">({mockVideos.length})</span>
        </h2>
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600">
          <option>Sort: Most Recent</option>
          <option>Sort: Most Viewed</option>
          <option>Sort: Highest Truth Score</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
