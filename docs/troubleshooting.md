# Troubleshooting

## Missing Gemini API key

Confirm `GEMINI_API_KEY` exists in `.env.local` and restart the dev server. Confirm it is read from server-side route code only.

## Missing SerpAPI results or key errors

Check `SERP_API_KEY`, account quota, key restrictions, and provider response. The SerpAPI scope depends on this credential; the DuckDuckGo and Google News routes do not use it directly.

## Search returns no results

Possible causes include changed HTML structure, no matching indexed pages, bot protection, rate limiting, or a source response that differs from the parser's selectors. Do not assume an empty list means no relationship exists.

## AI analysis fails

Check Gemini credentials, quota, model availability, and server logs. Gemini output is parsed as JSON by the current handler, so output that does not match the expected array shape may fail.

## TypeScript or build errors

Run:

```bash
npm ci
npx tsc --noEmit
npm run build
```

Confirm the Node.js version and inspect the first compiler diagnostic.

## `npm run lint` fails

The current `package.json` defines `next lint`, which is not a dependable lint command for this Next.js 15 app. Use TypeScript and build checks while the ESLint configuration is migrated.

## CSV file appears malformed

The current exporter does not fully escape embedded quotes. Try a simple result to isolate the issue. A future fix should use a tested CSV serializer and protect against spreadsheet formula injection.

## Results appear duplicated

Different providers may return the same article with different URL variants or tracking parameters. The application does not currently implement a shared canonical URL and deduplication stage.
