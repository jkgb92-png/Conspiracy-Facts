import { NextResponse } from "next/server";
import { DeepfakeResult, FrameAnalysis } from "@/types";

// POST /api/deepfake — simulate frame-level deepfake detection
export async function POST(request: Request) {
  const body = await request.json() as { videoTitle?: string; durationSeconds?: number };
  const { videoTitle = "Unknown", durationSeconds = 60 } = body;

  if (durationSeconds <= 0) {
    return NextResponse.json({ error: "Invalid video duration." }, { status: 400 });
  }

  // Simulate processing (FFmpeg frame extraction + CNN classifier)
  await new Promise((r) => setTimeout(r, 1800));

  const fps = 24;
  const totalFrames = Math.min(durationSeconds * fps, 1440); // cap at 60 s for simulation
  const sampleInterval = Math.max(1, Math.floor(totalFrames / 20));

  // Deterministic probability from video title
  const seed = videoTitle.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 100;
  const baseProbability = seed < 30 ? 0.08 : seed < 60 ? 0.22 : seed < 85 ? 0.58 : 0.82;

  const analyzedFrames: FrameAnalysis[] = [];
  for (let i = 0; i < totalFrames; i += sampleInterval) {
    const jitter = (Math.sin(i * 0.3) * 0.12);
    const prob = Math.min(1, Math.max(0, baseProbability + jitter));
    const artifactTypes: string[] = [];
    if (prob > 0.4) artifactTypes.push("blending-seam");
    if (prob > 0.55) artifactTypes.push("GAN-fingerprint");
    if (prob > 0.65) artifactTypes.push("facial-muscle-anomaly");
    if (prob > 0.75) artifactTypes.push("compression-artifact");
    analyzedFrames.push({
      frameIndex: i,
      timestampSeconds: Math.round(i / fps * 10) / 10,
      manipulationProbability: Math.round(prob * 100) / 100,
      artifactTypes,
    });
  }

  const aggregate =
    analyzedFrames.reduce((acc, f) => acc + f.manipulationProbability, 0) / analyzedFrames.length;
  const manipulationProbability = Math.round(aggregate * 100) / 100;
  const isWarning = manipulationProbability > 0.7;

  const detectedArtifacts = [...new Set(analyzedFrames.flatMap((f) => f.artifactTypes))];

  const result: DeepfakeResult = {
    manipulationProbability,
    isWarning,
    frameCount: totalFrames,
    analyzedFrames,
    detectedArtifacts,
    c2paMetadata: {
      hasProvenance: seed < 50,
      signedBy: seed < 50 ? "C2PA v1.3 — Authenticated" : undefined,
      captureDevice: seed < 50 ? "Sony FX3 / Premiere Pro" : undefined,
    },
    analysisDate: new Date().toISOString(),
  };

  return NextResponse.json({ data: result });
}
