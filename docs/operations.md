# Operations Runbook

## Scope

This runbook covers basic operation of the current Next.js application. The repository does not currently include a production monitoring stack, database, scheduled job system, or formal on-call rotation.

## Startup

1. Confirm the supported Node.js runtime is available.
2. Install exact dependencies with `npm ci`.
3. Configure `GEMINI_API_KEY` and `SERP_API_KEY` as server-side secrets.
4. Build with `npm run build`.
5. Start with `npm run start`.
6. Confirm the landing page and the two research routes load.

## Provider health checks

Test each provider route separately with a small, non-sensitive query. A successful application page load does not mean external providers are available.

| Route | Check |
|---|---|
| `/api/getcomp` | DuckDuckGo response and Gemini response |
| `/api/getcollabs` | DuckDuckGo HTML and extracted anchors |
| `/api/gnewscrap` | Google News response and article anchors |
| `/api/apiscrape` | SerpAPI credentials, quota, and organic results |
| `/api/pdfscrape` | DuckDuckGo results and PDF link extraction |
| `/api/aianalysis` | Gemini credentials, model availability, and parseable output |

## Incident triage

### Search provider returns empty results
Check provider availability, response status, markup changes, query encoding, and selectors. An empty result is not evidence that no relationship exists.

### Gemini route returns an error
Check the server-side key, quota, model availability, network egress, and whether the response conforms to the JSON format expected by the route.

### SerpAPI route fails
Check the configured key, quota, provider response, and whether the error is being exposed to the client. Do not share raw provider errors publicly.

### Production build fails
Run `npm ci`, `npx tsc --noEmit`, and `npm run build` in a clean checkout. Record the first actionable diagnostic.

## Logging

Current routes contain console logging of queries, HTML, or model responses. This is a known risk. Before public deployment, replace these logs with structured, redacted events. Do not log API keys, raw private research, or full provider payloads.

## Recovery and rollback

The project has no automated rollback script. Use the hosting provider's documented deployment history to return to a previously verified deployment. Confirm environment variables remain configured after rollback.

## Operational gaps

Add monitoring, alerts, provider health metrics, request budgets, and deployment rollback procedures only after selecting a hosting environment and defining operational ownership.
