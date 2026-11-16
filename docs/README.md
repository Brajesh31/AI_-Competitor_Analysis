# Documentation

This directory is the technical reference for the current AI Competitor Analysis codebase. Guides distinguish implemented behavior from recommendations and known gaps.

## Start here

1. [User guide](user-guide.md): run competitor discovery, relationship searches, AI scoring, and CSV export.
2. [Installation](installation.md): set up Node.js and npm.
3. [Configuration](configuration.md): configure Gemini and SerpAPI credentials.
4. [Architecture](architecture.md): understand the pages, components, store, and route handlers.
5. [API reference](api.md) and [API examples](api-examples.md): inspect endpoints and test requests.
6. [Provider integrations](provider-integrations.md): understand each external source and its failure modes.
7. [Security](security.md), [privacy](privacy.md), and [scraping](scraping.md): review risks before public use.

## Complete guide index

| Guide | Contents |
|---|---|
| [User guide](user-guide.md) | End-to-end browser workflow and result interpretation |
| [Installation](installation.md) | Clone, dependencies, local run |
| [Configuration](configuration.md) | Environment variables and secrets |
| [Architecture](architecture.md) | Pages, components, state and API flow |
| [Architecture notes](architecture-decisions.md) | Current design choices and trade-offs |
| [API reference](api.md) | Endpoint contracts and error behavior |
| [API examples](api-examples.md) | Curl requests for each route |
| [Provider integrations](provider-integrations.md) | DuckDuckGo, Google News, SerpAPI and Gemini |
| [Data and exports](data-and-exports.md) | Result records, sample CSV and export behavior |
| [Data dictionary](data-dictionary.md) | Current fields and missing provenance metadata |
| [Database and storage](database.md) | No configured database; current state and persistence |
| [Security](security.md) | Input validation, secrets, logging and rate limits |
| [Privacy](privacy.md) | External data flows, logs, retention considerations |
| [Scraping](scraping.md) | Provider behavior, legal and reliability caveats |
| [Development](development.md) | Coding workflow and project conventions |
| [Testing](testing.md) | CI, manual checks and test gaps |
| [Accessibility](accessibility.md) | Current accessibility review and remediation checklist |
| [Performance](performance.md) | Runtime characteristics and optimization priorities |
| [Deployment](deployment.md) | Production build and hosting considerations |
| [Operations](operations.md) | Startup, provider checks and incident triage |
| [Release process](release-process.md) | Pre-release validation and rollback considerations |
| [Troubleshooting](troubleshooting.md) | Common runtime issues |
| [FAQ](faq.md) | Frequently asked questions |
| [Known UI behavior](known-ui-issues.md) | Live routes, demo content and incomplete navigation |
| [Limitations](limitations.md) | Known gaps and recommended remediation order |

## Documentation principles

- Do not document a planned feature as if it exists.
- Treat external search results as unverified evidence leads.
- Treat Gemini confidence values as heuristic scores, not probabilities.
- Update API examples and the data dictionary when route contracts change.
- Record provider, security, and privacy impacts when adding integrations.

## Scope note

The application currently has no configured database, authenticated user workspace, scheduled monitoring, persistent research history, automated API integration tests, or end-to-end browser test suite.
