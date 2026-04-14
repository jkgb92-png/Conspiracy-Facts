# ConspiracyFacts

**Authentic Stories. Verified Truths.**

ConspiracyFacts is a full-stack digital platform dedicated to authentic storytelling and independently verified information. Every piece of content — written stories and videos — is processed by our built-in **Truth Guard AI** fact-checking assistant before reaching the community feed.

---

## Platform Features

### 🎥 Video Hosting Module
Upload and share documentary-quality video content. Videos are stored on **AWS S3** and delivered via **CloudFront CDN**. Transcripts are automatically generated with **AWS Transcribe** and passed to Truth Guard for analysis.

### 📰 Community Story Feed
Publish investigative pieces and real stories. Every submission is scanned by Truth Guard AI before appearing publicly. Filter by verification status (Verified / Pending / Disputed) or topic.

### ⭐ User Reputation System
Build credibility through verified reporting. Earn tiered badges:
| Badge | Score Range | Description |
|---|---|---|
| Newcomer | 0–199 | Just joined |
| Contributor | 200–499 | Active community member |
| Trusted Member | 500–699 | Consistent accuracy |
| Verified Reporter | 700–899 | High-accuracy reporter |
| Truth Champion | 900–1000 | Elite, peer-trusted |

### 🛡 Truth Guard AI
The built-in LLM-powered fact-checking assistant:
1. **Extracts** individual factual claims from any text or video transcript
2. **Cross-references** claims against peer-reviewed research, government databases, and established journalistic sources
3. **Returns** a per-claim confidence score (0–100) with direct citation links
4. **Assigns** an overall Truth Score and verification status (Verified / Pending / Disputed)

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | **Next.js 15** (App Router) | SSR/SSG, routing |
| Language | **TypeScript** | Type safety |
| Styling | **Tailwind CSS** | Utility-first UI |
| Video Storage | **AWS S3** | Scalable object storage |
| CDN | **AWS CloudFront** | Global video delivery |
| Transcription | **AWS Transcribe** | Auto transcript generation |
| AI Fact-Checking | **LLM API (OpenAI GPT-4o)** | Truth Guard analysis |
| Database | **PostgreSQL** | Primary relational store |
| Cache | **Redis** | Session & query caching |
| Auth | **NextAuth.js** | Authentication |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout + nav + footer
│   ├── feed/page.tsx         # Community story feed
│   ├── videos/page.tsx       # Video library + upload
│   ├── truth-guard/page.tsx  # Truth Guard AI interface
│   ├── profile/page.tsx      # User profile + reputation
│   └── api/
│       ├── stories/route.ts       # Stories API
│       ├── videos/route.ts        # Videos API
│       ├── reputation/route.ts    # Reputation API
│       └── truth-guard/route.ts   # Truth Guard AI API
├── components/
│   ├── Navigation.tsx         # Sticky nav bar
│   ├── StoryCard.tsx          # Story card with truth score
│   ├── VideoCard.tsx          # Video card with duration
│   ├── VerificationBadge.tsx  # Verified/Pending/Disputed badge
│   ├── ReputationBadge.tsx    # Author badge + score
│   └── TruthGuardPanel.tsx    # AI analysis results panel
├── lib/
│   ├── mockData.ts            # Sample stories, videos, authors
│   └── utils.ts               # Formatting + colour utilities
└── types/
    └── index.ts               # Shared TypeScript types
```

---

## Getting Started

```bash
npm install
npm run dev       # Development server at http://localhost:3000
npm run build     # Production build
npm run start     # Start production server
```

### Environment Variables

```env
# LLM API (for production Truth Guard)
OPENAI_API_KEY=your_key_here

# AWS (for production video hosting)
AWS_REGION=us-east-1
AWS_S3_BUCKET=conspiracyfacts-videos
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
CLOUDFRONT_DOMAIN=your_distribution.cloudfront.net

# Database
DATABASE_URL=postgresql://user:pass@host:5432/conspiracyfacts

# Auth
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://your-domain.com
```

---

## UI/UX Design Principles

The interface is designed to feel **transparent, trustworthy, and clinical — but accessible**:

- **Colour system**: Deep navy (`#1e3a8a`) for authority and trust; teal accents for verification; amber for warnings; red for disputed content
- **Truth Score bars**: Visual progress bars on every piece of content give instant credibility signals
- **Verification badges**: Colour-coded pill badges (green/amber/red) appear on every story and video
- **Information density**: All critical metadata (author reputation, truth score, verification status, source count) visible without clicks
- **No dark patterns**: No engagement-maximising dark patterns — the platform explicitly surfaces disputes and uncertainties

---

## API Reference

### `POST /api/truth-guard`
Analyse content for factual accuracy.

```json
// Request
{ "content": "Your article or transcript text here..." }

// Response
{
  "data": {
    "overallScore": 87,
    "status": "verified",
    "summary": "...",
    "claims": [
      {
        "claim": "...",
        "status": "verified",
        "confidence": 94,
        "explanation": "...",
        "sources": [{ "title": "...", "url": "...", "credibilityScore": 97 }]
      }
    ]
  }
}
```

### `GET /api/stories?status=verified&limit=10`
Fetch community stories with optional filters.

### `GET /api/videos?status=verified&limit=6`
Fetch videos with optional filters.

### `GET /api/reputation?id=author-1`
Fetch author reputation data and history.
