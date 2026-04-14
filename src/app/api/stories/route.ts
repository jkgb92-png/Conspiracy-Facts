import { NextResponse } from "next/server";
import { mockStories } from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const tag = searchParams.get("tag");
  const limit = Number(searchParams.get("limit") ?? 10);

  let stories = [...mockStories];
  if (status) stories = stories.filter((s) => s.verificationStatus === status);
  if (tag) stories = stories.filter((s) => s.tags.includes(tag));

  return NextResponse.json({
    data: stories.slice(0, limit),
    total: stories.length,
  });
}
