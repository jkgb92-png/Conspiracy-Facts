import { Story, Video, Author, TruthGuardResult, ReputationHistory, LedgerEntry, GraphData, DeepfakeResult } from "@/types";

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
    content:
      "The global fast fashion industry generates approximately 92 million tonnes of textile waste each year — the equivalent of one garbage truck of clothes incinerated or landfilled every second, according to the Ellen MacArthur Foundation. The United Nations Environment Programme (UNEP) estimates the fashion sector is responsible for 8–10% of global carbon emissions, more than the combined output of all international aviation and maritime shipping.\n\nA three-year investigation spanning twelve garment-producing countries documented systemic supply chain violations at factories linked to major apparel brands. Workers in Bangladesh's garment sector — the world's second-largest apparel exporter — earned minimum wages of approximately $113 per month as of 2023. The International Labour Organization has repeatedly cited inadequate enforcement of existing labor protections. Brands including H&M, Zara, and Shein have faced documented criticism from the Clean Clothes Campaign for supply chain opacity and resistance to binding wage agreements.\n\nThe industry is also the second-largest consumer of water globally, using an estimated 79 trillion litres annually (World Bank). A single pair of jeans requires roughly 10,000 litres of water to produce, from cotton cultivation through dyeing and finishing. The Aral Sea — once the world's fourth-largest lake — has largely disappeared due in part to cotton irrigation diversion, a loss documented by NASA satellite imagery across six decades.",
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
    content:
      "A landmark peer-reviewed study published in Science (March 9, 2018) by Vosoughi, Roy, and Aral at MIT analyzed 126,000 verified news stories tweeted by approximately 3 million people over an 11-year period (2006–2017). The study found that false news spreads significantly farther, faster, deeper, and more broadly than true news across all categories of information examined.\n\nFalse stories were 70% more likely to be retweeted than accurate ones, and reached an audience of 1,500 people approximately six times faster. The researchers found this effect was driven primarily by human behavior rather than automated bots — users were more likely to share novel or emotionally provocative content regardless of its accuracy. False political news showed the most pronounced differences in virality compared to true political content. Novelty was identified as the primary driver: false claims were perceived as more novel and inspired greater replies expressing surprise and disgust.\n\nSeparate research from the Reuters Institute Digital News Report (2023) found that algorithmic amplification on social platforms systematically exacerbates these dynamics. Platforms including Meta, X (formerly Twitter), and YouTube have each introduced content-labeling interventions since 2020. However, independent audits by the Mozilla Foundation and the Center for Countering Digital Hate have documented inconsistent enforcement and significant variance in how labels are applied across political topics.",
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
    content:
      "Internal audit documents obtained under the Freedom of Information Act have identified financial irregularities in the distribution of Community Development Block Grant – Disaster Recovery (CDBG-DR) funds across several municipal jurisdictions. The documents indicate portions of federally designated disaster relief allocations were directed toward expenditures not qualifying under program guidelines.\n\nThe CDBG-DR program, administered by the U.S. Department of Housing and Urban Development, has been the subject of sustained Inspector General scrutiny. A HUD OIG report published in 2020 identified $1.9 billion in questioned costs across multiple state-administered programs covering the period 2012–2019. The Government Accountability Office has issued repeated findings citing systemic weaknesses in HUD's grantee oversight mechanisms, including inadequate documentation standards and insufficient field audits.\n\nIndependent verification of the specific documents and their attribution to named local officials is ongoing. The story's pending status reflects that while program-level findings are corroborated by published government records, specific allegations concerning named parties require primary source confirmation and the opportunity for named officials to respond. Readers are advised to treat specific attribution claims as unconfirmed pending this process.",
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
    content:
      "A peer-reviewed study published in The Lancet Planetary Health (2020) estimated that approximately 7 million people die each year from air pollution — surpassing deaths attributable to HIV/AIDS, tuberculosis, and malaria combined. A growing body of research now links long-term exposure to fine particulate matter (PM2.5) and nitrogen dioxide (NO₂) to measurable impairments in cognitive function, particularly in children and older adults.\n\nA Harvard T.H. Chan School of Public Health study published in JAMA Internal Medicine (2020) analyzed medical data from 13.1 million Medicare recipients and found that long-term exposure to PM2.5 concentrations below the existing EPA standard was still significantly associated with increased risk of Alzheimer's disease and related dementias. A separate meta-analysis in PLOS Medicine (2021) reviewing 18 longitudinal cohort studies found broadly consistent associations between urban air pollution and accelerated cognitive decline across age groups.\n\nSeveral independent researchers have noted important methodological limitations in drawing causal conclusions from these datasets. Confounding factors — including socioeconomic status, educational attainment, residential segregation, and comorbid health conditions — are difficult to fully control for in large observational studies. The study cited in this article presents correlational data with appropriate caveats, and the peer review process identified concerns about geographic generalizability that subsequent publications have only partially addressed.",
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
    title: "United States of Secrets, Part One (full documentary) | FRONTLINE",
    description:
      "PBS FRONTLINE's award-winning two-part investigation into the NSA's secret surveillance program — how it was built, how it works, and what it means for American democracy. Features extensive interviews with whistleblowers, former intelligence officials, journalists, and legal experts. Originally broadcast May 13, 2014.",
    author: mockAuthors[0],
    publishedAt: "2021-09-09T08:00:00Z",
    duration: 6798,
    thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
    videoUrl: "https://www.youtube.com/watch?v=kaUemcqIQ-k",
    views: 10412780,
    likes: 89400,
    verificationStatus: "verified",
    truthScore: 97,
    tags: ["surveillance", "NSA", "whistleblowers", "accountability"],
    transcript:
      "The National Security Agency's bulk telephone metadata collection program, authorized under Section 215 of the USA PATRIOT Act, collected call records of hundreds of millions of Americans with no requirement of individual suspicion. A classified FISA Court order first revealed by The Guardian in June 2013 confirmed the program's scope. The Privacy and Civil Liberties Oversight Board concluded in its 2014 report that the Section 215 program has provided only minimal unique value in terrorist investigations and that the bulk collection of phone records should end. In 2015, the Second Circuit Court of Appeals ruled the program exceeded the scope of what Congress authorized under Section 215.",
  },
  {
    id: "video-2",
    title: "Flint's Deadly Water (full documentary) | FRONTLINE",
    description:
      "PBS FRONTLINE's investigation into Flint, Michigan's water contamination crisis — tracing how a cost-cutting decision led to lead-poisoned water and a deadly outbreak of Legionnaires' disease, and why officials failed to act. Originally broadcast November 26, 2019.",
    author: mockAuthors[1],
    publishedAt: "2021-11-09T19:00:00Z",
    duration: 3240,
    thumbnailUrl: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800",
    videoUrl: "https://www.youtube.com/watch?v=6oVEBCtJgeA",
    views: 2180000,
    likes: 28700,
    verificationStatus: "verified",
    truthScore: 96,
    tags: ["environment", "public-health", "accountability", "Flint"],
    transcript:
      "In April 2014, Flint, Michigan switched its water source from Detroit's system to the Flint River as a cost-saving measure. State officials failed to apply corrosion control treatments required under the EPA's Lead and Copper Rule, causing lead to leach from aging pipes into tap water. The Virginia Tech research team led by Dr. Marc Edwards confirmed elevated lead levels in September 2015. The Michigan Department of Environmental Quality initially dismissed the findings. A simultaneous outbreak of Legionnaires' disease — linked by investigators to the water source switch — killed at least 12 people and sickened 90. Governor Rick Snyder declared a state of emergency in January 2016. Federal charges were filed against state and local officials between 2016 and 2021.",
  },
  {
    id: "video-3",
    title: "A Decent Home | Full Documentary | Affordable Housing | America ReFramed",
    description:
      "An Emmy-nominated documentary following residents of mobile home parks across America as private equity firms acquire their communities and raise rents beyond what families can afford. Examines the forces reshaping affordable housing and the growing role of institutional investors in manufactured housing. From the America ReFramed series on PBS.",
    author: mockAuthors[2],
    publishedAt: "2022-03-15T12:30:00Z",
    duration: 5144,
    thumbnailUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800",
    videoUrl: "https://www.youtube.com/watch?v=T77cjVwZtyc",
    views: 420000,
    likes: 7100,
    verificationStatus: "verified",
    truthScore: 93,
    tags: ["housing", "economics", "inequality", "documentary"],
    transcript:
      "The United States has approximately 43,000 manufactured housing communities housing an estimated 22 million people, making it the nation's largest source of unsubsidized affordable housing. Since 2015, private equity firms and real estate investment trusts have accelerated acquisition of these communities. Residents own their homes but rent the land, creating a structural vulnerability: lot rent increases can render homes unsellable in place and too expensive to move. The median lot rent in investor-owned parks rose 25–30% between 2018 and 2022 according to data compiled by Manufactured Housing Action. Residents in several documented communities faced eviction after being unable to meet rent increases exceeding 100% in under two years.",
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

// ── Ledger of Truth mock data ─────────────────────────────────────────

export const mockLedgerEntries: LedgerEntry[] = [
  {
    id: "ledger-1",
    title: "NSA Bulk Collection Program — Internal Audit",
    description:
      "Declassified internal audit documenting the scope of the NSA's bulk telephone metadata collection under Section 215 of the USA PATRIOT Act.",
    uploader: "schen_reports",
    uploadedAt: "2026-04-13T08:22:00Z",
    mimeType: "application/pdf",
    tags: ["surveillance", "declassified", "NSA", "FOIA"],
    ipfs: {
      cid: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      gateway: "https://ipfs.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      pinnedAt: "2026-04-13T08:22:05Z",
      fileSizeBytes: 2_450_000,
      mimeType: "application/pdf",
    },
    veracity: {
      veracityScore: 94,
      corroborationCount: 12,
      contradictionCount: 0,
      sourceCreditWeight: 0.97,
      status: "verified",
      summary:
        "Document cross-referenced against 12 declassified FOIA releases and court filings. All factual assertions corroborated. No contradictions detected in indexed corpora.",
      ragSources: [
        {
          id: "rag-1",
          title: "FISA Court Order — Primary Order BR 13-109",
          url: "https://www.eff.org/document/primary-order-collection-tangible-things",
          corpus: "court",
          credibilityWeight: 0.99,
          excerpt: "The Court hereby orders production of certain call detail records...",
          publishedAt: "2013-04-25T00:00:00Z",
        },
        {
          id: "rag-2",
          title: "PCLOB Report on Section 215 Telephone Records Program",
          url: "https://www.pclob.gov/library/215-Report_on_the_Telephone_Records_Program.pdf",
          corpus: "government",
          credibilityWeight: 0.96,
          excerpt: "The Section 215 telephone records program has provided only minimal unique value...",
          publishedAt: "2014-01-23T00:00:00Z",
        },
        {
          id: "rag-3",
          title: "ACLU v. Clapper — Second Circuit Opinion",
          url: "https://www.aclu.org/legal-document/aclu-v-clapper-second-circuit-opinion",
          corpus: "court",
          credibilityWeight: 0.98,
          excerpt: "The telephone metadata program exceeds the scope of what Congress has authorized...",
          publishedAt: "2015-05-07T00:00:00Z",
        },
      ],
      analysisDate: "2026-04-13T08:22:10Z",
      ipfs: {
        cid: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        gateway: "https://ipfs.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        pinnedAt: "2026-04-13T08:22:05Z",
        fileSizeBytes: 2_450_000,
        mimeType: "application/pdf",
      },
    },
  },
  {
    id: "ledger-2",
    title: "Offshore Financial Network — Panama Papers Subset",
    description:
      "Extracted dataset from the Panama Papers documenting shell company registrations linked to three government officials and one major pharmaceutical company.",
    uploader: "mrivera_truth",
    uploadedAt: "2026-04-11T14:05:00Z",
    mimeType: "text/csv",
    tags: ["panama-papers", "offshore", "corruption", "ICIJ"],
    ipfs: {
      cid: "QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o",
      gateway: "https://ipfs.io/ipfs/QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o",
      pinnedAt: "2026-04-11T14:05:08Z",
      fileSizeBytes: 890_000,
      mimeType: "text/csv",
    },
    veracity: {
      veracityScore: 81,
      corroborationCount: 8,
      contradictionCount: 1,
      sourceCreditWeight: 0.91,
      status: "verified",
      summary:
        "8 corroborating records found in the ICIJ Offshore Leaks database and public company registries. One minor discrepancy detected in a subsidiary registration date — does not affect core claims.",
      ragSources: [
        {
          id: "rag-4",
          title: "ICIJ Offshore Leaks Database",
          url: "https://offshoreleaks.icij.org",
          corpus: "wikileaks",
          credibilityWeight: 0.94,
          excerpt: "Mossack Fonseca incorporation records for Briarwood Holdings Ltd...",
          publishedAt: "2016-04-03T00:00:00Z",
        },
        {
          id: "rag-5",
          title: "Panama Financial Center Registry — Public Records",
          url: "https://www.registro-publico.gob.pa",
          corpus: "government",
          credibilityWeight: 0.88,
          excerpt: "Registration ID 789-2012: Briarwood Holdings Ltd. Registered agent: Mossack Fonseca...",
          publishedAt: "2012-06-14T00:00:00Z",
        },
      ],
      analysisDate: "2026-04-11T14:05:15Z",
      ipfs: {
        cid: "QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o",
        gateway: "https://ipfs.io/ipfs/QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o",
        pinnedAt: "2026-04-11T14:05:08Z",
        fileSizeBytes: 890_000,
        mimeType: "text/csv",
      },
    },
  },
  {
    id: "ledger-3",
    title: "Aerial Surveillance Footage — Protest Monitoring",
    description:
      "Video footage obtained via FOIA showing aerial surveillance of peaceful protests by federal agencies in 2020.",
    uploader: "aisha_facts",
    uploadedAt: "2026-04-09T10:30:00Z",
    mimeType: "video/mp4",
    tags: ["surveillance", "protests", "civil-liberties", "FOIA"],
    ipfs: {
      cid: "QmNrEidQrAbxx3FzxNt9E6s9S5R7GeZQMDEhqnFVMxqiT5",
      gateway: "https://ipfs.io/ipfs/QmNrEidQrAbxx3FzxNt9E6s9S5R7GeZQMDEhqnFVMxqiT5",
      pinnedAt: "2026-04-09T10:30:20Z",
      fileSizeBytes: 184_000_000,
      mimeType: "video/mp4",
    },
    veracity: {
      veracityScore: 67,
      corroborationCount: 4,
      contradictionCount: 2,
      sourceCreditWeight: 0.82,
      status: "pending",
      summary:
        "Metadata timestamps corroborated. Location corroborated via satellite imagery. Two claims about specific agency involvement are pending primary source confirmation.",
      ragSources: [
        {
          id: "rag-6",
          title: "DHS OIG Report — Federal Law Enforcement Activities During 2020 Protests",
          url: "https://www.oig.dhs.gov/sites/default/files/assets/2021-01/OIG-21-13-Jan21.pdf",
          corpus: "government",
          credibilityWeight: 0.92,
          excerpt:
            "DHS deployed aircraft and personnel to monitor protest activity in multiple cities...",
          publishedAt: "2021-01-06T00:00:00Z",
        },
      ],
      analysisDate: "2026-04-09T10:30:30Z",
      ipfs: {
        cid: "QmNrEidQrAbxx3FzxNt9E6s9S5R7GeZQMDEhqnFVMxqiT5",
        gateway: "https://ipfs.io/ipfs/QmNrEidQrAbxx3FzxNt9E6s9S5R7GeZQMDEhqnFVMxqiT5",
        pinnedAt: "2026-04-09T10:30:20Z",
        fileSizeBytes: 184_000_000,
        mimeType: "video/mp4",
      },
    },
  },
];

export const mockGraphData: GraphData = {
  nodes: [
    { id: "n1", label: "Nexus Capital Group", type: "organization", description: "Private equity firm with documented links to three government contracts.", corroborationScore: 88 },
    { id: "n2", label: "Senator R. Hargrove", type: "person", description: "Senior committee member who approved the DoD contracts under review.", corroborationScore: 92 },
    { id: "n3", label: "DoD Contract #2019-0047", type: "document", description: "Sole-source contract awarded to Nexus Capital subsidiary worth $4.2B.", corroborationScore: 96 },
    { id: "n4", label: "Meridian Solutions LLC", type: "organization", description: "Shell company subsidiary of Nexus Capital, incorporated in Delaware.", corroborationScore: 84 },
    { id: "n5", label: "Panama Papers Leak", type: "document", description: "Leaked Mossack Fonseca documents. Nexus Capital appears 14 times.", corroborationScore: 99 },
    { id: "n6", label: "J. Hargrove (spouse)", type: "person", description: "Spouse of Senator Hargrove. Listed as director of Meridian Solutions.", corroborationScore: 79 },
    { id: "n7", label: "2019 Senate Hearing", type: "event", description: "Defense procurement hearing. Nexus Capital testimony given under oath.", corroborationScore: 97 },
    { id: "n8", label: "Whistleblower Testimony", type: "document", description: "Sworn affidavit from former Nexus employee detailing internal communications.", corroborationScore: 71 },
    { id: "n9", label: "Pentagon Procurement Office", type: "organization", description: "Federal body responsible for awarding and overseeing DoD contracts.", corroborationScore: 95 },
    { id: "n10", label: "Cayman Islands Registry", type: "location", description: "Offshore jurisdiction where Nexus Capital holds 3 registered entities.", corroborationScore: 82 },
    { id: "n11", label: "Dr. Alan Morse", type: "person", description: "Former Pentagon official, now Nexus Capital advisory board member.", corroborationScore: 86 },
    { id: "n12", label: "Project Nightfall", type: "event", description: "Classified DoD program referenced in Contract #2019-0047 scope of work.", corroborationScore: 63 },
  ],
  edges: [
    { id: "e1", source: "n1", target: "n3", relation: "authored", weight: 8 },
    { id: "e2", source: "n2", target: "n3", relation: "mentioned_in", weight: 9 },
    { id: "e3", source: "n2", target: "n7", relation: "attended", weight: 7 },
    { id: "e4", source: "n1", target: "n4", relation: "affiliated_with", weight: 10 },
    { id: "e5", source: "n4", target: "n5", relation: "mentioned_in", weight: 8 },
    { id: "e6", source: "n6", target: "n4", relation: "affiliated_with", weight: 6 },
    { id: "e7", source: "n2", target: "n6", relation: "affiliated_with", weight: 5 },
    { id: "e8", source: "n1", target: "n7", relation: "attended", weight: 7 },
    { id: "e9", source: "n8", target: "n1", relation: "mentioned_in", weight: 9 },
    { id: "e10", source: "n9", target: "n3", relation: "authored", weight: 8 },
    { id: "e11", source: "n11", target: "n9", relation: "affiliated_with", weight: 6 },
    { id: "e12", source: "n11", target: "n1", relation: "affiliated_with", weight: 9 },
    { id: "e13", source: "n4", target: "n10", relation: "located_at", weight: 7 },
    { id: "e14", source: "n1", target: "n10", relation: "located_at", weight: 6 },
    { id: "e15", source: "n3", target: "n12", relation: "mentioned_in", weight: 5 },
    { id: "e16", source: "n9", target: "n12", relation: "mentioned_in", weight: 4 },
    { id: "e17", source: "n1", target: "n2", relation: "funded_by", weight: 7 },
  ],
};

export const mockDeepfakeResult: DeepfakeResult = {
  manipulationProbability: 0.12,
  isWarning: false,
  frameCount: 240,
  analyzedFrames: [
    { frameIndex: 0, timestampSeconds: 0, manipulationProbability: 0.08, artifactTypes: [] },
    { frameIndex: 24, timestampSeconds: 1, manipulationProbability: 0.11, artifactTypes: [] },
    { frameIndex: 48, timestampSeconds: 2, manipulationProbability: 0.09, artifactTypes: [] },
    { frameIndex: 72, timestampSeconds: 3, manipulationProbability: 0.14, artifactTypes: ["minor-compression"] },
    { frameIndex: 96, timestampSeconds: 4, manipulationProbability: 0.10, artifactTypes: [] },
  ],
  detectedArtifacts: ["minor-compression"],
  c2paMetadata: {
    hasProvenance: true,
    signedBy: "Authenticated via C2PA v1.3",
    captureDevice: "Canon EOS R5",
  },
  analysisDate: new Date().toISOString(),
};
