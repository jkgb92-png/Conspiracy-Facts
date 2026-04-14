import { NextResponse } from "next/server";
import { mockVideos } from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const limit = Number(searchParams.get("limit") ?? 10);

  let videos = [...mockVideos];
  if (status) videos = videos.filter((v) => v.verificationStatus === status);

  return NextResponse.json({
    data: videos.slice(0, limit),
    total: videos.length,
  });
}
