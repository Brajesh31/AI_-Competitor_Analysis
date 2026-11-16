# Roadmap

This roadmap describes possible improvements. It is not a claim that these capabilities are currently implemented or scheduled.

## Priority 1: API safety and reliability
- [ ] Add shared request validation and consistent JSON error responses.
- [ ] Enforce request body and field size limits.
- [ ] Add provider timeouts, bounded concurrency, and safe retry policies.
- [ ] Add request throttling and abuse controls.
- [ ] Stop returning raw provider errors to clients.
- [ ] Replace raw HTML/model response logging with redacted structured logs.

## Priority 2: AI output quality
- [ ] Use structured model output or schema validation.
- [ ] Enforce confidence values within the expected numeric range.
- [ ] Preserve mapping between source records and AI scores without relying only on title equality.
- [ ] Record evidence and source provenance with each finding.
- [ ] Make the confidence score explanation visible to users.

## Priority 3: Research data quality
- [ ] Deduplicate results across providers and normalize URLs.
- [ ] Store provider name and retrieval timestamp in a shared result schema.
- [ ] Add publication-date extraction where available.
- [ ] Add user-visible source attribution and verification status.
- [ ] Improve PDF detection for redirected URLs and content types.

## Priority 4: Engineering quality
- [ ] Migrate linting to a supported ESLint configuration.
- [ ] Add unit and API route integration tests using mocked provider responses.
- [ ] Add browser end-to-end tests for competitor discovery, analysis, and CSV export.
- [ ] Fix CSV escaping and spreadsheet formula injection risks.
- [ ] Add central typed environment validation.
- [ ] Add operational monitoring and deployment documentation for the chosen host.

## Scope boundaries
A database, authentication system, scheduled research crawler, or production deployment manifest should be introduced only when a concrete requirement and maintenance plan exist.
