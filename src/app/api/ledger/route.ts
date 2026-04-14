import { NextResponse } from "next/server";
import { LedgerEntry, VeracityResult, IPFSRecord, RagSource, VerificationStatus } from "@/types";
import { mockLedgerEntries } from "@/lib/mockData";

// GET /api/ledger — list all ledger entries
export async function GET() {
  return NextResponse.json({ data: mockLedgerEntries, total: mockLedgerEntries.length });
}

// POST /api/ledger — simulate upload → IPFS pin → RAG veracity scoring
export async function POST(request: Request) {
  const body = await request.json() as {
    title: string;
    description: string;
    uploader: string;
    mimeType: string;
    tags: string[];
    contentSample?: string;
  };

  const { title, description, uploader, mimeType, tags, contentSample = "" } = body;

  if (!title || title.trim().length < 3) {
    return NextResponse.json({ error: "Title must be at least 3 characters." }, { status: 400 });
  }

  // Simulate processing latency (IPFS pin + RAG pipeline)
  await new Promise((r) => setTimeout(r, 2200));

  // --- Simulate IPFS CID generation ---
  const pseudoCid = "Qm" + Math.random().toString(36).slice(2, 46).padEnd(44, "A").toUpperCase();
  const ipfs: IPFSRecord = {
    cid: pseudoCid,
    gateway: `https://ipfs.io/ipfs/${pseudoCid}`,
    pinnedAt: new Date().toISOString(),
    fileSizeBytes: Math.floor(Math.random() * 50_000_000) + 100_000,
    mimeType,
  };

  // --- Simulate RAG retrieval from corpus ---
  const sampleSources: RagSource[] = [
    {
      id: "rag-gen-1",
      title: "FOIA Release — Declassified Intelligence Summary",
      url: "https://www.cia.gov/readingroom/collection/general-cia-records",
      corpus: "foia",
      credibilityWeight: 0.94,
      excerpt: "Relevant classified materials declassified under EO 13526...",
      publishedAt: "2022-03-01T00:00:00Z",
    },
    {
      id: "rag-gen-2",
      title: "Court Filing — United States District Court",
      url: "https://pacer.uscourts.gov",
      corpus: "court",
      credibilityWeight: 0.98,
      excerpt: "Sworn testimony corroborating events described in submitted document...",
      publishedAt: "2023-07-15T00:00:00Z",
    },
    {
      id: "rag-gen-3",
      title: "Wikileaks Diplomatic Cable Reference",
      url: "https://wikileaks.org/plusd",
      corpus: "wikileaks",
      credibilityWeight: 0.85,
      excerpt: "State Department cable #09XXXX references related entities and events...",
      publishedAt: "2009-11-20T00:00:00Z",
    },
  ];

  // Deterministic variance from content sample
  const seed = (contentSample.length + title.length) % 30;
  const corroboration = 4 + (seed % 9);
  const contradictions = seed < 10 ? 0 : seed < 20 ? 1 : 2;
  const creditWeight = 0.78 + (seed % 20) / 100;
  const rawScore =
    creditWeight * 100 * (corroboration / (corroboration + contradictions * 2 + 1));
  const veracityScore = Math.round(Math.min(99, Math.max(30, rawScore)));

  let status: VerificationStatus = "pending";
  if (veracityScore >= 80) status = "verified";
  else if (veracityScore < 50) status = "disputed";

  const veracity: VeracityResult = {
    veracityScore,
    corroborationCount: corroboration,
    contradictionCount: contradictions,
    sourceCreditWeight: Math.round(creditWeight * 100) / 100,
    status,
    summary: `RAG pipeline scanned 4.2M indexed documents. Found ${corroboration} corroborating records across FOIA, court, and public databases.${contradictions > 0 ? ` ${contradictions} contradicting data point(s) detected — manual review recommended.` : " No contradictions detected."} Veracity Score computed as: source credibility × corroboration count ÷ contradiction penalty.`,
    ragSources: sampleSources,
    analysisDate: new Date().toISOString(),
    ipfs,
  };

  const entry: LedgerEntry = {
    id: `ledger-${Date.now()}`,
    title,
    description,
    uploader,
    uploadedAt: new Date().toISOString(),
    mimeType,
    tags,
    ipfs,
    veracity,
  };

  return NextResponse.json({ data: entry });
}
