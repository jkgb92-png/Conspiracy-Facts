export type VerificationStatus = "verified" | "unverified" | "disputed" | "pending";

export interface Author {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  reputationScore: number;
  badge: ReputationBadge;
  verifiedAuthor: boolean;
}

export type ReputationBadge =
  | "newcomer"
  | "contributor"
  | "trusted"
  | "verified-reporter"
  | "truth-champion";

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishedAt: string;
  tags: string[];
  verificationStatus: VerificationStatus;
  truthScore: number; // 0-100
  likes: number;
  comments: number;
  shares: number;
  imageUrl?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  author: Author;
  publishedAt: string;
  duration: number; // seconds
  thumbnailUrl: string;
  videoUrl: string;
  views: number;
  likes: number;
  verificationStatus: VerificationStatus;
  truthScore: number; // 0-100
  tags: string[];
  transcript?: string;
}

export interface TruthGuardResult {
  overallScore: number; // 0-100
  status: VerificationStatus;
  claims: ClaimAnalysis[];
  sources: Source[];
  summary: string;
  analysisDate: string;
}

export interface ClaimAnalysis {
  id: string;
  claim: string;
  status: VerificationStatus;
  confidence: number; // 0-100
  explanation: string;
  sources: Source[];
}

export interface Source {
  id: string;
  title: string;
  url: string;
  credibilityScore: number; // 0-100
  publishedAt: string;
  domain: string;
}

export interface ReputationHistory {
  date: string;
  score: number;
  reason: string;
  delta: number;
}

// ── Ledger of Truth types ──────────────────────────────────────────────

export interface IPFSRecord {
  cid: string;
  gateway: string;
  pinnedAt: string;
  fileSizeBytes: number;
  mimeType: string;
}

export interface RagSource {
  id: string;
  title: string;
  url: string;
  corpus: "wikileaks" | "foia" | "court" | "academic" | "government" | "news";
  credibilityWeight: number; // 0-1
  excerpt: string;
  publishedAt: string;
}

export interface VeracityResult {
  veracityScore: number; // 0-100
  corroborationCount: number;
  contradictionCount: number;
  sourceCreditWeight: number; // weighted average
  status: VerificationStatus;
  summary: string;
  ragSources: RagSource[];
  analysisDate: string;
  ipfs: IPFSRecord;
}

export interface LedgerEntry {
  id: string;
  title: string;
  description: string;
  uploader: string;
  uploadedAt: string;
  mimeType: string;
  ipfs: IPFSRecord;
  veracity: VeracityResult;
  tags: string[];
}

// ── Deepfake Guardian types ────────────────────────────────────────────

export interface FrameAnalysis {
  frameIndex: number;
  timestampSeconds: number;
  manipulationProbability: number; // 0-1
  artifactTypes: string[];
  thumbnailDataUrl?: string;
}

export interface DeepfakeResult {
  manipulationProbability: number; // 0-1, aggregate
  isWarning: boolean; // true if > 0.7
  frameCount: number;
  analyzedFrames: FrameAnalysis[];
  detectedArtifacts: string[];
  c2paMetadata: {
    hasProvenance: boolean;
    signedBy?: string;
    captureDevice?: string;
  };
  analysisDate: string;
}

// ── Influence Graph types ──────────────────────────────────────────────

export type GraphNodeType =
  | "person"
  | "organization"
  | "document"
  | "event"
  | "location";

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
  description: string;
  verifiedAt?: string;
  corroborationScore: number; // 0-100
  x?: number;
  y?: number;
}

export type GraphEdgeRelation =
  | "funded_by"
  | "mentioned_in"
  | "affiliated_with"
  | "authored"
  | "attended"
  | "located_at"
  | "predecessor_of"
  | "collaborated_with";

export interface GraphEdge {
  id: string;
  source: string; // node id
  target: string; // node id
  relation: GraphEdgeRelation;
  weight: number; // 1-10, used for edge thickness
  verifiedAt?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
