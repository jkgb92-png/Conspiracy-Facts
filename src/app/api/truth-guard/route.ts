import { NextResponse } from "next/server";
import { mockTruthGuardResult } from "@/lib/mockData";
import { TruthGuardResult, VerificationStatus } from "@/types";

export async function POST(request: Request) {
  const body = await request.json();
  const { content } = body as { content: string };

  if (!content || content.trim().length < 20) {
    return NextResponse.json(
      { error: "Content must be at least 20 characters long." },
      { status: 400 }
    );
  }

  // In production this would call an LLM API (e.g. OpenAI) and cross-reference
  // claims against verified databases (e.g. Snopes, PolitiFact, peer-reviewed
  // literature indices).  For this scaffold we return deterministic mock data
  // with a score derived from content length to demonstrate the API contract.
  const wordCount = content.trim().split(/\s+/).length;
  const scoreVariance = (wordCount % 20) - 10; // -10 to +9
  const overallScore = Math.min(100, Math.max(30, mockTruthGuardResult.overallScore + scoreVariance));

  let status: VerificationStatus = "pending";
  if (overallScore >= 80) status = "verified";
  else if (overallScore < 55) status = "disputed";

  const result: TruthGuardResult = {
    ...mockTruthGuardResult,
    overallScore,
    status,
    analysisDate: new Date().toISOString(),
  };

  // Simulate processing latency
  await new Promise((r) => setTimeout(r, 1200));

  return NextResponse.json({ data: result });
}
