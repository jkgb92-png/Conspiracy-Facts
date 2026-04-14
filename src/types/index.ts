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
