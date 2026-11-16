# Documentation

This directory contains technical documentation for the AI Competitor Analysis application.

## Reading order
1. [Installation](installation.md): prepare Node.js, npm, and local environment.
2. [Configuration](configuration.md): configure Gemini and SerpAPI credentials.
3. [Architecture](architecture.md): understand the Next.js pages, UI components, store, and server routes.
4. [API reference](api.md): inspect POST endpoints, request bodies, and response shapes.
5. [Data and exports](data-and-exports.md): understand collected records, confidence scores, CSV behavior, and sample data.
6. [Security](security.md) and [scraping guidance](scraping.md): understand operational risks before public deployment.

## Guide index

| Guide | Contents |
|---|---|
| [Installation](installation.md) | Clone, dependencies, local run |
| [Configuration](configuration.md) | Environment variables, secrets |
| [Architecture](architecture.md) | Application components and data flow |
| [API](api.md) | Endpoint contracts and errors |
| [Data and exports](data-and-exports.md) | Result schema, sample CSV, exports |
| [Security](security.md) | Input validation, secrets, logging, rate limits |
| [Scraping](scraping.md) | Provider behavior, legal and reliability caveats |
| [Development](development.md) | Coding workflow and project conventions |
| [Testing](testing.md) | CI, manual checks, test gaps |
| [Deployment](deployment.md) | Build and runtime deployment |
| [Troubleshooting](troubleshooting.md) | Common errors and diagnostic steps |
| [FAQ](faq.md) | Common questions |
| [Limitations](limitations.md) | Known gaps and future improvements |

## Scope note
Documentation describes the current checked-in code. It distinguishes the current implementation from recommendations and future work. The application has no configured database, automated collection scheduler, model evaluation framework, or end-to-end test suite.