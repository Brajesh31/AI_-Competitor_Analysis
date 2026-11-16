# Architecture

## Overview

The repository is a Next.js 15.3.1 App Router application using React 19 and TypeScript. Client-side pages collect company names and display findings. Server route handlers perform provider requests, HTML parsing, and Gemini calls. Zustand stores competitor results in browser application state.

## Pages

| Route | File | Responsibility |
|---|---|---|
| `/` | `app/page.tsx` | Landing page, hero and how-it-works sections |
| `/competitors` | `app/competitors/page.tsx` | Company competitor discovery and result display |
| `/analysis` | `app/analysis/page.tsx` | Target/competitor relationship search and AI scoring |

The global layout in `app/layout.tsx` loads the shared header, footer, fonts, and global CSS.

## Server API routes

| Route | Provider or processing |
|---|---|
| `/api/getcomp` | DuckDuckGo HTML parsing, then Gemini competitor extraction |
| `/api/getcollabs` | DuckDuckGo HTML parsing for collaboration-related results |
| `/api/gnewscrap` | Google News HTML parsing |
| `/api/apiscrape` | SerpAPI Google search |
| `/api/pdfscrape` | DuckDuckGo PDF-oriented search |
| `/api/aianalysis` | Gemini collaboration-relevance scoring |

Each route is currently implemented as a POST handler in its `route.ts` file.

## UI components and state

The analysis experience uses `TargetAnalysis` to coordinate source requests and AI scoring, `PaginatedResults` to display links, and `ExportCSVButton` to download records. The `competitorStore` Zustand store holds discovered competitors between relevant client-side views.

The `CompetitorFinder` component under `app/components/analysiscomp` is a demonstration component with a hard-coded sample competitor list and simulated delay. The active `/competitors` page has a separate live request path through `/api/getcomp`.

## Data flow

```text
Browser
  |
  +--> /competitors --> /api/getcomp
  |                      |
  |                      +--> DuckDuckGo HTML
  |                      +--> Gemini
  |
  +--> /analysis --> /api/getcollabs
                   /api/gnewscrap
                   /api/apiscrape
                   /api/pdfscrape
                         |
                         v
                    title/link records
                         |
                         +--> /api/aianalysis --> Gemini scores
                         |
                         +--> pagination and CSV export
```

## Persistence

No database or server-side result store is configured. Competitor state is held in Zustand, and analysis results are held in component state until exported or the browser session changes.

## Architectural risks

Provider calls and HTML scraping are coupled directly to route handlers. There is no shared provider abstraction, central timeout/retry policy, request schema library, or automated contract test suite. Consider extracting provider adapters and validation utilities when extending the application.
