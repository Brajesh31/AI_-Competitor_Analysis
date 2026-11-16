# Provider Integrations

## Overview

The current server routes integrate with public search pages, SerpAPI, and Google Gemini. Provider calls are made directly from Next.js route handlers. There is no common provider adapter or centralized configuration layer.

## Integration matrix

| Provider | Route | Authentication | Current integration |
|---|---|---|---|
| DuckDuckGo HTML | `getcomp`, `getcollabs`, `pdfscrape` | No key in current code | Axios HTML request and Cheerio parsing |
| Google News | `gnewscrap` | No key in current code | Axios HTML request and article-anchor parsing |
| SerpAPI | `apiscrape` | `SERP_API_KEY` | SerpAPI SDK Google engine |
| Google Gemini | `getcomp`, `aianalysis` | `GEMINI_API_KEY` | Google GenAI SDK |

## DuckDuckGo HTML

The routes construct a query from user-provided company names and request the DuckDuckGo HTML endpoint. Cheerio extracts result anchors, titles, snippets, and redirect parameters.

Potential failure modes:
- HTML structure or selectors change.
- Anti-bot challenges or throttling alter the response.
- Redirect URLs are missing or encoded differently.
- Results are stale, duplicated, or unrelated.

## Google News

The news route searches a query containing both company names and “collaboration”. It parses anchors inside article elements and normalizes relative links against the Google News domain.

This parser depends on page markup. A successful request does not prove all displayed stories were extracted.

## SerpAPI

The SerpAPI route calls the Google search engine and reads `organic_results`. It requires `SERP_API_KEY`. The current implementation does not provide a common provider timeout, retry policy, quota manager, or result deduplication stage.

The UI calls this option “ScrapeAPI”, but the code imports `getJson` from the `serpapi` package. Update the label in a future UI correction to avoid misleading users.

## Google Gemini

The competitor-discovery route sends extracted search titles to Gemini and requests competitor candidates. The analysis route sends title/link pairs and requests a JSON list with confidence values.

Current model identifier: `gemini-2.0-flash`.

The routes parse model text using a regular expression to extract a JSON array. This is brittle. The application does not currently validate the complete model response against a strict schema or preserve a robust evidence trail.

## Provider change checklist

When replacing or adding a provider:
1. Confirm terms, licensing, access requirements, and rate limits.
2. Keep credentials server-side.
3. Add request timeouts and bounded response sizes.
4. Normalize provider records into a shared internal type.
5. Handle provider errors without exposing raw details.
6. Record provider name and retrieval timestamp.
7. Add mocked route tests for success, empty, malformed, timeout, and quota responses.
8. Update the API reference, configuration guide, and this document.
