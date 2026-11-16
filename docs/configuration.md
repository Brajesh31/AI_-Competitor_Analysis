# Configuration and environment variables

## Required server-side variables

| Variable | Used in | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | `app/api/aianalysis/route.ts`, `app/api/getcomp/route.ts` | Google Gemini authentication |
| `SERP_API_KEY` | `app/api/apiscrape/route.ts` | SerpAPI authentication |

The checked-in [.env.example](../.env.example) provides placeholders only.

## Local configuration
Create `.env.local` in the project root and set the required values. Restart the Next.js development server after changing environment values.

## Hosted configuration
Add the same keys through the hosting provider's server-side environment-variable or secrets interface. Set them for the correct environments, such as preview and production. Do not place them in client-exposed build variables.

## Secret handling
- Never commit `.env.local` or real keys.
- Never prefix these values with `NEXT_PUBLIC_`.
- Avoid printing entire provider responses or request configuration in logs.
- Rotate keys if they are exposed.
- Restrict keys through provider controls where supported.
- Keep separate credentials for local development and production where practical.

## Missing credentials
AI routes may fail when `GEMINI_API_KEY` is absent or invalid. The SerpAPI route may return a provider error when `SERP_API_KEY` is missing or invalid. The other scraping routes do not reference these keys directly.

## Configuration gaps
The application currently hard-codes the Gemini model name in the route handlers. There is no central typed configuration module, provider timeout configuration, or environment validation at application startup.