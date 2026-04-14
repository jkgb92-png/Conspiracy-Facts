import { NextResponse } from "next/server";
import { mockAuthors, mockReputationHistory } from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const author = mockAuthors.find((a) => a.id === id);
    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }
    return NextResponse.json({ data: author, history: mockReputationHistory });
  }

  return NextResponse.json({
    data: mockAuthors.sort((a, b) => b.reputationScore - a.reputationScore),
  });
}
