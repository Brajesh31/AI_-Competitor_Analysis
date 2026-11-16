# API reference

## Conventions

All current handlers are Next.js App Router POST routes. Requests and responses use JSON. The examples below describe the current implementation and are not a versioned public API contract.

There is no shared schema validator or common error response abstraction. Consumers should expect provider failures and malformed responses to vary by route.

## POST /api/getcomp

Discovers competitor candidates for one target company. It sends a query to DuckDuckGo, parses result titles and snippets, then asks Gemini to return competitor titles with confidence metrics.

Request:

```json
{ "targetCompany": "Example Corporation" }
```

Successful response shape:

```json
{
  "count": 2,
  "result": [
    { "title": "Candidate Company", "confidence": 0.82 }
  ]
}
```

The route currently checks for a missing target company and returns status 400. Scraping and Gemini failures return status 500.

## POST /api/getcollabs

Searches DuckDuckGo HTML for a target/competitor pair and returns extracted result titles and links.

```json
{ "targetCompany": "Company A", "competitorCompany": "Company B" }
```

Success:

```json
{ "count": 1, "results": [{ "title": "Example result", "link": "https://example.com/article" }] }
```

## POST /api/gnewscrap

Searches Google News HTML for a company pair and parses links found under article anchors. Request body matches `/api/getcollabs`. Success uses the same `count` and `results` shape.

## POST /api/apiscrape

Uses SerpAPI with the Google search engine and a query composed from the two company names and the word collaboration. Request body matches `/api/getcollabs`. Success uses the `count` and `results` shape. The route references `SERP_API_KEY`.

## POST /api/pdfscrape

Searches DuckDuckGo for a company pair plus `filetype:pdf`, then retains links ending in `.pdf`. Request body matches `/api/getcollabs`. Success uses the `count` and `results` shape.

## POST /api/aianalysis

Accepts a list of title/link records, asks Gemini to assess collaboration relevance, and maps returned confidence values to the original records.

Request:

```json
{
  "results": [
    { "title": "Company A and Company B announce a partnership", "link": "https://example.com/news" }
  ]
}
```

Success:

```json
{
  "count": 1,
  "result": [
    {
      "title": "Company A and Company B announce a partnership",
      "link": "https://example.com/news",
      "confidence": 0.91
    }
  ]
}
```

Invalid `results` input returns status 400. Gemini errors return status 500.

## Error and validation behavior

The current handlers generally check required company names, but do not consistently validate JSON parse errors, string types, maximum input lengths, URL formats, result array size, or confidence ranges. A production-facing deployment should introduce shared validation, consistent error envelopes, request size limits, provider timeouts, and rate limiting.

The SerpAPI route currently includes an `errorLog` field in its 500 response. Do not expose raw provider errors in public production responses.

## Confidence semantics

The confidence value is a prompt-driven Gemini judgment. It is not statistically calibrated, independently verified, or a guarantee of a relationship. See [data and exports](data-and-exports.md).
