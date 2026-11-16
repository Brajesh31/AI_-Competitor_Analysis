# AI Competitor Analysis

An AI-assisted competitive intelligence application built with Next.js. It searches public web and news sources for competitor and company relationship signals, uses Google Gemini to organize selected findings, and supports CSV export.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI](https://github.com/Brajesh31/AI_-Competitor_Analysis/actions/workflows/ci.yml/badge.svg)](https://github.com/Brajesh31/AI_-Competitor_Analysis/actions/workflows/ci.yml)

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Technology stack](#technology-stack)
- [Application flow](#application-flow)
- [Repository structure](#repository-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Running locally](#running-locally)
- [API reference](#api-reference)
- [Result format and confidence scores](#result-format-and-confidence-scores)
- [Sample data](#sample-data)
- [Security and responsible research](#security-and-responsible-research)
- [Known limitations](#known-limitations)
- [Validation and CI](#validation-and-ci)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Maintainer and license](#maintainer-and-license)

## Overview

AI Competitor Analysis helps users explore competitor companies and investigate public information that may indicate a commercial relationship between a target company and a competitor. The application combines search results from public-facing sources, parses headlines and links, optionally asks Google Gemini to assess the strength of collaboration signals, and renders results in the browser.

The project is a research-assistance tool. Search coverage is incomplete, pages can change, scraping can be blocked, and AI-generated assessments can be wrong. Every important finding should be verified against its original source before it is used in a business decision.

## Features

- **Competitor discovery:** submit a company name to search DuckDuckGo results and use Gemini to suggest competitor names with a confidence metric.
- **Target relationship research:** search for a target company and competitor using the available search scope.
- **Multiple source paths:** DuckDuckGo HTML results, Google News HTML results, and SerpAPI Google search results.
- **PDF-oriented discovery:** search for PDF links associated with a company pair.
- **AI-assisted scoring:** send collected titles and URLs to Gemini for a collaboration-relevance score.
- **Interactive results:** view and paginate returned source links.
- **CSV export:** download displayed research rows, including title, link, and optional confidence.
- **Responsive interface:** Next.js App Router pages with React components, Tailwind CSS, and Framer Motion.

These features describe current routes and UI code. Search providers and their HTML markup can change without notice, and provider availability is not guaranteed.

## Technology stack

| Area | Technology |
|---|---|
| Application framework | Next.js 15.3.1 App Router |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| State | Zustand |
| AI | Google GenAI SDK |
| Search provider | SerpAPI |
| HTTP requests | Axios |
| HTML parsing | Cheerio |
| Icons | Lucide React |
| Package management | npm with `package-lock.json` |

## Application flow

```text
User input
   |
   +--> Competitor discovery (/competitors)
   |       |
   |       +--> POST /api/getcomp
   |               |
   |               +--> DuckDuckGo HTML search
   |               +--> Gemini competitor analysis
   |
   +--> Target relationship research (/analysis)
           |
           +--> POST /api/getcollabs
           +--> POST /api/gnewscrap
           +--> POST /api/apiscrape
           +--> POST /api/pdfscrape (PDF-only scope)
                   |
                   v
             Source title/link results
                   |
                   +--> POST /api/aianalysis
                   |       |
                   |       +--> Gemini relevance scoring
                   |
                   +--> Paginated result display
                   +--> Browser-side CSV export
```

The root route currently renders the hero and how-it-works sections. The analysis and competitor discovery experiences are separate routes. Some components in the repository are illustrative or currently unused. See [architecture documentation](docs/architecture.md).

## Repository structure

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── PULL_REQUEST_TEMPLATE.md
├── app/
│   ├── analysis/
│   │   ├── exporttocsv.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── aianalysis/route.ts
│   │   ├── apiscrape/route.ts
│   │   ├── getcollabs/route.ts
│   │   ├── getcomp/route.ts
│   │   ├── gnewscrap/route.ts
│   │   └── pdfscrape/route.ts
│   ├── competitors/page.tsx
│   ├── components/
│   ├── store/competitorStore.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── docs/
├── public/
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## Requirements

- Node.js 20 or newer is recommended for the checked-in Next.js 15 application.
- npm, matching the committed `package-lock.json`.
- A Google Gemini API key for AI-powered competitor discovery and scoring.
- A SerpAPI key for the SerpAPI search scope.
- Network access to the external search/news services used by the API routes.

The DuckDuckGo and Google News routes scrape public HTML pages and do not use API keys in the current implementation.

## Installation

Clone the repository and install the exact dependency versions recorded in the lockfile:

```bash
git clone https://github.com/Brajesh31/AI_-Competitor_Analysis.git
cd AI_-Competitor_Analysis
npm ci
```

Create the local environment file:

**Windows PowerShell**

```powershell
Copy-Item .env.example .env.local
```

**macOS/Linux**

```bash
cp .env.example .env.local
```

Add the required values to `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key
SERP_API_KEY=your_serpapi_key
```

Never commit `.env.local` or expose provider credentials through client-side code.

## Environment variables

| Variable | Required for | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | Competitor discovery and AI scoring | Authenticates server-side requests to Google Gemini |
| `SERP_API_KEY` | SerpAPI search scope | Authenticates Google search requests through SerpAPI |

The API key names are referenced directly in server route code. Do not prefix secrets with `NEXT_PUBLIC_`, because that convention exposes variables to browser bundles.

See [environment configuration](docs/configuration.md) for local and deployment setup.

## Running locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available application pages:

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/competitors` | Discover competitor companies |
| `/analysis` | Search for relationships between target and competitor companies |

Production build:

```bash
npm run build
npm run start
```

TypeScript check:

```bash
npx tsc --noEmit
```

The project currently defines a `lint` script using `next lint`. This command is not a reliable lint entry point for the installed Next.js 15 version; use the repository CI checks and TypeScript check until the lint configuration is explicitly migrated.

## API reference

All routes are implemented as Next.js App Router route handlers and currently accept POST requests.

| Endpoint | Required JSON body | Behavior | Typical success payload |
|---|---|---|---|
| `/api/getcomp` | `{ "targetCompany": "Example" }` | DuckDuckGo search followed by Gemini competitor extraction | `{ "count": number, "result": [{ "title": string, "confidence": number }] }` |
| `/api/getcollabs` | `{ "targetCompany": "A", "competitorCompany": "B" }` | Searches DuckDuckGo for collaboration-related links | `{ "count": number, "results": [{ "title": string, "link": string }] }` |
| `/api/gnewscrap` | Same company-pair body | Parses Google News search HTML | `{ "count": number, "results": [{ "title": string, "link": string }] }` |
| `/api/apiscrape` | Same company-pair body | Searches Google through SerpAPI | `{ "count": number, "results": [{ "title": string, "link": string }] }` |
| `/api/pdfscrape` | Same company-pair body | Searches DuckDuckGo for PDF links | `{ "count": number, "results": [{ "title": string, "link": string }] }` |
| `/api/aianalysis` | `{ "results": [{ "title": "...", "link": "..." }] }` | Gemini scores collaboration relevance | `{ "count": number, "result": [{ "title": string, "link": string, "confidence": number }] }` |

Read [API documentation](docs/api.md) for endpoint details, error behavior, provider dependencies, and current limitations.

## Result format and confidence scores

Most collection routes return a list of titles and URLs. AI enrichment adds a numeric `confidence` field intended to represent how strongly a result suggests a collaboration or partnership.

**The confidence number is an AI-generated relevance assessment, not a calibrated statistical probability.** It can be inconsistent, sensitive to headline wording, and wrong. It must not be represented as proof of a business relationship.

## Sample data

The repository includes [results (1).csv](results%20(1).csv), a sample export containing titles, links, and confidence values. Treat it as an illustrative snapshot. It is not live, guaranteed current, or a complete benchmark dataset. Validate source URLs independently before citing the contents.

## Security and responsible research

- Keep Gemini and SerpAPI credentials server-side.
- Validate user-supplied company names and impose request limits before exposing the application publicly.
- Respect source terms, rate limits, access controls, and applicable law.
- Avoid scraping private, authenticated, or access-restricted content.
- Do not treat scraped content or AI summaries as verified facts.
- Avoid logging raw provider responses and unnecessary user research inputs.
- Do not commit `.env.local`, keys, or private business information.
- Review external links before opening or sharing them.

See [SECURITY.md](SECURITY.md), [privacy and data handling](docs/security.md), and [scraping guidance](docs/scraping.md).

## Known limitations

The current source code has material limitations:

- API routes rely on HTML scraping. DOM changes, bot protection, rate limits, or provider policy changes can break extraction.
- Several handlers have no explicit request timeout, retry policy, pagination contract, or rate limiting.
- The AI analysis endpoint parses model output as JSON using a regular expression and does not rigorously validate the returned schema or confidence range.
- The AI prompt includes user-supplied titles and links. Treat source content as untrusted input.
- Some routes log full HTML, URLs, or AI responses. Review logs before using real business research at scale.
- SerpAPI errors may be included in an API response through `errorLog`.
- Error handling and response shapes differ between endpoints.
- The sample CSV contains repeated or similar items and is not a validated ground-truth dataset.
- The component `app/components/analysiscomp/CompetitorFinder.tsx` contains hard-coded demonstration competitors and a simulated delay. It is not the live competitor-discovery implementation.
- A database is not configured in the repository. Research results are handled in request/browser state and can be exported as CSV.
- No automated API integration tests or end-to-end browser tests are currently included.

These are documented gaps, not claims that the application already has safeguards or production guarantees.

## Validation and CI

The CI workflow installs dependencies, runs a TypeScript check, and creates a production build. External API calls are not executed during CI, so a passing build does not verify Gemini, SerpAPI, DuckDuckGo, or Google News availability.

## Documentation

| Guide | Description |
|---|---|
| [Documentation index](docs/README.md) | Complete guide directory |
| [Installation](docs/installation.md) | Local setup and runtime |
| [Configuration](docs/configuration.md) | Environment variables and secrets |
| [Architecture](docs/architecture.md) | Pages, components, state and API flow |
| [API reference](docs/api.md) | Routes, payloads and error behavior |
| [Data and exports](docs/data-and-exports.md) | Source records, result shape and CSV |
| [Security](docs/security.md) | API security and operational safeguards |
| [Scraping](docs/scraping.md) | Source constraints and extraction risks |
| [Development](docs/development.md) | Local development workflow |
| [Testing](docs/testing.md) | CI and manual test strategy |
| [Deployment](docs/deployment.md) | Production build and hosting considerations |
| [Troubleshooting](docs/troubleshooting.md) | Common runtime issues |
| [FAQ](docs/faq.md) | Frequently asked questions |
| [Limitations](docs/limitations.md) | Known technical debt |

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md), select an appropriate issue template, and include validation evidence. For API changes, document request and response shapes. For scraper changes, note source behavior and compliance implications.

## Maintainer and license

Maintained by **Brajesh Kumar**.

Licensed under the MIT License. See [LICENSE](LICENSE). Provider APIs, scraped content, trademarks, and external datasets remain subject to their own terms and rights.

Last updated: 2026-11-16 02:49 UTC
