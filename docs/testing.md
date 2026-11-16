# Testing and validation

## Automated checks

The repository CI workflow is intended to run:
- npm dependency installation using the committed lockfile.
- TypeScript static checking with `npx tsc --noEmit`.
- A Next.js production build using `npm run build`.

These checks do not call external search providers or Gemini.

## Manual feature checks

### Competitor discovery

- Submit a valid company name.
- Submit an empty company name.
- Test provider failure or missing Gemini credentials.
- Confirm returned company names and confidence fields render.
- Check loading and error behavior.

### Target analysis

- Test each search scope: DuckDuckGo, DuckDuckGo plus Google News, all configured search sources, and PDF-only search.
- Test a missing company field.
- Test empty provider results.
- Test one provider failing while other sources respond.
- Run AI analysis on a small result list.
- Inspect sorting and confidence display.

### CSV export

Test:
- Empty result array.
- Titles and links containing commas.
- Embedded double quotes and newlines.
- Missing confidence values.
- Non-ASCII text and long URLs.

## API tests to add

A future test suite should cover:
- Invalid JSON and missing fields.
- Wrong field types and oversized values.
- Provider timeouts, quota failures, and malformed HTML.
- Gemini empty or malformed responses.
- Confidence values outside the expected range.
- CSV escaping and formula injection cases.
- Rate limiting and request size handling.

## Current limitations

There is currently no test directory or automated API/end-to-end test framework in the tracked tree. CI build success does not establish correctness of search results, model scoring, scraping reliability, or source compliance.
