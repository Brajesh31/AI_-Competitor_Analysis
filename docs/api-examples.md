# API Request Examples

All endpoints are POST handlers under the Next.js App Router. These examples use a local development server. They are intended for manual testing with non-sensitive sample company names.

## Competitor discovery

```bash
curl -X POST http://localhost:3000/api/getcomp \
  -H "Content-Type: application/json" \
  -d '{"targetCompany":"Example Corporation"}'
```

The current route returns a `count` and a `result` array with candidate `title` and `confidence` values.

## DuckDuckGo relationship search

```bash
curl -X POST http://localhost:3000/api/getcollabs \
  -H "Content-Type: application/json" \
  -d '{"targetCompany":"Company A","competitorCompany":"Company B"}'
```

## Google News search

```bash
curl -X POST http://localhost:3000/api/gnewscrap \
  -H "Content-Type: application/json" \
  -d '{"targetCompany":"Company A","competitorCompany":"Company B"}'
```

## SerpAPI search

```bash
curl -X POST http://localhost:3000/api/apiscrape \
  -H "Content-Type: application/json" \
  -d '{"targetCompany":"Company A","competitorCompany":"Company B"}'
```

This route requires `SERP_API_KEY` in the server environment.

## PDF search

```bash
curl -X POST http://localhost:3000/api/pdfscrape \
  -H "Content-Type: application/json" \
  -d '{"targetCompany":"Company A","competitorCompany":"Company B"}'
```

The current parser retains links whose decoded URL ends with `.pdf`. It may miss redirected PDF documents or URLs with query parameters after the extension.

## AI analysis

```bash
curl -X POST http://localhost:3000/api/aianalysis \
  -H "Content-Type: application/json" \
  -d '{"results":[{"title":"Company A announces partnership with Company B","link":"https://example.com/announcement"}]}'
```

This route requires `GEMINI_API_KEY`.

## Expected response patterns

Collection routes generally return `{ "count": number, "results": [{ "title": string, "link": string }] }`. The competitor route and AI analysis route use a singular `result` key. The API does not currently guarantee a uniform error envelope.

## Safe testing

- Use fictional or public company names.
- Never paste API keys into curl command history or issue comments.
- Do not use confidential target-account research in public logs.
- Avoid repeatedly calling paid providers while debugging.
- Treat returned links and confidence values as unverified.
