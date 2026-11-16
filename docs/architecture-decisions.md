# Architecture Notes and Decisions

This page records important current design choices and their trade-offs. It is descriptive, not a claim that a formal architecture decision record process already exists.

## Next.js App Router

**Current choice:** Pages and server endpoints live under `app/`.

**Reason visible in code:** UI routes and server route handlers are colocated within the Next.js application.

**Trade-off:** Provider integration logic currently sits directly in route handlers, which makes reuse and isolated testing harder.

## Client-side Zustand store

**Current choice:** Competitor candidates are stored in a Zustand store.

**Trade-off:** State is not a persistent server-side workspace. It can be lost on a fresh session and is not associated with an authenticated user.

## Direct provider calls

**Current choice:** Routes call Axios/Cheerio, SerpAPI, and Google GenAI directly.

**Trade-off:** Provider-specific parsing and error handling are duplicated. There is no shared retry, timeout, observability, or normalized provider adapter.

## AI-generated confidence

**Current choice:** Gemini assigns heuristic scores based on titles and URLs.

**Trade-off:** The output is not calibrated or independently validated. The score is useful only as a triage hint and must not be interpreted as proof.

## CSV export in browser

**Current choice:** The current result array is serialized in the browser and downloaded.

**Trade-off:** There is no server-side audit trail, export history, or robust CSV escaping.

## No database

**Current choice:** No database dependency or persistence layer is configured.

**Trade-off:** The app cannot provide durable research history, collaboration, or scheduled monitoring without a deliberate future architecture change.
