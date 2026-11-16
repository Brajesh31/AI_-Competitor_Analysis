# Frequently asked questions

## What does the application do?
It helps research competitor companies and possible relationships between a target company and a competitor using search results and Gemini-assisted scoring.

## Does the app prove a partnership exists?
No. It surfaces candidate sources. Confidence values are heuristic Gemini outputs, not verified probabilities or evidence. Review original primary sources.

## Which providers are used?
The current routes use DuckDuckGo HTML, Google News HTML, SerpAPI's Google search engine, and Google Gemini.

## Do I need both API keys?
Gemini is used by competitor discovery and AI scoring. SerpAPI is used only by the SerpAPI search scope. The other scraping routes do not directly require these API keys.

## Is there a database?
No database is configured. Competitor state is stored in Zustand in the client, and analysis results remain in component state until exported.

## Where is CSV export implemented?
In `app/analysis/exporttocsv.tsx`. Export runs in the browser and downloads the current records as `results.csv`.

## Is the competitor finder component live?
The active `/competitors` page calls `/api/getcomp`. A different `CompetitorFinder` component under `app/components/analysiscomp` uses hard-coded demonstration data and is not the live page implementation.

## Can the app run without external network access?
The UI can load, but search and AI endpoints need outbound access to their providers. Build and type checks do not call those providers.