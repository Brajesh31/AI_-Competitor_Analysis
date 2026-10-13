# Troubleshooting

## Missing API key

Confirm `.env.local` contains the required keys, restart the development server, and ensure secrets are read only from server-side code.

## Build or lint failures

Run `npm ci`, then `npm run lint` and `npm run build`. Check the Node.js version and TypeScript diagnostics.

## Empty or partial results

Check provider availability, rate limits, request validation, network timeouts, and server logs without exposing credentials or raw private content.

## CSV export problems

Confirm the response schema and escaping for commas, quotes, newlines, and empty fields before downloading.
