# Security Policy

## Scope
This repository is a Next.js application with server-side search and AI API routes. It processes user-supplied company names, external web content, provider responses, and API credentials.

## Supported version
Security fixes should target the latest state of the default `main` branch. No separate release support policy is currently defined.

## Reporting a vulnerability
Please report suspected vulnerabilities privately to Brajesh Kumar through the private contact route on the maintainer's GitHub profile. Do not publish exploit details, credentials, or private business research in a public issue.

Include:
- Affected route, file, dependency, or workflow.
- Impact and realistic attack scenario.
- Sanitized reproduction steps.
- Suggested mitigation, if known.

## Secrets
The application uses `GEMINI_API_KEY` and `SERP_API_KEY`. Keep them server-side and out of browser bundles, source control, issue comments, screenshots, and logs. Revoke or rotate credentials immediately if exposed.

## Data collection
Respect provider terms, source access controls, rate limits, and applicable law. Do not scrape private or authenticated content without authorization. Avoid retaining personal or confidential data.

## Known security gaps
The existing API routes have limited shared input validation, request throttling, timeout handling, and response schema validation. Some routes log raw external content, and the SerpAPI handler may return provider error details. Review [docs/security.md](docs/security.md) before deploying the app publicly.
