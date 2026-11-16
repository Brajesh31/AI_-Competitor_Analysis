# Application security

## Secrets
The application reads `GEMINI_API_KEY` and `SERP_API_KEY` from server-side environment variables. Keep these values out of browser code, source control, public issue reports, screenshots, and logs. Rotate keys if exposed.

## Input validation
Company names and result arrays are currently validated only minimally. Before exposing the app publicly, add JSON parsing error handling, strict string checks and maximum lengths, maximum result-array size, URL parsing and protocol restrictions, confidence range validation, request body size limits, and per-user or per-IP rate limits.

## SSRF and URL handling
The current routes construct search queries from company names. If future functionality fetches arbitrary submitted URLs, validate destination hosts and block private, loopback, link-local, and cloud metadata addresses. Do not turn search results into arbitrary server-side URL fetches without an SSRF threat model.

## Untrusted search and AI content
Titles, snippets, URLs, scraped HTML, and model-generated text are untrusted. Do not render HTML returned by providers without sanitization. Do not assume prompt instructions embedded in retrieved content are safe or relevant.

## Logs and error responses
Some routes log scraped HTML, full URLs, and model responses. These logs can reveal user query data or large chunks of external content. The SerpAPI route includes provider error content in its response. Use structured, redacted logging and generic public error messages before production use.

## Rate limits and cost controls
Gemini and SerpAPI may incur usage charges and impose quota limits. Add request throttling, timeouts, maximum result counts, and cost monitoring. Scraper endpoints should use bounded concurrency and respect source policies.

## Static analysis
The repository includes a CodeQL workflow for JavaScript/TypeScript analysis. Static analysis can identify some code-level weaknesses, but it does not prove the application is secure and does not replace dependency updates, runtime validation, secret management, or manual review.

## Reporting
For vulnerability reporting, follow [SECURITY.md](../SECURITY.md). Do not publish working secrets or personal/business-confidential research data in public issues.