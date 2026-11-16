# Privacy and Research Data Handling

## Data handled by the application

The application receives company names and uses them to construct external search queries. Search result titles and links are passed through the browser and, for AI scoring, sent to Gemini. Competitor discovery also sends extracted search result titles to Gemini.

The application does not currently provide user accounts, a database, or a server-side research history. The client holds results in browser memory until navigation/session state changes or the user exports them.

## External providers

Queries and selected result content are sent to third-party providers:
- DuckDuckGo HTML search.
- Google News.
- SerpAPI, when that scope is selected.
- Google Gemini, for competitor discovery and AI scoring.

Review each provider's terms, privacy documentation, retention practices, and applicable data processing requirements before using confidential or regulated information.

## Logs

Some current routes log query URLs, raw HTML, or Gemini responses. This may expose submitted company names and source content in hosting logs. Redacted structured logging is a recommended remediation and is not yet implemented consistently.

## User responsibilities

- Do not submit confidential, personal, regulated, or restricted information unless authorized.
- Do not treat public availability as permission to republish all source content.
- Verify source terms and legal obligations.
- Keep API keys out of browser code and exported data.
- Review CSV files before sharing them.

## Retention and deletion

The repository does not implement a server-side research database or a deletion workflow. Browser downloads and hosting logs are outside the application's current result-state handling. Operators must define log retention and access policies in their hosting environment.

## No privacy guarantee

This guide documents current data flows and risks. It is not a privacy policy, legal advice, or a guarantee that third-party providers retain no submitted information.
