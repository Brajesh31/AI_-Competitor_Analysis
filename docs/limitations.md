# Known limitations and technical debt

## Search and source data
- Search results depend on third-party providers and HTML page structures.
- Scrapers may return partial, duplicate, stale, or irrelevant results.
- Source provider and retrieval timestamp are not stored consistently with result records.
- Search providers may impose access rules, rate limits, or change markup.

## AI analysis
- Gemini confidence scores are prompt-driven and not statistically calibrated.
- The current output parsing assumes a JSON array embedded in model text.
- Returned records are associated to source records by title, which may not be unique.
- Confidence range and result schema are not validated rigorously.
- Search content is included in prompts and must be considered untrusted input.

## API robustness and security
- Request JSON parsing is not consistently guarded.
- Input types and maximum lengths are not uniformly validated.
- Provider calls do not share a configurable timeout/retry policy.
- Rate limiting and request body size limits are not implemented.
- Some routes log HTML, URLs, or model responses.
- SerpAPI provider errors are included in one error response.

## UI and state
- `CompetitorFinder.tsx` in analysis components returns hard-coded demo competitors.
- Error and loading handling differs across pages.
- CSV escaping does not account for embedded quotes or spreadsheet formula injection.
- Zustand state is client-side only and is not a persistent data store.

## Engineering
- No automated unit, API integration, or browser end-to-end tests are present.
- The `lint` script uses `next lint`, which needs migration for the installed Next.js major version.
- No central typed environment validation exists.
- There is no database, authentication layer, collection scheduler, deployment manifest, or monitoring configuration.

## Recommended remediation order
1. Add shared request validation, consistent JSON error responses, and request-size limits.
2. Add provider timeouts and controlled error handling.
3. Remove sensitive/raw provider logging and avoid returning provider internals.
4. Validate Gemini output with a schema and enforce confidence range.
5. Deduplicate findings and record source/provider/fetch timestamp.
6. Correct CSV escaping and formula injection risks.
7. Add unit tests and API route integration tests with mocked provider responses.
8. Replace the legacy lint command with a supported ESLint configuration.
9. Add rate limiting, abuse controls, and production monitoring before public deployment.