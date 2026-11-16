# Search and scraping behavior

## Current sources

| Route | Source | Current technique |
|---|---|---|
| `/api/getcollabs` | DuckDuckGo HTML | Axios request followed by Cheerio parsing |
| `/api/getcomp` | DuckDuckGo HTML | Extracts titles and snippets, then uses Gemini |
| `/api/pdfscrape` | DuckDuckGo HTML | Adds `filetype:pdf` and retains PDF-looking URLs |
| `/api/gnewscrap` | Google News | Requests search HTML and parses article anchors |
| `/api/apiscrape` | SerpAPI Google engine | Uses SerpAPI SDK and API key |

## Reliability
HTML scraping depends on markup and source behavior that may change. Selectors can break, search pages can return bot challenges, result order can vary, and network responses can be incomplete. A successful HTTP response does not guarantee a complete or accurate result set.

The PDF route checks whether a decoded URL ends with `.pdf`. Some legitimate PDF links use redirects or query strings, so they may be missed. Conversely, a URL suffix alone does not verify file content.

## Responsible collection
Before using these routes at scale, review provider terms, robots guidance, acceptable use, and applicable law; avoid private, authenticated, or access-restricted content; use reasonable request frequency and backoff; set network timeouts and response-size limits; identify sources in user-facing results; avoid retaining more content than needed; and respect takedown requests and retention obligations.

This documentation is not legal advice. The project does not currently implement a shared crawler policy, retry/backoff layer, or per-provider quota manager.