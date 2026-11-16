# Changelog

Notable repository changes are recorded here. This project does not currently use automated release tooling.

## Unreleased

### Added
- Expanded technical documentation for installation, configuration, architecture, API routes, data/export behavior, scraping, security, development, testing, deployment, troubleshooting, FAQ, and limitations.
- Repository issue templates for bugs, feature requests, and documentation requests.
- CI workflow for dependency installation, TypeScript validation, and production build.
- Dependency update configuration and repository governance guidance.

### Changed
- Rewrote README to reflect the implemented Next.js pages, route handlers, provider integrations, environment variables, and known limitations.
- Replaced hourly README timestamp commits with meaningful validation automation.
- Clarified that Gemini confidence values are heuristic outputs, not calibrated probabilities.

### Known limitations retained
- Existing HTML scraping and AI response parsing are not comprehensively validated.
- Request throttling, shared provider timeouts, and automated API tests are not implemented.
- The existing legacy lint script needs migration for Next.js 15.
- A separate UI component contains hard-coded demonstration competitor data.
