# Development guide

## Setup
Follow [installation.md](installation.md), install dependencies with `npm ci`, and create `.env.local` from `.env.example`.

## Project conventions
- Use the App Router for pages and route handlers.
- Keep provider credentials and provider calls on the server.
- Keep reusable UI components under `app/components`.
- Keep Zustand state under `app/store`.
- Use explicit TypeScript types for API payloads and response data.
- Keep API response contracts documented when they change.
- Treat provider output and AI output as untrusted data.

## Change workflow
1. Identify the relevant page, component, store, or API handler.
2. Confirm the actual existing behavior before changing it.
3. Make a focused change rather than refactoring unrelated files.
4. Update the relevant guide and README where appropriate.
5. Run `npm ci`.
6. Run `npx tsc --noEmit` and `npm run build`.
7. Exercise the affected UI and route manually with valid, empty, and provider-failure inputs.
8. Review diffs for secrets, accidental data, or generated files.

## API changes
For every API route change, document the method, required fields, response fields, status codes, provider dependency, and error behavior. Add validation and tests where possible. Avoid leaking provider errors.

## UI changes
Test responsive behavior, empty results, loading state, failed requests, and long titles/URLs. For CSV export, test commas, quotes, line breaks, missing values, and unusual Unicode.

## Scope discipline
Do not add a database, scheduler, auth layer, or unrelated feature simply to make the codebase appear more complete. Propose architecture changes when there is a real requirement.