# User Guide

This guide explains the current browser workflow. It describes the shipped application, not a proposed future workflow.

## 1. Open the application

Start the development server using the instructions in [installation.md](installation.md). Open the local Next.js URL in a browser.

The landing page introduces the product and links to competitor discovery. The working research experiences are available at `/competitors` and `/analysis`.

## 2. Discover competitor candidates

1. Open `/competitors`.
2. Enter a company name in the company field.
3. Select **Find Competitors**.
4. The browser sends the name to `POST /api/getcomp`.
5. The route searches DuckDuckGo HTML, extracts result titles/snippets, and asks Gemini to identify competitor candidates.
6. Review the returned names and confidence metrics.

The competitor list is held in the client-side Zustand store. It is not written to a database. Select a candidate in the later analysis screen to populate the competitor field.

### Interpret discovery results carefully

The model-generated confidence value is a heuristic ranking signal. It is not a verified market-share measure, competitive-position probability, or proof that the candidate is a direct competitor. Search snippets can be incomplete or misleading.

## 3. Search for a relationship

Open `/analysis` and enter both:
- **Target Company:** the organization whose relationship history you want to research.
- **Competitor Company:** the competitor or candidate you want to investigate.

Choose one of the available scopes:

| UI choice | Routes called | Meaning |
|---|---|---|
| DuckDuckGo only | `/api/getcollabs` | Search for collaboration-related results |
| DuckDuckGo + GNews | `/api/getcollabs`, `/api/gnewscrap` | Combine DuckDuckGo and Google News results |
| DuckDuckGo + GNews + ScrapeAPI | Previous two plus `/api/apiscrape` | Add SerpAPI Google results |
| PDF Files Only | `/api/pdfscrape` | Search for PDF-looking result links |

The UI label says “ScrapeAPI” but the implementation uses the SerpAPI package and SerpAPI credentials. See [provider integrations](provider-integrations.md).

## 4. Review and score results

The application displays collected titles and links in pages of six results. Open the original source to verify the context and date.

Select **Run AI Analysis** to send the current result list to Gemini. The response adds a confidence value and the UI sorts results by that value.

Do not use the score as a substitute for source review. The current score is not calibrated, and title-based matching can fail when titles are duplicated or altered.

## 5. Export results

Select **Export to CSV** to download the current result list as `results.csv`. The export is generated in the browser and includes title, link, and confidence columns.

The current exporter has incomplete CSV escaping. Treat exported files as research working material, not as a validated evidence register. See [data and exports](data-and-exports.md).

## 6. What is not currently supported

- User accounts or saved research workspaces.
- Database-backed persistence or search history.
- Scheduled competitor monitoring.
- Automated alerts.
- A verified partnership database.
- A report generator with source citations and audit history.
- Guaranteed complete search coverage.

See [limitations](limitations.md) before relying on results for a commercial decision.
