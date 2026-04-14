import { Story, Video, Author, TruthGuardResult, ReputationHistory } from "@/types";

export const mockAuthors: Author[] = [
  {
    id: "author-1",
    name: "Sarah Chen",
    username: "schen_reports",
    reputationScore: 940,
    badge: "truth-champion",
    verifiedAuthor: true,
  },
  {
    id: "author-2",
    name: "Marcus Rivera",
    username: "mrivera_truth",
    reputationScore: 780,
    badge: "verified-reporter",
    verifiedAuthor: true,
  },
  {
    id: "author-3",
    name: "Aisha Patel",
    username: "aisha_facts",
    reputationScore: 615,
    badge: "trusted",
    verifiedAuthor: false,
  },
  {
    id: "author-4",
    name: "James Holloway",
    username: "jholloway",
    reputationScore: 320,
    badge: "contributor",
    verifiedAuthor: false,
  },
];

export const mockStories: Story[] = [
  {
    id: "story-1",
    title: "The Hidden Cost of Fast Fashion: A Three-Year Investigation",
    excerpt:
      "After years of investigative reporting across twelve countries, the data reveals a systemic pattern of labor violations and environmental damage that leading brands have actively concealed.",
    content: "Full story content would go here...",
    author: mockAuthors[0],
    publishedAt: "2026-04-12T09:30:00Z",
    tags: ["environment", "labor-rights", "investigative"],
    verificationStatus: "verified",
    truthScore: 96,
    likes: 4821,
    comments: 342,
    shares: 1203,
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800",
  },
  {
    id: "story-2",
    title: "How Misinformation Spreads: Mapping the Digital Ecosystem",
    excerpt:
      "A data-driven analysis of 50,000 social media posts reveals the precise mechanisms by which false narratives achieve viral spread — and what actually stops them.",
    content: "Full story content would go here...",
    author: mockAuthors[1],
    publishedAt: "2026-04-11T14:15:00Z",
    tags: ["media", "technology", "research"],
    verificationStatus: "verified",
    truthScore: 91,
    likes: 3107,
    comments: 218,
    shares: 876,
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
  },
  {
    id: "story-3",
    title: "Local Officials Diverted Relief Funds, Documents Show",
    excerpt:
      "Internal audit documents obtained under the Freedom of Information Act reveal that over $2.4 million in disaster relief funds were redirected over a five-year period.",
    content: "Full story content would go here...",
    author: mockAuthors[2],
    publishedAt: "2026-04-10T11:00:00Z",
    tags: ["government", "accountability", "local-news"],
    verificationStatus: "pending",
    truthScore: 74,
    likes: 2540,
    comments: 481,
    shares: 990,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
  },
  {
    id: "story-4",
    title: "New Study Links Air Quality to Childhood Cognition — But the Data Is Mixed",
    excerpt:
      "A peer-reviewed study in the New England Journal of Medicine presents compelling correlations, but several independent researchers flag methodological concerns that may limit its conclusions.",
    content: "Full story content would go here...",
    author: mockAuthors[3],
    publishedAt: "2026-04-09T16:45:00Z",
    tags: ["health", "science", "environment"],
    verificationStatus: "disputed",
    truthScore: 52,
    likes: 1890,
    comments: 703,
    shares: 445,
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543559059ced?w=800",
  },
];

export const mockVideos: Video[] = [
  {
    id: "video-1",
    title: "Inside the Whistleblower Network: Full Documentary",
    description:
      "A documentary examining the global network of whistleblowers who risk everything to expose institutional corruption — featuring exclusive interviews and verified documentation.",
    author: mockAuthors[0],
    publishedAt: "2026-04-13T08:00:00Z",
    duration: 4320,
    thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
    videoUrl: "#",
    views: 82340,
    likes: 9120,
    verificationStatus: "verified",
    truthScore: 94,
    tags: ["documentary", "whistleblowers", "accountability"],
    transcript: "Transcript content for truth-guard analysis...",
  },
  {
    id: "video-2",
    title: "Live Town Hall: Water Contamination Crisis Q&A",
    description:
      "Community members and environmental scientists discuss the verified findings of the recent groundwater study, with direct responses to common questions and concerns.",
    author: mockAuthors[1],
    publishedAt: "2026-04-11T19:00:00Z",
    duration: 2760,
    thumbnailUrl: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800",
    videoUrl: "#",
    views: 34510,
    likes: 4230,
    verificationStatus: "verified",
    truthScore: 89,
    tags: ["environment", "community", "health"],
    transcript: "Transcript content for truth-guard analysis...",
  },
  {
    id: "video-3",
    title: "Decoded: The Paper Trail Behind the Housing Crisis",
    description:
      "Financial analyst breaks down 15 years of publicly available records to show exactly how speculative investment patterns drove up housing costs in 30 major cities.",
    author: mockAuthors[2],
    publishedAt: "2026-04-09T12:30:00Z",
    duration: 1980,
    thumbnailUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800",
    videoUrl: "#",
    views: 56720,
    likes: 7840,
    verificationStatus: "pending",
    truthScore: 71,
    tags: ["economics", "housing", "analysis"],
    transcript: "Transcript content for truth-guard analysis...",
  },
];

export const mockTruthGuardResult: TruthGuardResult = {
  overallScore: 87,
  status: "verified",
  summary:
    "This content contains 5 identified factual claims. 4 have been verified against authoritative sources with high confidence. 1 claim requires additional corroboration from primary sources. No demonstrably false statements were detected.",
  analysisDate: new Date().toISOString(),
  claims: [
    {
      id: "claim-1",
      claim: "Global temperatures have risen by 1.1°C since pre-industrial levels.",
      status: "verified",
      confidence: 99,
      explanation:
        "This figure is consistent with the IPCC Sixth Assessment Report (2021) and is corroborated by NASA, NOAA, and the UK Met Office.",
      sources: [
        {
          id: "src-1",
          title: "IPCC Sixth Assessment Report",
          url: "https://www.ipcc.ch/report/ar6/wg1/",
          credibilityScore: 99,
          publishedAt: "2021-08-09T00:00:00Z",
          domain: "ipcc.ch",
        },
      ],
    },
    {
      id: "claim-2",
      claim: "Carbon emissions dropped by 7% in 2020 due to pandemic lockdowns.",
      status: "verified",
      confidence: 94,
      explanation:
        "Multiple peer-reviewed studies confirm an approximate 6.4–7% drop in CO₂ emissions in 2020, consistent with the claim.",
      sources: [
        {
          id: "src-2",
          title: "Global Carbon Budget 2020 – Nature Climate Change",
          url: "https://www.nature.com/articles/s41558-020-00985-5",
          credibilityScore: 97,
          publishedAt: "2020-12-11T00:00:00Z",
          domain: "nature.com",
        },
      ],
    },
    {
      id: "claim-3",
      claim: "The Arctic is warming four times faster than the global average.",
      status: "verified",
      confidence: 91,
      explanation:
        "Peer-reviewed research published in Communications Earth & Environment (2022) documents Arctic amplification at approximately 3.8–4× the global rate.",
      sources: [
        {
          id: "src-3",
          title: "Arctic amplification is the main driver – Communications Earth & Environment",
          url: "https://www.nature.com/articles/s43247-022-00498-3",
          credibilityScore: 96,
          publishedAt: "2022-08-11T00:00:00Z",
          domain: "nature.com",
        },
      ],
    },
    {
      id: "claim-4",
      claim: "Renewables provided 30% of global electricity in 2023.",
      status: "verified",
      confidence: 88,
      explanation:
        "IEA data confirms that renewables accounted for approximately 30% of global electricity generation in 2023.",
      sources: [
        {
          id: "src-4",
          title: "IEA Renewables 2023",
          url: "https://www.iea.org/reports/renewables-2023",
          credibilityScore: 97,
          publishedAt: "2023-01-01T00:00:00Z",
          domain: "iea.org",
        },
      ],
    },
    {
      id: "claim-5",
      claim: "Methane is 80 times more potent than CO₂ over a 20-year period.",
      status: "pending",
      confidence: 62,
      explanation:
        "Current IPCC figures cite a 20-year global warming potential (GWP20) of approximately 82.5 for methane. The '80×' figure is a commonly used approximation; additional primary source citation would strengthen this claim.",
      sources: [
        {
          id: "src-5",
          title: "IPCC AR6 – Physical Science Basis, Chapter 7",
          url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-7/",
          credibilityScore: 99,
          publishedAt: "2021-08-09T00:00:00Z",
          domain: "ipcc.ch",
        },
      ],
    },
  ],
  sources: [],
};

export const mockReputationHistory: ReputationHistory[] = [
  { date: "2026-04-10", score: 920, reason: "Story verified by Truth Guard", delta: 20 },
  { date: "2026-04-05", score: 900, reason: "Published verified investigative piece", delta: 30 },
  { date: "2026-03-28", score: 870, reason: "Community upvotes milestone reached", delta: 15 },
  { date: "2026-03-15", score: 855, reason: "Source accuracy confirmed by peer review", delta: 25 },
  { date: "2026-03-01", score: 830, reason: "Disputed claim retracted and corrected", delta: -20 },
  { date: "2026-02-20", score: 850, reason: "Published verified investigative piece", delta: 30 },
];
