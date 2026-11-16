# Contributing

Thank you for contributing to AI Competitor Analysis. Contributions should improve correctness, reliability, security, documentation, or user experience without introducing unsupported claims about research findings.

## Before starting
1. Read the [README](README.md), [documentation index](docs/README.md), and [security policy](SECURITY.md).
2. Search existing issues and pull requests.
3. Identify the page, route handler, component, or guide affected.
4. Keep the change focused and explain its user or maintenance value.

## Local setup
Use Node.js 20 or newer and npm. Follow [docs/installation.md](docs/installation.md), then run `npm ci`. Create `.env.local` from `.env.example` and add server-side provider credentials where needed.

## Code expectations
- Use the Next.js App Router conventions already present.
- Keep API credentials server-side.
- Validate external input and treat provider/AI content as untrusted.
- Use explicit types for request and response objects.
- Avoid logging raw provider payloads, sensitive inputs, or secrets.
- Document API contract changes and update the relevant endpoint guide.
- Respect search provider policies, rate limits, and applicable law.
- Do not describe AI confidence as a verified probability or factual proof.
- Do not commit private research, credentials, or unauthorized scraped datasets.

## Validation
Before submitting:
```bash
npm ci
npx tsc --noEmit
npm run build
```
Manually test the affected page and API routes with valid, empty, malformed, and provider-failure inputs. Test CSV output for commas, quotes, line breaks, and unusual characters when changing export behavior.

The current CI checks type correctness and a production build. It does not verify external provider availability or factual accuracy of scraped findings.

## Pull requests
Use the pull request template. Include the reason for the change, affected endpoints/pages, validation commands and results, provider/data impacts, and remaining limitations. Keep commits focused.

## Scope
Do not add unrelated product features, a database, authentication, or deployment infrastructure as part of a documentation-only change. Propose larger architectural changes separately.
